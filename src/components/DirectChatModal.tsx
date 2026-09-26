import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  MessageSquare,
  Lock,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  User,
  ShieldCheck
} from 'lucide-react';
import { RentalApplication, ChatMessage } from '../types';
import { Language, translations } from '../translations';

interface DirectChatModalProps {
  application: RentalApplication;
  currentUserRole: 'landlord' | 'tenant';
  currentUserName: string;
  onSendMessage: (applicationId: string, text: string) => void;
  onClose: () => void;
  language: Language;
}

export const DirectChatModal: React.FC<DirectChatModalProps> = ({
  application,
  currentUserRole,
  currentUserName,
  onSendMessage,
  onClose,
  language,
}) => {
  const t = translations[language];
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isViewingApproved = application.status === 'viewing_scheduled' || application.status === 'approved';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [application.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(application.id, inputText.trim());
    setInputText('');
  };

  const recipientName = currentUserRole === 'landlord'
    ? application.tenant.fullName
    : 'Property Owner';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full h-[600px] flex flex-col border border-[#e8e6df] shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 px-6 bg-[#0F4C5C] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm border border-white/20">
              {recipientName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  {recipientName}
                </h3>
                {isViewingApproved && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {t.chatHeaderViewingConfirmed}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#e2ecee]">
                {application.requestedSlotLabel ? `${application.requestedSlotLabel}` : 'Viewing discussion'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-sm font-bold px-2 py-1 rounded-lg hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        {/* Viewing Status Banner */}
        <div className="bg-[#f7f6f2] px-6 py-2.5 border-b border-[#e8e6df] text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#0F4C5C] font-semibold">
            <Calendar className="w-4 h-4 text-[#0F4C5C]" />
            <span>{application.requestedSlotLabel || 'Pending'}</span>
          </div>
          <span className="text-[11px] text-[#71717a]">
            Direct connection
          </span>
        </div>

        {/* Message Thread Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#FAFAF8]">
          <div className="text-center my-2">
            <span className="text-[10px] bg-[#e8e6df] text-[#52525b] px-3 py-1 rounded-full font-medium">
              {t.chatWelcomeLockNotice}
            </span>
          </div>

          {application.messages.map((msg) => {
            const isMe = msg.senderRole === currentUserRole;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#71717a]">
                    {isMe ? 'You' : msg.senderName}
                  </span>
                  <span className="text-[9px] text-[#a1a1aa] font-mono">
                    {msg.timestamp}
                  </span>
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${
                    isMe
                      ? 'bg-[#0F4C5C] text-white rounded-br-xs'
                      : 'bg-white border border-[#e8e6df] text-[#1c2429] rounded-bl-xs'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-[#e8e6df] flex gap-2 items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.typeMessagePlaceholder}
            className="flex-1 px-4 py-2.5 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429] outline-none focus:border-[#0F4C5C]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#0F4C5C] hover:bg-[#135d70] disabled:opacity-40 transition flex items-center gap-1.5 shadow-sm"
          >
            <span>{t.send}</span>
            <Send className="w-3.5 h-3.5 text-[#F4A261]" />
          </button>
        </form>
      </div>
    </div>
  );
};

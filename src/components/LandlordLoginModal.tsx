import React, { useState } from 'react';
import {
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Phone,
  KeyRound
} from 'lucide-react';
import { LandlordProfile } from '../types';
import { Language, translations } from '../translations';

interface LandlordLoginModalProps {
  currentLandlord: LandlordProfile | null;
  onLogin: (email: string, phone?: string) => void;
  onClose: () => void;
  onSwitchToPost: () => void;
  language: Language;
}

export const LandlordLoginModal: React.FC<LandlordLoginModalProps> = ({
  currentLandlord,
  onLogin,
  onClose,
  onSwitchToPost,
  language,
}) => {
  const t = translations[language];
  const [email, setEmail] = useState(currentLandlord?.email || 'peter.horvath@post.sk');
  const [loginMethod, setLoginMethod] = useState<'otp' | 'password'>('otp');
  const [step, setStep] = useState<'input' | 'otp_verify'>('input');
  const [otpCode, setOtpCode] = useState('');
  const [password, setPassword] = useState('');
  const [sentTo, setSentTo] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSentTo(email);
    setStep('otp_verify');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
    onClose();
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full border border-[#e8e6df] shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8a7f70] hover:text-[#1c2429] p-1 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#0F4C5C] text-[#F4A261] flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1c2429]">
              {t.landlordSignIn}
            </h3>
            <p className="text-xs text-[#71717a]">
              Livix Bratislava Landlord Portal
            </p>
          </div>
        </div>

        {step === 'input' ? (
          <div className="space-y-4">
            <div className="p-3 bg-[#FAFAF8] border border-[#e8e6df] rounded-xl text-xs flex items-center justify-between">
              <div>
                <span className="text-[#71717a] block text-[11px]">Demo Verified Landlord:</span>
                <span className="font-bold text-[#1c2429]">{currentLandlord?.fullName || 'Ing. Peter Horváth'}</span>
              </div>
              <button
                type="button"
                onClick={() => setEmail(currentLandlord?.email || 'peter.horvath@post.sk')}
                className="text-[11px] font-bold text-[#0F4C5C] underline"
              >
                Use Demo
              </button>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#1c2429] block mb-1">
                  Email / Phone (+421...)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8a7f70] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="peter.horvath@post.sk"
                    className="w-full pl-9 pr-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429] outline-none focus:border-[#0F4C5C]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[#0F4C5C] hover:bg-[#135d70] transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Send Login Code</span>
                <ArrowRight className="w-4 h-4 text-[#F4A261]" />
              </button>
            </form>
          </div>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3 bg-[#0F4C5C]/5 border border-[#0F4C5C]/20 rounded-xl text-xs space-y-1">
              <span className="font-semibold text-[#0F4C5C] block">Verification code sent!</span>
              <p className="text-[11px] text-[#4b4b45]">
                Use demo code <code className="bg-white px-1 py-0.5 rounded font-mono font-bold text-[#0F4C5C]">482109</code>.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1c2429] block mb-1">
                Enter Code
              </label>
              <input
                type="text"
                autoFocus
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="482109"
                className="w-full py-2.5 px-3 text-center tracking-widest font-mono text-base bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-[#1c2429] outline-none focus:border-[#0F4C5C]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[#0F4C5C] hover:bg-[#135d70] transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-[#F4A261]" />
              <span>Confirm & Sign In</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

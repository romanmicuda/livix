import React, { useState } from 'react';
import {
  UserCheck,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Phone,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { TenantPassport, IdDocumentType } from '../types';
import { Language, translations } from '../translations';

interface TenantAccountModalProps {
  currentTenant: TenantPassport;
  onLoginOrUpdate: (updated: TenantPassport) => void;
  onClose: () => void;
  language: Language;
}

export const TenantAccountModal: React.FC<TenantAccountModalProps> = ({
  currentTenant,
  onLoginOrUpdate,
  onClose,
  language,
}) => {
  const t = translations[language];
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState(currentTenant.email);
  const [fullName, setFullName] = useState(currentTenant.fullName);
  const [phone, setPhone] = useState(currentTenant.phone);
  const [idDocType, setIdDocType] = useState<IdDocumentType>(
    currentTenant.verifications?.idDocumentType || 'obciansky_preukaz'
  );
  const [idNumber, setIdNumber] = useState(
    currentTenant.verifications?.idNumberMasked || 'EK 391***'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginOrUpdate({
      ...currentTenant,
      fullName,
      email,
      phone,
      verifications: {
        ...currentTenant.verifications,
        idDocumentType: idDocType,
        idNumberMasked: idNumber,
        isIdVerified: true,
      }
    });
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
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1c2429]">
              {t.renterAccount}
            </h3>
            <p className="text-xs text-[#71717a]">
              Livix Bratislava Renter Passport
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#1c2429] block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8a7f70] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="michal.varga@gmail.com"
                className="w-full pl-9 pr-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429] outline-none focus:border-[#0F4C5C]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1c2429] block mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429] outline-none"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#e8e6df] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1c2429] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#0F4C5C]" />
                <span>{t.mandatoryIdTitle}</span>
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                Required
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] text-[#71717a] block mb-0.5">Doc Type</label>
                <select
                  value={idDocType}
                  onChange={(e) => setIdDocType(e.target.value as IdDocumentType)}
                  className="w-full p-1.5 bg-white border border-[#cbd5e1] rounded-lg text-xs"
                >
                  <option value="obciansky_preukaz">Slovak ID (Občiansky preukaz)</option>
                  <option value="passport">Passport (Cestovný pas / Закордонний паспорт)</option>
                  <option value="residency_card">Residence Permit (Pobytový preukaz)</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-[#71717a] block mb-0.5">Document # (Masked)</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full p-1.5 bg-white border border-[#cbd5e1] rounded-lg text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[#0F4C5C] hover:bg-[#135d70] transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>{t.saveChanges}</span>
            <ArrowRight className="w-4 h-4 text-[#F4A261]" />
          </button>
        </form>
      </div>
    </div>
  );
};

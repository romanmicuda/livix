import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  UserCheck,
  CheckCircle2,
  Mail,
  Phone,
  Briefcase,
  Wallet,
  PawPrint,
  Clock,
  Star,
  ExternalLink,
  Edit3,
  Check,
  Award,
  Users,
  Baby,
  FileCheck,
  Shield,
  HelpCircle,
  FileText,
  BadgeAlert,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { TenantPassport, IdDocumentType } from '../types';
import { Language, translations } from '../translations';

interface TenantPassportViewProps {
  passport: TenantPassport;
  onUpdatePassport: (updated: TenantPassport) => void;
  onOpenAccountModal?: () => void;
  language: Language;
}

export const TenantPassportView: React.FC<TenantPassportViewProps> = ({
  passport,
  onUpdatePassport,
  onOpenAccountModal,
  language,
}) => {
  const t = translations[language];

  const [isEditing, setIsEditing] = useState(false);
  const [headline, setHeadline] = useState(passport.headline);
  const [bio, setBio] = useState(passport.bio);
  const [occupation, setOccupation] = useState(passport.occupation);
  const [employer, setEmployer] = useState(passport.employer);
  const [coOccupants, setCoOccupants] = useState(passport.coOccupantsDescription || '');
  const [hasPets, setHasPets] = useState(passport.hasPets);
  const [petDetails, setPetDetails] = useState(passport.petDetails || '');
  const [hasChildren, setHasChildren] = useState(passport.hasChildren);
  const [childrenDetails, setChildrenDetails] = useState(passport.childrenDetails || '');
  const [needsResidence, setNeedsResidence] = useState(passport.needsResidenceRegistration);
  
  const [verifs, setVerifs] = useState(passport.verifications);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const calculateScore = (v: typeof verifs) => {
    let score = 0;
    if (v.isIdVerified) score += 40;
    if (v.employmentVerified) score += 15;
    if (v.depositPreCleared || v.bankSolvencyVerified) score += 15;
    if (v.noDebtsDeclared) score += 10;
    if (v.hasPreviousLandlordVouch || !!passport.previousLandlordReference) score += 10;
    if (v.tenantLiabilityInsurance) score += 5;
    if (v.linkedInVerified || !!passport.linkedInUrl) score += 5;
    return score;
  };

  const currentScore = calculateScore(verifs);

  const handleSave = () => {
    onUpdatePassport({
      ...passport,
      headline,
      bio,
      occupation,
      employer,
      coOccupantsDescription: coOccupants,
      hasPets,
      petDetails,
      hasChildren,
      childrenDetails,
      needsResidenceRegistration: needsResidence,
      verifications: verifs
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const toggleBooster = (key: keyof typeof verifs) => {
    const updated = { ...verifs, [key]: !verifs[key] };
    setVerifs(updated);
    onUpdatePassport({ ...passport, verifications: updated });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e8e6df] rounded-2xl p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F4C5C] mb-1">
            <ShieldCheck className="w-4 h-4 text-[#0F4C5C]" />
            Livix Renter Passport
          </div>
          <h2 className="text-2xl font-bold text-[#1c2429]">
            {passport.fullName} · {t.passportTitle}
          </h2>
          <p className="text-xs text-[#71717a] mt-1 max-w-xl">
            {t.passportSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs text-[#0F4C5C] font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
          {onOpenAccountModal && (
            <button
              onClick={onOpenAccountModal}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-[#e8e6df] bg-white hover:bg-slate-50 text-[#1c2429] transition"
            >
              {t.renterAccount}
            </button>
          )}
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0F4C5C] hover:bg-[#135d70] transition flex items-center gap-1.5 shadow-sm"
          >
            {isEditing ? <Check className="w-3.5 h-3.5 text-[#F4A261]" /> : <Edit3 className="w-3.5 h-3.5 text-[#F4A261]" />}
            <span>{isEditing ? t.saveChanges : t.editPassport}</span>
          </button>
        </div>
      </div>

      {/* Main Passport Card */}
      <div className="bg-white border-2 border-[#0F4C5C]/20 rounded-3xl overflow-hidden shadow-sm">
        {/* Passport Header Bar */}
        <div className="bg-[#0F4C5C] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={passport.avatarUrl}
              alt={passport.fullName}
              className="w-18 h-18 rounded-2xl object-cover border-2 border-white/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white">
                  {passport.fullName}
                </h3>
                <span className="text-xs text-[#F4A261] font-semibold">
                  (Age {passport.age})
                </span>
              </div>
              <p className="text-xs text-[#e2ecee] font-medium mt-0.5">
                {passport.headline}
              </p>
              <div className="text-[11px] text-[#c1d7db] flex items-center gap-2 mt-1">
                <span>{passport.email}</span>
                <span>·</span>
                <span>{passport.phone}</span>
              </div>
            </div>
          </div>

          {/* Credibility Score Badge */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center sm:min-w-[150px]">
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#F4A261]">
              {t.credibilityScore}
            </div>
            <div className="text-3xl font-extrabold text-white font-mono mt-0.5">
              {currentScore}%
            </div>
            <div className="text-[10px] text-[#e2ecee] mt-0.5 font-medium">
              {currentScore >= 90
                ? '⭐ Top 5% Applicant'
                : currentScore >= 70
                ? 'Verified & Credible'
                : 'ID Verified'}
            </div>
          </div>
        </div>

        {/* 1. MANDATORY VERIFICATION: Identity Document */}
        <div className="p-6 bg-[#f7f6f2] border-b border-[#e8e6df]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0F4C5C] text-white flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5 text-[#F4A261]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1c2429]">
                    {t.mandatoryIdTitle}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {t.mandatoryIdActive}
                  </span>
                </div>
                <p className="text-[11px] text-[#52525b] mt-0.5">
                  {t.mandatoryIdDesc} (Doc #{verifs.idNumberMasked})
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#059669] font-bold flex items-center gap-1 sm:justify-end">
                <CheckCircle2 className="w-3.5 h-3.5" /> ID Verified
              </span>
              <span className="text-[10px] text-[#71717a]">+40 Base Points</span>
            </div>
          </div>
        </div>

        {/* 2. OPTIONAL CREDIBILITY BOOSTERS */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-[#8a7f70] uppercase tracking-wider">
                {t.optionalBoostersTitle}
              </h4>
              <p className="text-xs text-[#71717a] mt-0.5">
                {t.optionalBoostersSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Booster 1: Employment Contract */}
            <div
              onClick={() => toggleBooster('employmentVerified')}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between ${
                verifs.employmentVerified
                  ? 'bg-[#0F4C5C]/5 border-[#0F4C5C]/30'
                  : 'bg-[#FAFAF8] border-[#e8e6df] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#0F4C5C]" />
                  <span className="text-xs font-bold text-[#1c2429]">
                    {t.employmentVerification}
                  </span>
                </div>
                <p className="text-[11px] text-[#52525b]">
                  Contract at {passport.employer}. Confirms stable monthly income.
                </p>
              </div>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                verifs.employmentVerified ? 'bg-[#0F4C5C] border-[#0F4C5C] text-white' : 'border-[#cbd5e1] bg-white'
              }`}>
                {verifs.employmentVerified && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* Booster 2: Deposit Pre-clearance */}
            <div
              onClick={() => toggleBooster('depositPreCleared')}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between ${
                verifs.depositPreCleared
                  ? 'bg-[#0F4C5C]/5 border-[#0F4C5C]/30'
                  : 'bg-[#FAFAF8] border-[#e8e6df] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-[#0F4C5C]" />
                  <span className="text-xs font-bold text-[#1c2429]">
                    {t.depositPreCleared}
                  </span>
                </div>
                <p className="text-[11px] text-[#52525b]">
                  Pre-verified liquidity for 2-month security deposit.
                </p>
              </div>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                verifs.depositPreCleared ? 'bg-[#0F4C5C] border-[#0F4C5C] text-white' : 'border-[#cbd5e1] bg-white'
              }`}>
                {verifs.depositPreCleared && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* Booster 3: Clean Debt Registry */}
            <div
              onClick={() => toggleBooster('noDebtsDeclared')}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between ${
                verifs.noDebtsDeclared
                  ? 'bg-[#0F4C5C]/5 border-[#0F4C5C]/30'
                  : 'bg-[#FAFAF8] border-[#e8e6df] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0F4C5C]" />
                  <span className="text-xs font-bold text-[#1c2429]">
                    {t.cleanRegister}
                  </span>
                </div>
                <p className="text-[11px] text-[#52525b]">
                  Confirmed zero debts in the Slovak Register of Executions.
                </p>
              </div>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                verifs.noDebtsDeclared ? 'bg-[#0F4C5C] border-[#0F4C5C] text-white' : 'border-[#cbd5e1] bg-white'
              }`}>
                {verifs.noDebtsDeclared && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* Booster 4: Previous Landlord Reference */}
            <div
              onClick={() => toggleBooster('hasPreviousLandlordVouch')}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between ${
                verifs.hasPreviousLandlordVouch
                  ? 'bg-[#0F4C5C]/5 border-[#0F4C5C]/30'
                  : 'bg-[#FAFAF8] border-[#e8e6df] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#F4A261] fill-[#F4A261]" />
                  <span className="text-xs font-bold text-[#1c2429]">
                    {t.landlordVouch}
                  </span>
                </div>
                <p className="text-[11px] text-[#52525b]">
                  Verified contact & review from previous Bratislava tenancy.
                </p>
              </div>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                verifs.hasPreviousLandlordVouch ? 'bg-[#0F4C5C] border-[#0F4C5C] text-white' : 'border-[#cbd5e1] bg-white'
              }`}>
                {verifs.hasPreviousLandlordVouch && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* Booster 5: Tenant Liability Insurance */}
            <div
              onClick={() => toggleBooster('tenantLiabilityInsurance')}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between ${
                verifs.tenantLiabilityInsurance
                  ? 'bg-[#0F4C5C]/5 border-[#0F4C5C]/30'
                  : 'bg-[#FAFAF8] border-[#e8e6df] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#0F4C5C]" />
                  <span className="text-xs font-bold text-[#1c2429]">
                    {t.liabilityInsurance}
                  </span>
                </div>
                <p className="text-[11px] text-[#52525b]">
                  Policy covering accidental damages to flat or neighbors.
                </p>
              </div>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                verifs.tenantLiabilityInsurance ? 'bg-[#0F4C5C] border-[#0F4C5C] text-white' : 'border-[#cbd5e1] bg-white'
              }`}>
                {verifs.tenantLiabilityInsurance && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* Booster 6: LinkedIn / Corporate Profile */}
            <div
              onClick={() => toggleBooster('linkedInVerified')}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between ${
                verifs.linkedInVerified
                  ? 'bg-[#0F4C5C]/5 border-[#0F4C5C]/30'
                  : 'bg-[#FAFAF8] border-[#e8e6df] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-[#0F4C5C]" />
                  <span className="text-xs font-bold text-[#1c2429]">
                    {t.linkedInProfile}
                  </span>
                </div>
                <p className="text-[11px] text-[#52525b]">
                  Verified professional employment network profile.
                </p>
              </div>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                verifs.linkedInVerified ? 'bg-[#0F4C5C] border-[#0F4C5C] text-white' : 'border-[#cbd5e1] bg-white'
              }`}>
                {verifs.linkedInVerified && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>
        </div>

        {/* 3. OCCUPANCY & ABOUT */}
        <div className="p-6 sm:p-8 pt-0 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-[#8a7f70] uppercase tracking-wider mb-3">
              {t.rulesHeading}
            </h4>
            <div className="bg-[#FAFAF8] border border-[#e8e6df] rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-[#f0ede6] pb-2">
                <span className="text-[#71717a]">Total Occupants:</span>
                <span className="font-bold text-[#1c2429]">{passport.occupantsCount} people</span>
              </div>

              <div>
                <span className="text-[11px] text-[#71717a] block mb-1">Co-occupant details:</span>
                <p className="text-xs text-[#1c2429]">
                  {passport.coOccupantsDescription || 'Living alone'}
                </p>
              </div>

              <div className="pt-2 border-t border-[#f0ede6]">
                <div className="text-xs mb-1 font-bold text-[#1c2429] flex items-center gap-1.5">
                  <PawPrint className="w-4 h-4 text-[#E76F51]" />
                  <span>Pet Passport</span>
                </div>
                <p className="text-xs text-[#4b4b45] pl-5.5">
                  {passport.hasPets ? passport.petDetails : 'No pets'}
                </p>
              </div>

              <div className="pt-2 border-t border-[#f0ede6]">
                <div className="text-xs mb-1 font-bold text-[#1c2429] flex items-center gap-1.5">
                  <Baby className="w-4 h-4 text-[#0F4C5C]" />
                  <span>Children</span>
                </div>
                <p className="text-xs text-[#4b4b45] pl-5.5">
                  {passport.hasChildren ? passport.childrenDetails : 'No children'}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#8a7f70] uppercase tracking-wider mb-2">
              Bio
            </h4>
            <p className="text-xs text-[#3f3f46] leading-relaxed bg-[#FAFAF8] border border-[#e8e6df] rounded-xl p-4">
              "{passport.bio}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

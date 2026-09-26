import React, { useState } from 'react';
import {
  Inbox,
  UserCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  Mail,
  XCircle,
  Sparkles,
  Building,
  Check,
  ShieldAlert,
  ChevronDown,
  Star,
  PawPrint,
  Briefcase,
  Baby,
  BadgeCheck,
  FileText,
  FileCheck,
  Shield,
  Wallet,
  MessageSquare
} from 'lucide-react';
import { Property, RentalApplication } from '../types';
import { Language, translations } from '../translations';

interface LandlordDashboardProps {
  properties: Property[];
  applications: RentalApplication[];
  onUpdateAppStatus: (
    appId: string,
    status: RentalApplication['status'],
    viewingSlot?: string
  ) => void;
  onNavigateToListProperty: () => void;
  onOpenChatWithApplicant: (application: RentalApplication) => void;
  language: Language;
}

export const LandlordDashboard: React.FC<LandlordDashboardProps> = ({
  properties,
  applications,
  onUpdateAppStatus,
  onNavigateToListProperty,
  onOpenChatWithApplicant,
  language,
}) => {
  const t = translations[language];

  const [selectedAppId, setSelectedAppId] = useState<string | null>(
    applications[0]?.id || null
  );
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const selectedApp = applications.find((a) => a.id === selectedAppId);
  const selectedProperty = selectedApp
    ? properties.find((p) => p.id === selectedApp.propertyId)
    : null;

  const filteredApps = applications.filter((app) => {
    if (filterStatus === 'all') return true;
    return app.status === filterStatus;
  });

  const getApplicantScore = (app: RentalApplication) => {
    const v = app.tenant.verifications;
    if (!v) return app.matchScore;
    let s = 0;
    if (v.isIdVerified) s += 40;
    if (v.employmentVerified) s += 15;
    if (v.depositPreCleared || v.bankSolvencyVerified) s += 15;
    if (v.noDebtsDeclared) s += 10;
    if (v.hasPreviousLandlordVouch || !!app.tenant.previousLandlordReference) s += 10;
    if (v.tenantLiabilityInsurance) s += 5;
    if (v.linkedInVerified) s += 5;
    return s;
  };

  const handleApproveViewing = (app: RentalApplication) => {
    onUpdateAppStatus(
      app.id,
      'viewing_scheduled',
      app.requestedSlotLabel || 'Confirmed slot'
    );
  };

  const handleDisapproveViewing = (app: RentalApplication) => {
    onUpdateAppStatus(app.id, 'declined');
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e8e6df] rounded-2xl p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F4C5C] mb-1">
            <Building className="w-4 h-4 text-[#0F4C5C]" />
            {t.landlordPortal}
          </div>
          <h2 className="text-2xl font-bold text-[#1c2429]">
            {t.landlordDashboardTitle}
          </h2>
          <p className="text-xs text-[#71717a] mt-1 max-w-xl">
            {t.landlordDashboardSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToListProperty}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F4C5C] hover:bg-[#135d70] transition shadow-sm"
          >
            {t.postAnotherProperty}
          </button>
        </div>
      </div>

      {/* Main Inbox 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Applicant Queue */}
        <div className="lg:col-span-5 bg-white border border-[#e8e6df] rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-3 border-b border-[#f0ede6] bg-[#FAFAF8] flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              {(['all', 'pending', 'viewing_scheduled', 'approved'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 rounded-lg capitalize font-medium transition ${
                    filterStatus === st
                      ? 'bg-white text-[#0F4C5C] font-bold shadow-xs'
                      : 'text-[#71717a] hover:text-[#1c2429]'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-[#71717a]">
              {filteredApps.length}
            </span>
          </div>

          <div className="divide-y divide-[#f0ede6] max-h-[640px] overflow-y-auto">
            {filteredApps.map((app) => {
              const isSelected = app.id === selectedAppId;
              const score = getApplicantScore(app);

              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`p-4 cursor-pointer transition flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-[#0F4C5C]/5 border-l-4 border-l-[#0F4C5C]'
                      : 'hover:bg-[#fcfbf9]'
                  }`}
                >
                  <img
                    src={app.tenant.avatarUrl}
                    alt={app.tenant.fullName}
                    className="w-12 h-12 rounded-xl object-cover border border-[#e8e6df] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-[#1c2429] truncate">
                        {app.tenant.fullName}
                      </h4>
                      <span className="text-[11px] font-mono font-bold text-[#0F4C5C] shrink-0">
                        {score}%
                      </span>
                    </div>

                    <div className="text-[11px] text-[#71717a] truncate mt-0.5">
                      {app.tenant.occupation} · {app.tenant.employer}
                    </div>

                    <div className="mt-1 text-[11px] text-[#0F4C5C] font-semibold flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span className="truncate">{app.requestedSlotLabel || 'Open'}</span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      {app.status === 'viewing_scheduled' ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {t.viewingApprovedChatOpen}
                        </span>
                      ) : app.status === 'approved' ? (
                        <span className="text-emerald-800 font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> {t.approveLease}
                        </span>
                      ) : app.status === 'declined' ? (
                        <span className="text-rose-700 font-medium">
                          {t.viewingDisapproved}
                        </span>
                      ) : (
                        <span className="text-[#F4A261] font-bold">
                          {t.awaitingApproval}
                        </span>
                      )}
                      <span className="text-[#a1a1aa]">{app.appliedAt}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Tenant Dossier */}
        <div className="lg:col-span-7 bg-white border border-[#e8e6df] rounded-2xl p-6 shadow-sm space-y-6">
          {selectedApp ? (
            <>
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f0ede6]">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedApp.tenant.avatarUrl}
                    alt={selectedApp.tenant.fullName}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#e8e6df]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[#1c2429]">
                        {selectedApp.tenant.fullName}
                      </h3>
                      <span className="text-[11px] font-mono font-bold bg-[#0F4C5C]/10 text-[#0F4C5C] px-2 py-0.5 rounded-lg">
                        {getApplicantScore(selectedApp)}% Score
                      </span>
                    </div>
                    <p className="text-xs text-[#71717a]">
                      {selectedApp.tenant.headline}
                    </p>
                  </div>
                </div>

                {/* Workflow Actions */}
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedApp.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleApproveViewing(selectedApp)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0F4C5C] hover:bg-[#135d70] transition flex items-center gap-1.5 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5 text-[#F4A261]" />
                        <span>{t.approveViewing}</span>
                      </button>

                      <button
                        onClick={() => handleDisapproveViewing(selectedApp)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-[#71717a] hover:bg-slate-100 border border-[#e8e6df] transition"
                      >
                        {t.disapprove}
                      </button>
                    </>
                  ) : selectedApp.status === 'viewing_scheduled' ? (
                    <>
                      <button
                        onClick={() => onOpenChatWithApplicant(selectedApp)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0F4C5C] hover:bg-[#135d70] transition flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#F4A261]" />
                        <span>{t.directChat} ({selectedApp.messages.length})</span>
                      </button>

                      <button
                        onClick={() => onUpdateAppStatus(selectedApp.id, 'approved')}
                        className="px-3 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
                      >
                        {t.approveLease}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => onOpenChatWithApplicant(selectedApp)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0F4C5C] hover:bg-[#135d70] transition flex items-center gap-1.5 shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#F4A261]" />
                      <span>{t.chatWithTenant}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Viewing Slot Approval Highlight */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0F4C5C]/5 to-[#F4A261]/10 border border-[#0F4C5C]/20 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#0F4C5C] uppercase tracking-wider block">
                    {t.requestedViewingSpot}
                  </span>
                  <div className="text-sm font-bold text-[#1c2429] mt-0.5 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#0F4C5C]" />
                    <span>{selectedApp.requestedSlotLabel || 'Flexible'}</span>
                  </div>
                </div>

                {selectedApp.status === 'viewing_scheduled' && (
                  <button
                    onClick={() => onOpenChatWithApplicant(selectedApp)}
                    className="px-3.5 py-1.5 bg-[#0F4C5C] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#F4A261]" />
                    <span>{t.chatWithTenant}</span>
                  </button>
                )}
              </div>

              {/* Cover Note */}
              <div>
                <h4 className="text-xs font-bold text-[#8a7f70] uppercase tracking-wider mb-2">
                  Správa záujemcu / Cover Note
                </h4>
                <div className="bg-[#fcfbf9] border border-[#e8e6df] rounded-xl p-3.5 text-xs text-[#27272a] leading-relaxed">
                  "{selectedApp.coverNote}"
                </div>
              </div>

              {/* Mandatory ID Verified */}
              <div className="p-3.5 rounded-xl bg-[#f7f6f2] border border-[#e8e6df] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <FileCheck className="w-5 h-5 text-[#0F4C5C]" />
                  <div>
                    <span className="font-bold text-[#1c2429] block">
                      {t.mandatoryIdTitle}
                    </span>
                    <span className="text-[11px] text-[#71717a]">
                      Doc #{selectedApp.tenant.verifications.idNumberMasked}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  ✓ {t.mandatoryIdActive}
                </span>
              </div>
            </>
          ) : (
            <div className="py-20 text-center space-y-2">
              <Inbox className="w-8 h-8 text-[#9ca3af] mx-auto" />
              <h4 className="text-sm font-bold text-[#1c2429]">No application selected</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

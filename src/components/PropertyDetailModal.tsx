import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Train,
  Check,
  Building,
  Calendar,
  ShieldCheck,
  ChevronRight,
  PawPrint,
  CigaretteOff,
  UserCheck,
  Send,
  Baby,
  FileText,
  BadgeCheck,
  Clock,
  MessageSquare
} from 'lucide-react';
import { Property, TenantPassport, ViewingSlot } from '../types';
import { Language, translations } from '../translations';

interface PropertyDetailModalProps {
  property: Property;
  tenantPassport: TenantPassport;
  onClose: () => void;
  onSubmitApplication: (
    propertyId: string,
    coverNote: string,
    selectedSlot?: ViewingSlot
  ) => void;
  hasApplied: boolean;
  onOpenChat?: () => void;
  language: Language;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  tenantPassport,
  onClose,
  onSubmitApplication,
  hasApplied,
  onOpenChat,
  language,
}) => {
  const t = translations[language];

  const [selectedImage, setSelectedImage] = useState(0);
  const [showApplyBox, setShowApplyBox] = useState(false);
  
  const availableSlots = property.viewingSlots || [];
  const [selectedSlotId, setSelectedSlotId] = useState<string>(
    availableSlots.find(s => !s.isBooked)?.id || ''
  );

  const defaultNote = language === 'sk'
    ? `Dobrý deň ${property.landlord.fullName}! Máme veľký záujem o Váš byt na ${property.street}. Vybrali sme si termín obhliadky a máme pripravenú 2-mesačnú kauciu.`
    : language === 'uk'
    ? `Доброго дня, ${property.landlord.fullName}! Нас дуже зацікавила ваша квартира на ${property.street}. Ми обрали час для перегляду та маємо готову заставу.`
    : `Hello ${property.landlord.fullName}! We are very interested in your flat at ${property.street}. We have selected a viewing spot and have 2 months deposit ready.`;

  const [coverNote, setCoverNote] = useState(defaultNote);
  const totalMonthly = property.rentEur + property.energyEur;

  const handleApply = () => {
    const chosenSlot = availableSlots.find(s => s.id === selectedSlotId);
    onSubmitApplication(property.id, coverNote, chosenSlot);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#e8e6df] shadow-2xl relative">
        {/* Sticky Modal Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#e8e6df] flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#52525b] hover:text-[#1c2429] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToListings}</span>
          </button>

          <div className="flex items-center gap-2">
            {property.landlord.katasterVerified && (
              <span className="text-[11px] font-bold text-[#0F4C5C] bg-[#0F4C5C]/10 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5 text-[#0F4C5C]" />
                <span>{t.katasterVerified} ({property.landlord.listVlastnictvaNumber || 'LV'})</span>
              </span>
            )}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="p-6 pb-2 space-y-3">
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100">
            <img
              src={property.images[selectedImage] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {property.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === i ? 'border-[#0F4C5C]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Body Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols): Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#0F4C5C] font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{property.district} · {property.street}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#1c2429] tracking-tight">
                {property.title}
              </h2>
            </div>

            {/* Quick Specs */}
            <div className="bg-[#f7f6f2] border border-[#e8e6df] rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[#71717a] block">{t.disposition}</span>
                <span className="font-bold text-[#1c2429] mt-0.5 block">{property.rooms}</span>
              </div>
              <div>
                <span className="text-[#71717a] block">{t.usableArea}</span>
                <span className="font-bold text-[#1c2429] mt-0.5 block">{property.sizeM2} m²</span>
              </div>
              <div>
                <span className="text-[#71717a] block">{t.floor}</span>
                <span className="font-bold text-[#1c2429] mt-0.5 block">
                  {property.floor}/{property.totalFloors}
                  {property.hasElevator && ` (${t.elevator})`}
                </span>
              </div>
              <div>
                <span className="text-[#71717a] block">{t.availableFrom}</span>
                <span className="font-bold text-[#1c2429] mt-0.5 block">{property.availableFrom}</span>
              </div>
            </div>

            {/* Viewing Availability Booking Schedule */}
            <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#e8e6df] space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#0F4C5C] flex items-center gap-1.5 uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-[#0F4C5C]" />
                  <span>{t.openViewingSpots}</span>
                </h4>
                <span className="text-[11px] text-[#71717a]">
                  {t.selectSlotApplying}
                </span>
              </div>

              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;
                    return (
                      <div
                        key={slot.id}
                        onClick={() => !slot.isBooked && setSelectedSlotId(slot.id)}
                        className={`p-3 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between ${
                          slot.isBooked
                            ? 'bg-[#f4f2ec] border-[#e8e6df] opacity-50 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#0F4C5C]/10 border-[#0F4C5C] text-[#0F4C5C] font-semibold'
                            : 'bg-white border-[#e8e6df] text-[#27272a] hover:border-[#cbd5e1]'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="block font-bold">{slot.date}</span>
                          <span className="text-[11px] text-[#71717a] font-mono">{slot.time}</span>
                        </div>
                        {slot.isBooked ? (
                          <span className="text-[10px] text-[#a1a1aa] font-bold">{t.booked}</span>
                        ) : isSelected ? (
                          <span className="text-[10px] bg-[#0F4C5C] text-white px-2 py-0.5 rounded font-bold">{t.selected}</span>
                        ) : (
                          <span className="text-[10px] text-[#0F4C5C] font-semibold">{t.available}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-[#71717a]">
                  No predefined slots yet.
                </p>
              )}
            </div>

            {/* Pets & Children Policies */}
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#e8e6df] space-y-3">
              <h4 className="text-xs font-bold text-[#8a7f70] uppercase tracking-wider">
                {t.rulesHeading}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#1c2429]">
                    <PawPrint className="w-4 h-4 text-[#E76F51]" />
                    <span>
                      {property.policy.petsPolicy === 'allowed'
                        ? t.petsWelcome
                        : property.policy.petsPolicy === 'case_by_case'
                        ? t.petsCaseByCase
                        : t.noPets}
                    </span>
                  </div>
                  {property.policy.petsPolicy !== 'not_allowed' && (
                    <p className="text-[11px] text-[#71717a] pl-5.5">
                      Accepts: {property.policy.allowedPetTypes?.join(', ') || 'Indoor pets'}
                      {property.policy.petDepositExtraEur ? ` (+€${property.policy.petDepositExtraEur})` : ''}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#1c2429]">
                    <Baby className="w-4 h-4 text-[#0F4C5C]" />
                    <span>
                      {property.policy.childrenWelcome ? t.childrenWelcome : t.notSuitableChildren}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#71717a] pl-5.5">
                    {property.policy.idealForFamilies
                      ? 'Parks & kindergartens nearby'
                      : `Max: ${property.policy.maxOccupants}`}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#1c2429]">
                    <FileText className="w-4 h-4 text-[#0F4C5C]" />
                    <span>{t.residenceRegistration}</span>
                  </div>
                  <p className="text-[11px] text-[#71717a] pl-5.5">
                    {property.policy.allowsPermanentResidence
                      ? t.residenceConsent
                      : 'No'}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#1c2429]">
                    <CigaretteOff className="w-4 h-4 text-[#E76F51]" />
                    <span>{t.smokingPolicy}</span>
                  </div>
                  <p className="text-[11px] text-[#71717a] pl-5.5">
                    {property.policy.smokingPolicy === 'strictly_no'
                      ? t.strictlyNonSmoking
                      : property.policy.smokingPolicy === 'balcony_only'
                      ? t.balconyOnly
                      : t.smokingAllowed}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-[#8a7f70] uppercase tracking-wider mb-2">
                Popis / Description
              </h4>
              <p className="text-xs text-[#3f3f46] leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>
          </div>

          {/* Right Column (1 Col): Pricing Card & Booking Action */}
          <div className="space-y-4">
            <div className="bg-[#FAFAF8] border-2 border-[#0F4C5C]/20 rounded-3xl p-5 space-y-4 shadow-sm">
              <div>
                <span className="text-[11px] text-[#71717a] block">{t.pureRent} + {t.utilities}</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-extrabold text-[#0F4C5C] font-mono">
                    €{totalMonthly}
                  </span>
                  <span className="text-xs text-[#71717a]">/ {t.month}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs border-t border-b border-[#e8e6df] py-3 text-[#52525b]">
                <div className="flex justify-between">
                  <span>{t.pureRent}:</span>
                  <span className="font-semibold text-[#1c2429]">€{property.rentEur}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.utilities}:</span>
                  <span className="font-semibold text-[#1c2429]">€{property.energyEur}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.deposit}:</span>
                  <span className="font-semibold text-[#1c2429]">€{property.depositEur}</span>
                </div>
                <div className="flex justify-between text-[#0F4C5C] font-medium pt-1">
                  <span>Provízia:</span>
                  <span className="font-bold">€0 (Bez RK)</span>
                </div>
              </div>

              {/* Owner Info & Kataster Badge */}
              <div className="p-3 bg-white border border-[#e8e6df] rounded-2xl space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0F4C5C] text-white flex items-center justify-center font-bold text-xs">
                    {property.landlord.fullName[0]}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1c2429] block">
                      {property.landlord.fullName}
                    </span>
                    <span className="text-[11px] text-[#0F4C5C] font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> {t.katasterVerified}
                    </span>
                  </div>
                </div>
              </div>

              {/* Apply & Book Viewing Action */}
              {hasApplied ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-emerald-900">{t.alreadyAppliedNotice}</h4>
                  {onOpenChat && (
                    <button
                      onClick={onOpenChat}
                      className="mt-2 w-full py-2 bg-[#0F4C5C] text-white rounded-xl text-xs font-bold hover:bg-[#135d70] transition flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#F4A261]" />
                      <span>{t.openDirectChat}</span>
                    </button>
                  )}
                </div>
              ) : showApplyBox ? (
                <div className="space-y-3 pt-2">
                  <div className="p-2.5 rounded-xl bg-[#0F4C5C]/5 border border-[#0F4C5C]/20 text-xs text-[#0F4C5C]">
                    <span className="font-bold block">{t.selectedViewingSlot}</span>
                    <span className="font-mono text-[11px]">
                      {availableSlots.find(s => s.id === selectedSlotId)
                        ? `${availableSlots.find(s => s.id === selectedSlotId)?.date} (${availableSlots.find(s => s.id === selectedSlotId)?.time})`
                        : 'Flexible'}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#71717a] flex items-center gap-1.5 bg-[#f0ede6] p-2 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-[#0F4C5C] shrink-0" />
                    <span>{t.passportAttachedNotice}</span>
                  </div>

                  <textarea
                    rows={4}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429] outline-none focus:border-[#0F4C5C]"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowApplyBox(false)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-[#71717a] hover:bg-slate-200/50"
                    >
                      {t.cancel}
                    </button>
                    <button
                      onClick={handleApply}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0F4C5C] hover:bg-[#135d70] transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5 text-[#F4A261]" />
                      <span>{t.bookSlotAndApply}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowApplyBox(true)}
                  className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-[#0F4C5C] hover:bg-[#135d70] transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <UserCheck className="w-4 h-4 text-[#F4A261]" />
                  <span>{t.applyAndBook}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

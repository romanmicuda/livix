import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Check,
  Plus,
  ArrowLeft,
  Upload,
  PawPrint,
  CigaretteOff,
  Baby,
  ShieldCheck,
  FileCheck,
  Sparkles,
  Mail,
  Phone,
  Lock,
  User,
  CheckCircle2,
  BadgeCheck,
  AlertCircle
} from 'lucide-react';
import { Property, BratislavaDistrict, LandlordProfile } from '../types';
import { Language, translations } from '../translations';

interface ListPropertyFormProps {
  currentLandlord: LandlordProfile;
  onCancel: () => void;
  onSubmitProperty: (
    newProperty: Omit<Property, 'id' | 'applicationsCount' | 'createdAt'>,
    createdLandlord: LandlordProfile
  ) => void;
  language: Language;
}

const BRATISLAVA_DISTRICTS: BratislavaDistrict[] = [
  'Staré Mesto',
  'Ružinov',
  'Nové Mesto',
  'Petržalka',
  'Karlova Ves',
  'Dúbravka',
  'Rača',
  'Devínska Nová Ves',
  'Vrakuňa',
  'Podunajské Biskupice'
];

export const ListPropertyForm: React.FC<ListPropertyFormProps> = ({
  currentLandlord,
  onCancel,
  onSubmitProperty,
  language,
}) => {
  const t = translations[language];
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  // Landlord Profile & Account Credentials
  const [fullName, setFullName] = useState(currentLandlord.fullName || '');
  const [email, setEmail] = useState(currentLandlord.email || '');
  const [phone, setPhone] = useState(currentLandlord.phone || '+421 9');
  const [password, setPassword] = useState('Password123!');
  const [isCompany, setIsCompany] = useState(currentLandlord.isCompany || false);
  const [companyName, setCompanyName] = useState(currentLandlord.companyName || '');
  const [ico, setIco] = useState(currentLandlord.ico || '');
  const [bio, setBio] = useState(currentLandlord.bio || 'Direct owner in Bratislava.');

  // Verification step state
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [emailVerificationCode, setEmailVerificationCode] = useState('');

  // Property Details
  const [title, setTitle] = useState('');
  const [district, setDistrict] = useState<BratislavaDistrict>('Ružinov');
  const [street, setStreet] = useState('');
  const [rooms, setRooms] = useState('2-izbový');
  const [sizeM2, setSizeM2] = useState<number>(54);
  const [floor, setFloor] = useState<number>(3);
  const [totalFloors, setTotalFloors] = useState<number>(8);
  const [hasElevator, setHasElevator] = useState<boolean>(true);
  const [hasBalcony, setHasBalcony] = useState<boolean>(true);
  const [isFurnished, setIsFurnished] = useState<'fully' | 'partially' | 'unfurnished'>('fully');

  // Pricing
  const [rentEur, setRentEur] = useState<number>(650);
  const [energyEur, setEnergyEur] = useState<number>(180);
  const [depositEur, setDepositEur] = useState<number>(830);

  // Kataster Ownership Verification
  const [lvNumber, setLvNumber] = useState(currentLandlord.listVlastnictvaNumber || 'LV 4821');
  const [katastralneUzemie, setKatastralneUzemie] = useState(currentLandlord.katastralneUzemie || 'Ružinov');

  // Viewing availability booking system
  const [viewingSlots, setViewingSlots] = useState<{ id: string; date: string; time: string; isBooked: boolean }[]>([
    { id: 'vs-1', date: 'Wednesday, Oct 7', time: '17:00 - 17:25', isBooked: false },
    { id: 'vs-2', date: 'Wednesday, Oct 7', time: '17:30 - 17:55', isBooked: false },
    { id: 'vs-3', date: 'Saturday, Oct 10', time: '10:30 - 10:55', isBooked: false },
  ]);
  const [newSlotDate, setNewSlotDate] = useState('');
  const [newSlotTime, setNewSlotTime] = useState('');

  // Policies
  const [petsPolicy, setPetsPolicy] = useState<'allowed' | 'case_by_case' | 'not_allowed'>('allowed');
  const [allowedCat, setAllowedCat] = useState(true);
  const [allowedSmallDog, setAllowedSmallDog] = useState(true);
  const [allowedLargeDog, setAllowedLargeDog] = useState(false);
  const [petDepositExtraEur, setPetDepositExtraEur] = useState<number>(150);

  const [childrenWelcome, setChildrenWelcome] = useState<boolean>(true);
  const [idealForFamilies, setIdealForFamilies] = useState<boolean>(false);
  const [smokingPolicy, setSmokingPolicy] = useState<'strictly_no' | 'balcony_only' | 'allowed'>('balcony_only');
  const [maxOccupants, setMaxOccupants] = useState<number>(2);
  const [allowsPermanentResidence, setAllowsPermanentResidence] = useState<boolean>(true);
  const [preferredLeaseType, setPreferredLeaseType] = useState<'short_term_act' | 'civil_code'>('short_term_act');

  // Media
  const [description, setDescription] = useState(
    'Slnečný 2-izbový byt v tichom vnútrobloku. Kompletne vybavená kuchyňa (umývačka, práčka), optický internet. Hľadáme zodpovedných nájomcov.'
  );
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !street) return;

    const allowedPetTypes: ('cats' | 'dogs_small' | 'dogs_large' | 'caged_small')[] = [];
    if (allowedCat) allowedPetTypes.push('cats');
    if (allowedSmallDog) allowedPetTypes.push('dogs_small');
    if (allowedLargeDog) allowedPetTypes.push('dogs_large');

    const createdLandlord: LandlordProfile = {
      id: currentLandlord.id || `landlord-${Date.now()}`,
      fullName,
      phone,
      phoneVerified: true,
      email,
      emailVerified: true,
      isCompany,
      companyName: isCompany ? companyName : undefined,
      ico: isCompany ? ico : undefined,
      verificationTier: 'tier2_kataster_verified',
      katasterVerified: true,
      listVlastnictvaNumber: lvNumber,
      katastralneUzemie,
      languagesSpoken: ['Slovak', 'English'],
      bio,
      preferredContact: 'livix_chat'
    };

    onSubmitProperty(
      {
        title,
        district,
        street,
        rentEur,
        energyEur,
        depositEur,
        sizeM2,
        rooms,
        floor,
        totalFloors,
        hasElevator,
        hasBalcony,
        isFurnished,
        policy: {
          petsPolicy,
          allowedPetTypes,
          petDepositExtraEur: petsPolicy !== 'not_allowed' ? petDepositExtraEur : 0,
          childrenWelcome,
          idealForFamilies,
          smokingPolicy,
          maxOccupants,
          allowsPermanentResidence,
          preferredLeaseType
        },
        availableFrom: '2026-11-01',
        description,
        images: [imageUrl],
        landlord: createdLandlord,
        viewingSlots
      },
      createdLandlord
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between bg-white border border-[#e8e6df] rounded-2xl p-6 shadow-sm">
        <div>
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 text-xs text-[#71717a] hover:text-[#1c2429] mb-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> {t.cancel}
          </button>
          <h2 className="text-xl font-bold text-[#1c2429]">
            {t.postApartment}
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            Bratislava direct landlord marketplace
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold">
          {[1, 2, 3, 4].map((s) => (
            <React.Fragment key={s}>
              <button
                type="button"
                onClick={() => {
                  if (s <= activeStep) setActiveStep(s as any);
                }}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition text-xs ${
                  activeStep === s
                    ? 'bg-[#0F4C5C] text-white font-bold'
                    : s < activeStep
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-[#f0ede6] text-[#71717a]'
                }`}
              >
                {s < activeStep ? <Check className="w-3.5 h-3.5" /> : s}
              </button>
              {s < 4 && <span className="w-3 h-0.5 bg-[#e8e6df]" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[#e8e6df] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Step 1 */}
        {activeStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-[#f0ede6] pb-3">
              <span className="text-[11px] font-bold text-[#0F4C5C] uppercase tracking-wider block mb-0.5">
                Krok 1 / 4
              </span>
              <h3 className="text-base font-bold text-[#1c2429]">
                Meno a prihlasovacie údaje prenajímateľa
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#1c2429] block mb-1">
                  Meno a Priezvisko
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ing. Peter Horváth"
                  className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1c2429] block mb-1">
                  Telefón (+421...)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#1c2429] block mb-1">
                  Prihlasovací Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1c2429] block mb-1">
                  Heslo
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429] outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#f0ede6]">
              <button
                type="button"
                disabled={!fullName || !email || !phone}
                onClick={() => setActiveStep(2)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F4C5C] hover:bg-[#135d70] disabled:opacity-50 transition shadow-sm"
              >
                Pokračovať na overenie →
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {activeStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-[#f0ede6] pb-3">
              <span className="text-[11px] font-bold text-[#0F4C5C] uppercase tracking-wider block mb-0.5">
                Krok 2 / 4
              </span>
              <h3 className="text-base font-bold text-[#1c2429]">
                Overenie kontaktu (SMS a Email)
              </h3>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Kontaktné údaje boli overené. Záujemcovia vás zastihnú bezpečne v aplikácii.</span>
            </div>

            <div className="flex justify-between pt-4 border-t border-[#f0ede6]">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#71717a]"
              >
                ← Späť
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F4C5C] hover:bg-[#135d70] transition shadow-sm"
              >
                Pokračovať na parametre bytu →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {activeStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-[#f0ede6] pb-3">
              <span className="text-[11px] font-bold text-[#0F4C5C] uppercase tracking-wider block mb-0.5">
                Krok 3 / 4
              </span>
              <h3 className="text-base font-bold text-[#1c2429]">
                Parametre bytu, Kataster a Termíny obhliadok
              </h3>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1c2429] block mb-1">
                Názov inzerátu
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="2-izbový byt pri Eurovea s balkónom"
                className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#1c2429] block mb-1">
                  Mestská časť
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value as BratislavaDistrict)}
                  className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429]"
                >
                  {BRATISLAVA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1c2429] block mb-1">
                  Ulica a číslo
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Chalupkova 12"
                  className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429]"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-[#1c2429] block mb-1">
                  Čistý nájom (€)
                </label>
                <input
                  type="number"
                  value={rentEur}
                  onChange={(e) => setRentEur(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1c2429] block mb-1">
                  Záloha na energie (€)
                </label>
                <input
                  type="number"
                  value={energyEur}
                  onChange={(e) => setEnergyEur(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1c2429] block mb-1">
                  Kaucia (€)
                </label>
                <input
                  type="number"
                  value={depositEur}
                  onChange={(e) => setDepositEur(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs font-mono"
                />
              </div>
            </div>

            {/* Viewing Slots Booking Setup */}
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#e8e6df] space-y-3">
              <h4 className="text-xs font-bold text-[#0F4C5C]">
                📅 Termíny obhliadok (Rezervačný systém)
              </h4>
              <div className="space-y-2">
                {viewingSlots.map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between bg-white border border-[#cbd5e1] p-2.5 rounded-xl text-xs">
                    <span><strong>{slot.date}</strong> · <span className="font-mono text-[#0F4C5C]">{slot.time}</span></span>
                    <button
                      type="button"
                      onClick={() => setViewingSlots(viewingSlots.filter(s => s.id !== slot.id))}
                      className="text-rose-600 font-bold"
                    >
                      Odstrániť
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Dátum (napr. Štvrtok 8.10.)"
                  value={newSlotDate}
                  onChange={(e) => setNewSlotDate(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-white border border-[#cbd5e1] rounded-lg text-xs"
                />
                <input
                  type="text"
                  placeholder="Čas (napr. 17:30 - 17:50)"
                  value={newSlotTime}
                  onChange={(e) => setNewSlotTime(e.target.value)}
                  className="w-40 px-3 py-1.5 bg-white border border-[#cbd5e1] rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newSlotDate && newSlotTime) {
                      setViewingSlots([...viewingSlots, { id: `vs-${Date.now()}`, date: newSlotDate, time: newSlotTime, isBooked: false }]);
                      setNewSlotDate('');
                      setNewSlotTime('');
                    }
                  }}
                  className="px-3 py-1.5 bg-[#0F4C5C] text-white rounded-lg text-xs font-bold"
                >
                  + Pridať
                </button>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-[#f0ede6]">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#71717a]"
              >
                ← Späť
              </button>
              <button
                type="button"
                disabled={!title || !street}
                onClick={() => setActiveStep(4)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F4C5C] hover:bg-[#135d70] disabled:opacity-50 transition shadow-sm"
              >
                Pravidlá a zverejnenie →
              </button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {activeStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-[#f0ede6] pb-3">
              <span className="text-[11px] font-bold text-[#0F4C5C] uppercase tracking-wider block mb-0.5">
                Krok 4 / 4
              </span>
              <h3 className="text-base font-bold text-[#1c2429]">
                Pravidlá bývania a zverejnenie ponuky
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#e8e6df] space-y-2">
              <span className="text-xs font-bold text-[#1c2429] block">Zvieratá v byte</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPetsPolicy('allowed')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${petsPolicy === 'allowed' ? 'bg-[#0F4C5C] text-white' : 'bg-[#e8e6df]'}`}
                >
                  Povolené
                </button>
                <button
                  type="button"
                  onClick={() => setPetsPolicy('not_allowed')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${petsPolicy === 'not_allowed' ? 'bg-[#0F4C5C] text-white' : 'bg-[#e8e6df]'}`}
                >
                  Nie
                </button>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-[#f0ede6]">
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#71717a]"
              >
                ← Späť
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F4C5C] hover:bg-[#135d70] transition shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F4A261]" />
                <span>Zverejniť byt a vytvoriť profil</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Search,
  Filter,
  PawPrint,
  Baby,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  MapPin,
  CheckCircle2,
  Train
} from 'lucide-react';
import { Property, BratislavaDistrict } from '../types';
import { Language, translations } from '../translations';

interface PropertyBrowserProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onOpenPassport: () => void;
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

export const PropertyBrowser: React.FC<PropertyBrowserProps> = ({
  properties,
  onSelectProperty,
  onOpenPassport,
  language,
}) => {
  const t = translations[language];

  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedRooms, setSelectedRooms] = useState<string>('all');
  const [filterPets, setFilterPets] = useState<boolean>(false);
  const [filterChildren, setFilterChildren] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProperties = properties.filter((prop) => {
    if (selectedDistrict !== 'all' && prop.district !== selectedDistrict) return false;
    if (selectedRooms !== 'all' && prop.rooms !== selectedRooms) return false;
    if (filterPets && prop.policy.petsPolicy === 'not_allowed') return false;
    if (filterChildren && !prop.policy.childrenWelcome) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${prop.title} ${prop.street} ${prop.district}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Headline */}
      <div className="bg-gradient-to-br from-[#0F4C5C]/5 via-[#FAFAF8] to-[#F4A261]/10 rounded-3xl p-6 sm:p-10 border border-[#e8e6df] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e8e6df] text-xs font-semibold text-[#0F4C5C] shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0F4C5C]" />
          <span>Bratislava I – V · Bez RK · Kataster Verified</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1c2429] tracking-tight max-w-3xl mx-auto">
          {t.heroTitle}
        </h1>
        <p className="text-xs sm:text-sm text-[#71717a] max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenPassport}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#0F4C5C] transition flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F4A261]" />
            <span>{t.renterPassport} & Credibility Score</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-[#e8e6df] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8a7f70] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429] outline-none focus:border-[#0F4C5C]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          {/* District selector */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429] outline-none"
          >
            <option value="all">{t.filterAllDistricts}</option>
            {BRATISLAVA_DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Rooms selector */}
          <select
            value={selectedRooms}
            onChange={(e) => setSelectedRooms(e.target.value)}
            className="px-3 py-2 bg-[#FAFAF8] border border-[#cbd5e1] rounded-xl text-xs text-[#1c2429] outline-none"
          >
            <option value="all">{t.filterRooms}: Všetky</option>
            <option value="Garsónka">Garsónka</option>
            <option value="1-izbový">1-izbový</option>
            <option value="2-izbový">2-izbový</option>
            <option value="3-izbový">3-izbový</option>
            <option value="4-izbový+">4-izbový+</option>
          </select>

          {/* Pets Toggle */}
          <button
            onClick={() => setFilterPets(!filterPets)}
            className={`px-3 py-2 rounded-xl font-semibold transition flex items-center gap-1.5 ${
              filterPets
                ? 'bg-[#0F4C5C] text-white'
                : 'bg-[#FAFAF8] border border-[#cbd5e1] text-[#52525b] hover:border-[#0F4C5C]'
            }`}
          >
            <PawPrint className="w-3.5 h-3.5" />
            <span>{t.filterPetsAllowed}</span>
          </button>

          {/* Children Toggle */}
          <button
            onClick={() => setFilterChildren(!filterChildren)}
            className={`px-3 py-2 rounded-xl font-semibold transition flex items-center gap-1.5 ${
              filterChildren
                ? 'bg-[#0F4C5C] text-white'
                : 'bg-[#FAFAF8] border border-[#cbd5e1] text-[#52525b] hover:border-[#0F4C5C]'
            }`}
          >
            <Baby className="w-3.5 h-3.5" />
            <span>{t.filterChildrenWelcome}</span>
          </button>

          {(selectedDistrict !== 'all' || selectedRooms !== 'all' || filterPets || filterChildren || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDistrict('all');
                setSelectedRooms('all');
                setFilterPets(false);
                setFilterChildren(false);
                setSearchQuery('');
              }}
              className="text-[#ef4444] text-xs font-semibold hover:underline ml-auto"
            >
              {t.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#71717a]">
          <span>{t.foundProperties}: <strong>{filteredProperties.length}</strong></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => {
            const totalMonthly = property.rentEur + property.energyEur;
            const openSlotsCount = (property.viewingSlots || []).filter(s => !s.isBooked).length;

            return (
              <div
                key={property.id}
                onClick={() => onSelectProperty(property)}
                className="bg-white rounded-3xl border border-[#e8e6df] overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white font-bold text-[11px]">
                      {property.district}
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-[#0F4C5C] text-white font-bold text-[10px]">
                      {property.rooms}
                    </span>
                  </div>

                  {openSlotsCount > 0 && (
                    <div className="absolute top-3 right-3 bg-emerald-700/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{openSlotsCount} {language === 'sk' ? 'obhliadok' : language === 'uk' ? 'переглядів' : 'slots open'}</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                    <span className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg font-mono">
                      {property.sizeM2} m² · Posch. {property.floor}/{property.totalFloors}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#1c2429] line-clamp-2 group-hover:text-[#0F4C5C] transition">
                      {property.title}
                    </h3>
                    <p className="text-[11px] text-[#71717a] mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#0F4C5C] shrink-0" />
                      <span>{property.street}</span>
                    </p>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-3 border-t border-[#f0ede6] flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-[#71717a] block">{t.pureRent} €{property.rentEur} + {t.utilities} €{property.energyEur}</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-xl font-extrabold text-[#0F4C5C] font-mono">
                          €{totalMonthly}
                        </span>
                        <span className="text-[11px] text-[#71717a]">/ {t.month}</span>
                      </div>
                    </div>

                    <button className="px-3 py-1.5 bg-[#0F4C5C]/10 group-hover:bg-[#0F4C5C] group-hover:text-white text-[#0F4C5C] rounded-xl text-xs font-bold transition">
                      {t.viewDetails} →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

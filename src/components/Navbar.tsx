import React from 'react';
import { Home, UserCheck, PlusCircle, Building2, LogIn, Globe } from 'lucide-react';
import { LandlordProfile, TenantPassport } from '../types';
import { Language, translations } from '../translations';

interface NavbarProps {
  activeView: 'browse' | 'landlord-dashboard' | 'tenant-passport' | 'list-property';
  onNavigate: (view: 'browse' | 'landlord-dashboard' | 'tenant-passport' | 'list-property') => void;
  landlordAppCount: number;
  currentLandlord: LandlordProfile | null;
  onOpenLoginModal: () => void;
  currentTenant: TenantPassport;
  onOpenTenantAccountModal: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  landlordAppCount,
  currentLandlord,
  onOpenLoginModal,
  currentTenant,
  onOpenTenantAccountModal,
  language,
  onLanguageChange,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#e8e6df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => onNavigate('browse')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0F4C5C] text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-[#135d70] transition">
            <Building2 className="w-5 h-5 text-[#F4A261]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#0F4C5C]">
                Livix
              </span>
              <span className="text-xs font-semibold text-[#8a7f70] tracking-wide">
                Bratislava
              </span>
            </div>
            <p className="text-[11px] text-[#71717a] hidden sm:block">
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav className="flex items-center bg-[#f0ede6] p-1 rounded-xl">
          <button
            onClick={() => onNavigate('browse')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeView === 'browse'
                ? 'bg-white text-[#0F4C5C] shadow-sm'
                : 'text-[#5c5b56] hover:text-[#1c2429]'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-[#0F4C5C]" />
            <span className="hidden md:inline">{t.findAHome}</span>
          </button>

          <button
            onClick={() => onNavigate('tenant-passport')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeView === 'tenant-passport'
                ? 'bg-white text-[#0F4C5C] shadow-sm'
                : 'text-[#5c5b56] hover:text-[#1c2429]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-[#0F4C5C]" />
            <span className="hidden md:inline">{t.renterPassport}</span>
          </button>

          <button
            onClick={() => onNavigate('landlord-dashboard')}
            className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeView === 'landlord-dashboard'
                ? 'bg-white text-[#0F4C5C] shadow-sm'
                : 'text-[#5c5b56] hover:text-[#1c2429]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#0F4C5C]" />
            <span className="hidden md:inline">{t.landlordInbox}</span>
            {landlordAppCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#E76F51]" />
            )}
          </button>
        </nav>

        {/* Action Controls & Language Selector */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Switcher Dropdown / Buttons */}
          <div className="flex items-center bg-[#f0ede6] p-0.5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => onLanguageChange('sk')}
              className={`px-2 py-1 rounded-lg transition ${
                language === 'sk' ? 'bg-[#0F4C5C] text-white shadow-xs font-bold' : 'text-[#71717a] hover:text-[#1c2429]'
              }`}
              title="Slovenčina"
            >
              SK
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-lg transition ${
                language === 'en' ? 'bg-[#0F4C5C] text-white shadow-xs font-bold' : 'text-[#71717a] hover:text-[#1c2429]'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('uk')}
              className={`px-2 py-1 rounded-lg transition ${
                language === 'uk' ? 'bg-[#0F4C5C] text-white shadow-xs font-bold' : 'text-[#71717a] hover:text-[#1c2429]'
              }`}
              title="Українська"
            >
              UA
            </button>
          </div>

          {/* Tenant Account Switcher */}
          <button
            onClick={onOpenTenantAccountModal}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#e8e6df] bg-white hover:bg-slate-50 transition text-xs font-medium text-[#1c2429]"
            title="Manage Renter Account & ID"
          >
            <img
              src={currentTenant.avatarUrl}
              alt=""
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="max-w-[85px] truncate">{currentTenant.fullName.split(' ')[0]}</span>
          </button>

          {/* Landlord Auth Button */}
          {currentLandlord ? (
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#e8e6df] bg-white hover:bg-slate-50 transition text-xs font-medium text-[#1c2429]"
              title="Landlord Account"
            >
              <div className="w-5 h-5 rounded-full bg-[#0F4C5C] text-white flex items-center justify-center text-[10px] font-bold">
                {currentLandlord.fullName[0]}
              </div>
              <span className="hidden xl:inline max-w-[90px] truncate">{currentLandlord.fullName.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#52525b] hover:text-[#1c2429] hover:bg-slate-100 transition"
            >
              <LogIn className="w-3.5 h-3.5 text-[#0F4C5C]" />
              <span className="hidden sm:inline">{t.landlordSignIn}</span>
            </button>
          )}

          {/* Post Apartment CTA */}
          <button
            onClick={() => onNavigate('list-property')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold text-white bg-[#0F4C5C] hover:bg-[#135d70] transition shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-[#F4A261]" />
            <span className="hidden sm:inline">{t.postApartment}</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
      </div>
    </header>
  );
};

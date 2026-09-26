import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PropertyBrowser } from './components/PropertyBrowser';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { TenantPassportView } from './components/TenantPassportView';
import { LandlordDashboard } from './components/LandlordDashboard';
import { ListPropertyForm } from './components/ListPropertyForm';
import { LandlordLoginModal } from './components/LandlordLoginModal';
import { TenantAccountModal } from './components/TenantAccountModal';
import { DirectChatModal } from './components/DirectChatModal';
import {
  Property,
  TenantPassport,
  RentalApplication,
  LandlordProfile,
  ViewingSlot,
  ChatMessage
} from './types';
import { Language, translations } from './translations';
import {
  INITIAL_PROPERTIES,
  CURRENT_USER_TENANT,
  INITIAL_APPLICATIONS,
  CURRENT_LANDLORD
} from './data/mockData';
import { Building2, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';

export function App() {
  const [language, setLanguage] = useState<Language>('sk');
  const t = translations[language];

  const [activeView, setActiveView] = useState<
    'browse' | 'landlord-dashboard' | 'tenant-passport' | 'list-property'
  >('browse');

  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [tenantPassport, setTenantPassport] = useState<TenantPassport>(CURRENT_USER_TENANT);
  const [applications, setApplications] = useState<RentalApplication[]>(INITIAL_APPLICATIONS);
  const [currentLandlord, setCurrentLandlord] = useState<LandlordProfile | null>(CURRENT_LANDLORD);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
  const [activeChatApp, setActiveChatApp] = useState<RentalApplication | null>(null);
  const [chatUserRole, setChatUserRole] = useState<'landlord' | 'tenant'>('landlord');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Submit Tenant Application with Chosen Viewing Slot
  const handleSubmitApplication = (
    propertyId: string,
    coverNote: string,
    selectedSlot?: ViewingSlot
  ) => {
    const existing = applications.find(
      (a) => a.propertyId === propertyId && a.tenant.id === tenantPassport.id
    );
    if (existing) {
      showToast(language === 'sk' ? 'Na tento byt ste už odoslali žiadosť.' : 'You have already applied.');
      return;
    }

    const newApp: RentalApplication = {
      id: `app-${Date.now()}`,
      propertyId,
      tenant: tenantPassport,
      status: 'pending',
      appliedAt: language === 'sk' ? 'Práve teraz' : language === 'uk' ? 'Щойно' : 'Just now',
      coverNote,
      requestedSlotId: selectedSlot?.id,
      requestedSlotLabel: selectedSlot ? `${selectedSlot.date} (${selectedSlot.time})` : undefined,
      matchScore: 97,
      messages: []
    };

    setApplications((prev) => [newApp, ...prev]);

    // Update property count & mark slot as booked
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id !== propertyId) return p;
        return {
          ...p,
          applicationsCount: p.applicationsCount + 1,
          viewingSlots: p.viewingSlots.map((s) =>
            s.id === selectedSlot?.id ? { ...s, isBooked: true } : s
          )
        };
      })
    );

    showToast(t.alreadyAppliedNotice);
  };

  // Landlord: Update Application Status
  const handleUpdateAppStatus = (
    appId: string,
    status: RentalApplication['status'],
    viewingSlot?: string
  ) => {
    setApplications((prev) =>
      prev.map((a) => {
        if (a.id !== appId) return a;
        
        let initialMessages = a.messages;
        if (status === 'viewing_scheduled' && a.messages.length === 0) {
          const slotText = viewingSlot || a.requestedSlotLabel || 'obhliadka';
          initialMessages = [
            {
              id: `msg-${Date.now()}`,
              senderRole: 'landlord',
              senderName: currentLandlord?.fullName || 'Majiteľ bytu',
              content: language === 'sk'
                ? `Dobrý deň ${a.tenant.fullName}! Schválil som Váš termín obhliadky (${slotText}). Vchod je z vnútrobloku, zvonček č. 7.`
                : language === 'uk'
                ? `Доброго дня, ${a.tenant.fullName}! Я підтвердив ваш перегляд (${slotText}). Вхід з двору, домофон №7.`
                : `Hello ${a.tenant.fullName}! I have approved your viewing for ${slotText}. Entrance is from the courtyard, buzzer #7.`,
              timestamp: 'Just now',
              read: true
            }
          ];
        }

        return { ...a, status, messages: initialMessages };
      })
    );

    if (status === 'viewing_scheduled') {
      showToast(language === 'sk' ? 'Obhliadka schválená! Priamy chat je odomknutý.' : 'Viewing approved! Direct chat is open.');
    } else if (status === 'approved') {
      showToast(language === 'sk' ? 'Nájom schválený!' : 'Lease approved!');
    } else if (status === 'declined') {
      showToast(language === 'sk' ? 'Obhliadka zamietnutá.' : 'Viewing declined.');
    }
  };

  // Direct Messaging: Send message
  const handleSendMessage = (applicationId: string, text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderRole: chatUserRole,
      senderName: chatUserRole === 'landlord'
        ? (currentLandlord?.fullName || 'Majiteľ bytu')
        : tenantPassport.fullName,
      content: text,
      timestamp: 'Práve teraz',
      read: false
    };

    setApplications((prev) =>
      prev.map((a) => {
        if (a.id !== applicationId) return a;
        const updatedMessages = [...a.messages, newMessage];
        if (activeChatApp && activeChatApp.id === applicationId) {
          setActiveChatApp({ ...a, messages: updatedMessages });
        }
        return { ...a, messages: updatedMessages };
      })
    );
  };

  // Landlord: Publish New Property
  const handlePublishProperty = (
    newPropData: Omit<Property, 'id' | 'applicationsCount' | 'createdAt'>,
    createdLandlord: LandlordProfile
  ) => {
    const created: Property = {
      ...newPropData,
      id: `prop-${Date.now()}`,
      applicationsCount: 0,
      createdAt: 'Just now',
      landlord: createdLandlord
    };

    setCurrentLandlord(createdLandlord);
    setProperties((prev) => [created, ...prev]);
    setActiveView('landlord-dashboard');
    showToast(language === 'sk' ? `Byt zverejnený pre majiteľa ${createdLandlord.fullName}!` : `Property live for ${createdLandlord.fullName}!`);
  };

  // Landlord Login Handler
  const handleLandlordLogin = (identifier: string) => {
    if (currentLandlord && (currentLandlord.email === identifier || currentLandlord.phone === identifier)) {
      showToast(language === 'sk' ? `Vitajte späť, ${currentLandlord.fullName}!` : `Welcome back, ${currentLandlord.fullName}!`);
    } else {
      const loggedInLandlord: LandlordProfile = {
        id: `landlord-${Date.now()}`,
        fullName: identifier.includes('@') ? identifier.split('@')[0].toUpperCase() : 'Peter Horváth',
        phone: identifier.startsWith('+') ? identifier : '+421 905 123 456',
        phoneVerified: true,
        email: identifier.includes('@') ? identifier : 'owner@livix.sk',
        emailVerified: true,
        isCompany: false,
        verificationTier: 'tier2_kataster_verified',
        katasterVerified: true,
        listVlastnictvaNumber: 'LV 4821',
        katastralneUzemie: 'Ružinov',
        languagesSpoken: ['Slovak', 'English'],
        bio: 'Overený majiteľ v Bratislave.',
        preferredContact: 'livix_chat'
      };
      setCurrentLandlord(loggedInLandlord);
      showToast(`Prihlásený ako ${loggedInLandlord.fullName}!`);
    }
    setActiveView('landlord-dashboard');
  };

  // Tenant Account Login/Update Handler
  const handleTenantLoginOrUpdate = (updated: TenantPassport) => {
    setTenantPassport(updated);
    showToast(`Aktívny profil nájomcu: ${updated.fullName}`);
    setActiveView('tenant-passport');
  };

  const landlordAppCount = applications.filter((a) => a.status === 'pending').length;

  const tenantApprovedApp = applications.find(
    (a) => a.tenant.id === tenantPassport.id && (a.status === 'viewing_scheduled' || a.status === 'approved')
  );

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1c2429] flex flex-col font-sans selection:bg-[#F4A261]/25 selection:text-[#0F4C5C]">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-[#0F4C5C] text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
            <CheckCircle2 className="w-4 h-4 text-[#F4A261]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Floating Tenant Chat Access */}
      {tenantApprovedApp && activeView !== 'landlord-dashboard' && (
        <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom-4">
          <button
            onClick={() => {
              setChatUserRole('tenant');
              setActiveChatApp(tenantApprovedApp);
            }}
            className="px-4 py-3 bg-[#0F4C5C] hover:bg-[#135d70] text-white rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 border border-white/20 transition group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <MessageSquare className="w-4 h-4 text-[#F4A261]" />
            <span>{t.directChat} ({tenantApprovedApp.messages.length})</span>
          </button>
        </div>
      )}

      {/* Navigation Header with Language Selector */}
      <Navbar
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        landlordAppCount={landlordAppCount}
        currentLandlord={currentLandlord}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        currentTenant={tenantPassport}
        onOpenTenantAccountModal={() => setIsTenantModalOpen(true)}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'browse' && (
          <PropertyBrowser
            properties={properties}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onOpenPassport={() => setActiveView('tenant-passport')}
            language={language}
          />
        )}

        {activeView === 'tenant-passport' && (
          <TenantPassportView
            passport={tenantPassport}
            onUpdatePassport={(updated) => {
              setTenantPassport(updated);
              showToast(t.saveChanges);
            }}
            onOpenAccountModal={() => setIsTenantModalOpen(true)}
            language={language}
          />
        )}

        {activeView === 'landlord-dashboard' && (
          <LandlordDashboard
            properties={properties}
            applications={applications}
            onUpdateAppStatus={handleUpdateAppStatus}
            onNavigateToListProperty={() => setActiveView('list-property')}
            onOpenChatWithApplicant={(app) => {
              setChatUserRole('landlord');
              setActiveChatApp(app);
            }}
            language={language}
          />
        )}

        {activeView === 'list-property' && (
          <ListPropertyForm
            currentLandlord={currentLandlord || CURRENT_LANDLORD}
            onCancel={() => setActiveView('browse')}
            onSubmitProperty={handlePublishProperty}
            language={language}
          />
        )}
      </main>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          tenantPassport={tenantPassport}
          onClose={() => setSelectedProperty(null)}
          onSubmitApplication={handleSubmitApplication}
          hasApplied={applications.some(
            (a) => a.propertyId === selectedProperty.id && a.tenant.id === tenantPassport.id
          )}
          onOpenChat={() => {
            const app = applications.find(
              (a) => a.propertyId === selectedProperty.id && a.tenant.id === tenantPassport.id
            );
            if (app) {
              setChatUserRole('tenant');
              setActiveChatApp(app);
            }
          }}
          language={language}
        />
      )}

      {/* Direct Landlord-Tenant Messaging Modal */}
      {activeChatApp && (
        <DirectChatModal
          application={activeChatApp}
          currentUserRole={chatUserRole}
          currentUserName={chatUserRole === 'landlord' ? (currentLandlord?.fullName || 'Owner') : tenantPassport.fullName}
          onSendMessage={handleSendMessage}
          onClose={() => setActiveChatApp(null)}
          language={language}
        />
      )}

      {/* Landlord Login Modal */}
      {isLoginModalOpen && (
        <LandlordLoginModal
          currentLandlord={currentLandlord}
          onLogin={handleLandlordLogin}
          onClose={() => setIsLoginModalOpen(false)}
          onSwitchToPost={() => setActiveView('list-property')}
          language={language}
        />
      )}

      {/* Tenant Account Modal */}
      {isTenantModalOpen && (
        <TenantAccountModal
          currentTenant={tenantPassport}
          onLoginOrUpdate={handleTenantLoginOrUpdate}
          onClose={() => setIsTenantModalOpen(false)}
          language={language}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-[#e8e6df] bg-white py-8 text-xs text-[#71717a] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#0F4C5C]" />
            <span className="font-bold text-[#1c2429]">Livix Bratislava</span>
            <span>·</span>
            <span>{t.footerDescription}</span>
          </div>

          <div className="flex items-center gap-6">
            <span>{t.footerBratislavaCoverage}</span>
            <span>{t.footerNoCommission}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

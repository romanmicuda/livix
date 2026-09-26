import { Property, TenantPassport, RentalApplication, LandlordProfile } from '../types';

export const CURRENT_LANDLORD: LandlordProfile = {
  id: 'landlord-me',
  fullName: 'Ing. Peter Horváth',
  phone: '+421 905 123 456',
  phoneVerified: true,
  email: 'peter.horvath@post.sk',
  emailVerified: true,
  isCompany: false,
  verificationTier: 'tier2_kataster_verified',
  katasterVerified: true,
  listVlastnictvaNumber: 'LV 4821',
  katastralneUzemie: 'Ružinov (Bratislava II)',
  taxRegisteredDic: 'DIČ 1084291823 (Daňový úrad Bratislava)',
  languagesSpoken: ['Slovak', 'English'],
  bio: 'Private owner of 2 flats in Ružinov. I treat tenants with complete privacy, do proactive maintenance, and support registered residency for parking and daycare.',
  preferredContact: 'livix_chat'
};

export const LANDLORD_2: LandlordProfile = {
  id: 'landlord-2',
  fullName: 'Zuzana Malíková',
  phone: '+421 911 678 901',
  phoneVerified: true,
  email: 'zuzana.malikova@gmail.com',
  emailVerified: true,
  isCompany: false,
  verificationTier: 'tier2_kataster_verified',
  katasterVerified: true,
  listVlastnictvaNumber: 'LV 1092',
  katastralneUzemie: 'Staré Mesto (Bratislava I)',
  languagesSpoken: ['Slovak', 'English', 'German'],
  bio: 'Renovated family flat in historical Old Town. Looking for considerate long-term tenants.',
  preferredContact: 'livix_chat'
};

export const LANDLORD_3: LandlordProfile = {
  id: 'landlord-3',
  fullName: 'Marek Kováč',
  phone: '+421 948 234 567',
  phoneVerified: true,
  email: 'm.kovac@tehelne.sk',
  emailVerified: false,
  isCompany: false,
  verificationTier: 'tier1_registered',
  katasterVerified: false,
  languagesSpoken: ['Slovak'],
  bio: 'Owner of studio near Tehelné pole. Quick communication.',
  preferredContact: 'phone'
};

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Bright 2-Room Apartment near Sky Park & Eurovea',
    district: 'Ružinov',
    street: 'Chalupkova 12, Nivy',
    rentEur: 680,
    energyEur: 180,
    depositEur: 860,
    sizeM2: 56,
    rooms: '2-izbový',
    floor: 7,
    totalFloors: 14,
    hasElevator: true,
    hasBalcony: true,
    isFurnished: 'fully',
    policy: {
      petsPolicy: 'allowed',
      allowedPetTypes: ['cats', 'dogs_small'],
      petDepositExtraEur: 200,
      childrenWelcome: true,
      idealForFamilies: false,
      smokingPolicy: 'balcony_only',
      maxOccupants: 2,
      allowsPermanentResidence: true,
      preferredLeaseType: 'short_term_act'
    },
    availableFrom: '2026-10-01',
    transitHighlight: 'Tram 1, 3, 4 (3 min walk) · Mlynské Nivy Bus Station',
    description: 'Modern, newly furnished flat directly next to Eurovea City and Sky Park park. Air conditioning, high-speed optic fiber internet included in building. Ideal for corporate professionals, respectful couples, and pet owners.',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
    ],
    landlord: CURRENT_LANDLORD,
    applicationsCount: 4,
    createdAt: '2 days ago',
    viewingSlots: [
      { id: 'slot-1-1', date: 'Thursday, Oct 1', time: '17:30 - 17:50', isBooked: true, bookedByApplicantId: 'app-2' },
      { id: 'slot-1-2', date: 'Thursday, Oct 1', time: '18:00 - 18:20', isBooked: false },
      { id: 'slot-1-3', date: 'Saturday, Oct 3', time: '10:30 - 10:50', isBooked: false },
      { id: 'slot-1-4', date: 'Saturday, Oct 3', time: '11:00 - 11:20', isBooked: false },
    ]
  },
  {
    id: 'prop-2',
    title: 'Historic High-Ceiling Flat at Palisády with Balcony',
    district: 'Staré Mesto',
    street: 'Palisády 38',
    rentEur: 850,
    energyEur: 210,
    depositEur: 1060,
    sizeM2: 74,
    rooms: '3-izbový',
    floor: 2,
    totalFloors: 4,
    hasElevator: false,
    hasBalcony: true,
    isFurnished: 'partially',
    policy: {
      petsPolicy: 'case_by_case',
      allowedPetTypes: ['cats'],
      childrenWelcome: true,
      idealForFamilies: true,
      smokingPolicy: 'strictly_no',
      maxOccupants: 4,
      allowsPermanentResidence: true,
      preferredLeaseType: 'short_term_act'
    },
    availableFrom: 'Immediately',
    transitHighlight: 'Trolleybus 44, 47 (1 min) · 8 min walk to Bratislava Castle',
    description: 'Atmospheric Old Town residence with preserved oak herringbone parquet and original double wooden doors. Quiet inner courtyard, close to kindergartens and castle gardens.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
    ],
    landlord: LANDLORD_2,
    applicationsCount: 2,
    createdAt: 'Yesterday',
    viewingSlots: [
      { id: 'slot-2-1', date: 'Wednesday, Oct 7', time: '16:00 - 16:30', isBooked: false },
      { id: 'slot-2-2', date: 'Wednesday, Oct 7', time: '16:45 - 17:15', isBooked: false }
    ]
  },
  {
    id: 'prop-3',
    title: 'Cozy Studio at Tehelné Pole near Kuchajda Lake',
    district: 'Nové Mesto',
    street: 'Bajkalská 9',
    rentEur: 470,
    energyEur: 130,
    depositEur: 600,
    sizeM2: 34,
    rooms: 'Garsónka',
    floor: 5,
    totalFloors: 9,
    hasElevator: true,
    hasBalcony: true,
    isFurnished: 'fully',
    policy: {
      petsPolicy: 'not_allowed',
      childrenWelcome: false,
      idealForFamilies: false,
      smokingPolicy: 'strictly_no',
      maxOccupants: 1,
      allowsPermanentResidence: false,
      preferredLeaseType: 'civil_code'
    },
    availableFrom: '2026-10-15',
    transitHighlight: 'Tram 4 (direct to center 12 min) · Trnavské mýto 5 min',
    description: 'Renovated, compact apartment with modern kitchen, washing machine, and dedicated work desk. Great view towards the Small Carpathians. 4 min walk to Kuchajda lake and Vivo shopping center.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80'
    ],
    landlord: LANDLORD_3,
    applicationsCount: 6,
    createdAt: '3 days ago',
    viewingSlots: [
      { id: 'slot-3-1', date: 'Friday, Oct 2', time: '18:00 - 18:20', isBooked: false },
      { id: 'slot-3-2', date: 'Friday, Oct 2', time: '18:30 - 18:50', isBooked: false }
    ]
  },
  {
    id: 'prop-4',
    title: 'Modern 2-Room Flat in Slnečnice with Garage Space',
    district: 'Petržalka',
    street: 'Žltá 7, Slnečnice - Južné Mesto',
    rentEur: 620,
    energyEur: 160,
    depositEur: 780,
    sizeM2: 52,
    rooms: '2-izbový',
    floor: 3,
    totalFloors: 6,
    hasElevator: true,
    hasBalcony: true,
    isFurnished: 'fully',
    policy: {
      petsPolicy: 'allowed',
      allowedPetTypes: ['dogs_small', 'cats'],
      childrenWelcome: true,
      idealForFamilies: true,
      smokingPolicy: 'balcony_only',
      maxOccupants: 3,
      allowsPermanentResidence: true,
      preferredLeaseType: 'short_term_act'
    },
    availableFrom: '2026-11-01',
    description: 'Contemporary development with lively neighborhood cafes, grocery store, and green park. Underground garage spot included in monthly rent. Kid and pet friendly community.',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    landlord: CURRENT_LANDLORD,
    applicationsCount: 3,
    createdAt: '5 days ago',
    viewingSlots: [
      { id: 'slot-4-1', date: 'Tuesday, Oct 6', time: '17:00 - 17:25', isBooked: false },
      { id: 'slot-4-2', date: 'Tuesday, Oct 6', time: '17:30 - 17:55', isBooked: false }
    ]
  }
];

export const CURRENT_USER_TENANT: TenantPassport = {
  id: 'tenant-current',
  fullName: 'Michal Varga',
  email: 'michal.varga@gmail.com',
  phone: '+421 908 441 230',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  headline: 'Product Designer at Slido & Long-Term Renter',
  age: 28,
  occupation: 'Lead Product Designer',
  employer: 'Slido (Cisco Bratislava)',
  netIncomeRange: '€2,000 - €3,200',
  
  verifications: {
    idDocumentType: 'obciansky_preukaz',
    idNumberMasked: 'EK 391***',
    idVerifiedAt: '2026-08-14',
    isIdVerified: true,
    employmentVerified: true,
    employmentDocType: 'employment_contract',
    bankSolvencyVerified: true,
    depositPreCleared: true,
    noDebtsDeclared: true,
    hasPreviousLandlordVouch: true,
    tenantLiabilityInsurance: true,
    linkedInVerified: true
  },

  hasPets: true,
  petDetails: '1x well-trained British Shorthair cat (neutered, indoor-only, vet passport)',
  hasChildren: false,
  isSmoker: false,
  occupantsCount: 2,
  coOccupantsDescription: 'Moving in with my partner Lenka (Data Analyst at Swiss Re Bratislava). Both quiet professionals.',
  needsResidenceRegistration: true,
  bio: 'We have lived in Ružinov for 3 years and are looking for a long-term home closer to Nivy / Eurovea. We treat apartments like our own, love cooking quiet weekend meals, and always pay rent on the 1st of the month.',
  previousLandlordReference: {
    name: 'Ing. Tomáš Babiak',
    contact: '+421 904 *** 112',
    review: 'Michal and Lenka rented my 2-room flat on Miletičova for 28 months with their cat. Zero scratches on furniture, never missed a payment, returned the flat immaculate.',
    tenancyPeriod: 'May 2024 – August 2026',
    rating: 5
  },
  linkedInUrl: 'https://linkedin.com/in/michal-varga-ba',
  preferredMoveInDate: '2026-10-15'
};

export const INITIAL_APPLICATIONS: RentalApplication[] = [
  {
    id: 'app-1',
    propertyId: 'prop-1',
    tenant: CURRENT_USER_TENANT,
    status: 'pending',
    appliedAt: 'Today at 09:15',
    coverNote: 'Dobrý deň pán Horváth! Your apartment at Chalupkova looks wonderful. It is exactly 7 minutes walking from our office at Nivy Tower. We have 2 months deposit ready immediately and selected the Thursday 18:00 viewing spot.',
    requestedSlotId: 'slot-1-2',
    requestedSlotLabel: 'Thursday, Oct 1 (18:00 - 18:20)',
    matchScore: 97,
    messages: []
  },
  {
    id: 'app-2',
    propertyId: 'prop-1',
    tenant: {
      id: 'tenant-2',
      fullName: 'Emma Kováčová, MD',
      email: 'dr.emma.kovac@unb.sk',
      phone: '+421 917 334 112',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      headline: 'Resident Physician at UNB Ružinov Hospital',
      age: 31,
      occupation: 'Pediatric Resident',
      employer: 'Univerzitná Nemocnica Bratislava',
      netIncomeRange: '€2,000 - €3,200',
      verifications: {
        idDocumentType: 'obciansky_preukaz',
        idNumberMasked: 'SV 772***',
        idVerifiedAt: '2026-07-20',
        isIdVerified: true,
        employmentVerified: true,
        bankSolvencyVerified: true,
        depositPreCleared: true,
        noDebtsDeclared: true,
        hasPreviousLandlordVouch: true,
        tenantLiabilityInsurance: true,
        linkedInVerified: false
      },
      hasPets: false,
      hasChildren: false,
      isSmoker: false,
      occupantsCount: 1,
      needsResidenceRegistration: true,
      bio: 'Non-smoker, quiet doctor looking for peaceful accommodation close to Ružinov hospital. No pets, highly responsible.',
      previousLandlordReference: {
        name: 'Mgr. Juraj Sýkora',
        contact: '+421 903 *** 890',
        review: 'Emma was an exemplary tenant for 2 years. Very polite, immaculate cleanliness.',
        tenancyPeriod: '2024 – 2026',
        rating: 5
      },
      preferredMoveInDate: '2026-10-01'
    },
    status: 'viewing_scheduled',
    appliedAt: 'Yesterday',
    requestedSlotId: 'slot-1-1',
    requestedSlotLabel: 'Thursday, Oct 1 (17:30 - 17:50)',
    coverNote: 'Hello, looking for a clean, stable rental near Ružinov. I work hospital shifts and value quiet living. Deposit ready.',
    matchScore: 98,
    messages: [
      {
        id: 'msg-1',
        senderRole: 'landlord',
        senderName: 'Ing. Peter Horváth',
        content: 'Dobrý deň Dr. Kováčová! I have approved your viewing for Thursday at 17:30. The entry is from the courtyard near entrance B.',
        timestamp: 'Yesterday 14:20',
        read: true
      },
      {
        id: 'msg-2',
        senderRole: 'tenant',
        senderName: 'Emma Kováčová, MD',
        content: 'Ďakujem pekne pán Horváth! That suits me perfectly after my hospital round. Can I ring buzzer #7?',
        timestamp: 'Yesterday 14:35',
        read: true
      },
      {
        id: 'msg-3',
        senderRole: 'landlord',
        senderName: 'Ing. Peter Horváth',
        content: 'Yes, buzzer 7 is labelled Horváth. Looking forward to meeting you on Thursday.',
        timestamp: 'Yesterday 14:40',
        read: true
      }
    ]
  },
  {
    id: 'app-3',
    propertyId: 'prop-1',
    tenant: {
      id: 'tenant-3',
      fullName: 'Martin & Katarína Molnár',
      email: 'molnar.family@gmail.com',
      phone: '+421 940 882 104',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      headline: 'Financial Analyst (Erste) & Architect with 3-year-old daughter',
      age: 33,
      occupation: 'Senior Financial Analyst',
      employer: 'Slovenská sporiteľňa (Erste Group)',
      netIncomeRange: '€3,200+',
      verifications: {
        idDocumentType: 'obciansky_preukaz',
        idNumberMasked: 'BL 902***',
        idVerifiedAt: '2026-08-01',
        isIdVerified: true,
        employmentVerified: true,
        bankSolvencyVerified: true,
        depositPreCleared: true,
        noDebtsDeclared: true,
        hasPreviousLandlordVouch: false,
        tenantLiabilityInsurance: true,
        linkedInVerified: true
      },
      hasPets: false,
      hasChildren: true,
      childrenDetails: '1 daughter (3 years old), attending Ružinov state kindergarten nearby',
      isSmoker: false,
      occupantsCount: 3,
      coOccupantsDescription: 'Husband, wife, and our toddler daughter Sofia.',
      needsResidenceRegistration: true,
      bio: 'We are a quiet young family looking for a reliable 2+ year home in Ružinov close to parks and kindergarten. We treat properties with immense care.',
      linkedInUrl: 'https://linkedin.com/in/martin-molnar-ba',
      preferredMoveInDate: '2026-10-01'
    },
    status: 'pending',
    appliedAt: '2 days ago',
    requestedSlotId: 'slot-1-3',
    requestedSlotLabel: 'Saturday, Oct 3 (10:30 - 10:50)',
    coverNote: 'Dobrý deň, we are looking for a reliable long-term rental for our small family. We appreciate that you welcome children and allow registration for parking/daycare.',
    matchScore: 95,
    messages: []
  }
];

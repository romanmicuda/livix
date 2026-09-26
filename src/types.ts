export type BratislavaDistrict =
  | 'Staré Mesto'
  | 'Ružinov'
  | 'Nové Mesto'
  | 'Petržalka'
  | 'Karlova Ves'
  | 'Dúbravka'
  | 'Rača'
  | 'Devínska Nová Ves'
  | 'Vrakuňa'
  | 'Podunajské Biskupice';

export interface PropertyPolicy {
  petsPolicy: 'allowed' | 'case_by_case' | 'not_allowed';
  allowedPetTypes?: ('cats' | 'dogs_small' | 'dogs_large' | 'caged_small')[];
  petDepositExtraEur?: number;
  childrenWelcome: boolean;
  idealForFamilies: boolean;
  smokingPolicy: 'strictly_no' | 'balcony_only' | 'allowed';
  maxOccupants: number;
  allowsPermanentResidence: boolean;
  preferredLeaseType: 'short_term_act' | 'civil_code';
}

export interface LandlordProfile {
  id: string;
  fullName: string;
  phone: string;
  phoneVerified: boolean;
  email: string;
  emailVerified: boolean;
  isCompany: boolean;
  companyName?: string;
  ico?: string;
  verificationTier: 'tier1_registered' | 'tier2_kataster_verified' | 'tier3_super_landlord';
  katasterVerified: boolean;
  listVlastnictvaNumber?: string;
  katastralneUzemie?: string;
  taxRegisteredDic?: string;
  languagesSpoken: string[];
  bio: string;
  preferredContact: 'livix_chat' | 'phone' | 'email';
}

export interface ViewingSlot {
  id: string;
  date: string;
  time: string;
  isBooked: boolean;
  bookedByApplicantId?: string;
}

export interface Property {
  id: string;
  title: string;
  district: BratislavaDistrict;
  street: string;
  rentEur: number;
  energyEur: number;
  depositEur: number;
  sizeM2: number;
  rooms: string;
  floor: number;
  totalFloors: number;
  hasElevator: boolean;
  hasBalcony: boolean;
  isFurnished: 'fully' | 'partially' | 'unfurnished';
  policy: PropertyPolicy;
  availableFrom: string;
  transitHighlight?: string;
  description: string;
  images: string[];
  landlord: LandlordProfile;
  applicationsCount: number;
  createdAt: string;
  viewingSlots: ViewingSlot[];
}

export type IdDocumentType = 'obciansky_preukaz' | 'passport' | 'residency_card';

export interface TenantVerificationDetails {
  idDocumentType: IdDocumentType;
  idNumberMasked: string;
  idVerifiedAt: string;
  isIdVerified: boolean;
  employmentVerified: boolean;
  employmentDocType?: 'employment_contract' | 'work_certificate' | 'payslip_sample';
  bankSolvencyVerified: boolean;
  depositPreCleared: boolean;
  noDebtsDeclared: boolean;
  hasPreviousLandlordVouch: boolean;
  tenantLiabilityInsurance: boolean;
  linkedInVerified: boolean;
}

export interface TenantPassport {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  headline: string;
  age: number;
  occupation: string;
  employer: string;
  netIncomeRange: 'Under €1,200' | '€1,200 - €2,000' | '€2,000 - €3,200' | '€3,200+';
  verifications: TenantVerificationDetails;
  hasPets: boolean;
  petDetails?: string;
  hasChildren: boolean;
  childrenDetails?: string;
  isSmoker: boolean;
  occupantsCount: number;
  coOccupantsDescription?: string;
  needsResidenceRegistration: boolean;
  bio: string;
  previousLandlordReference?: {
    name: string;
    contact: string;
    review: string;
    tenancyPeriod: string;
    rating: number;
  };
  linkedInUrl?: string;
  preferredMoveInDate: string;
}

export interface ChatMessage {
  id: string;
  senderRole: 'landlord' | 'tenant';
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface RentalApplication {
  id: string;
  propertyId: string;
  tenant: TenantPassport;
  status: 'pending' | 'viewing_scheduled' | 'approved' | 'declined';
  appliedAt: string;
  coverNote: string;
  requestedSlotId?: string;
  requestedSlotLabel?: string;
  matchScore: number;
  messages: ChatMessage[];
}

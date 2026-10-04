export type Role = 'citizen' | 'officer' | 'admin';

export type ComplaintStatus = 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'VERIFIED' | 'REOPENED';

export type Category = 
  | 'ROADS_POTHOLES'
  | 'SOLID_WASTE'
  | 'WATER_DRAINAGE'
  | 'STREETLIGHTS'
  | 'PUBLIC_HEALTH'
  | 'ENCROACHMENT'
  | 'PARKS_TREES';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: Role;
  ward: string;
  city: string;
  language: 'en' | 'gu';
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  badges: string[];
}

export interface Department {
  id: string;
  name: string;
  nameGu: string;
  code: string;
  icon: string;
  color: string;
  headName: string;
  slaHours: number;
  activeCount: number;
  resolvedCount: number;
  reopenRate: number;
  avgResolutionHours: number;
}

export interface Officer {
  id: string;
  name: string;
  phone: string;
  email: string;
  departmentId: string;
  ward: string;
  city: string;
  avatar: string;
  activeTasks: number;
  resolvedMonth: number;
  accuracyScore: number;
  streak: number;
  status: 'ON_DUTY' | 'ON_LEAVE' | 'FIELD';
}

export interface GPSLocation {
  lat: number;
  lng: number;
  accuracyMeters: number;
  address: string;
  addressGu?: string;
  ward: string;
  zone: string;
  city: string;
}

export interface TimelineEvent {
  id: string;
  status: ComplaintStatus;
  title: string;
  titleGu?: string;
  description: string;
  descriptionGu?: string;
  actor: string;
  role: Role | 'SYSTEM';
  timestamp: string;
  photoUrl?: string;
  location?: GPSLocation;
}

export interface VerificationCall {
  id: string;
  complaintId: string;
  citizenPhone: string;
  status: 'QUEUED' | 'RINGING' | 'COMPLETED' | 'NO_ANSWER' | 'FAILED';
  outcome?: 'VERIFIED_PRESSED_1' | 'REOPENED_PRESSED_2' | 'NO_RESPONSE';
  dialedAt: string;
  durationSeconds: number;
  audioUrl?: string;
  transcriptGu: string;
  transcriptEn: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
}

export interface ComplaintComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
}

export interface Complaint {
  id: string;
  ticketNumber: string;
  title: string;
  titleGu: string;
  description: string;
  descriptionGu: string;
  category: Category;
  departmentId: string;
  departmentName: string;
  status: ComplaintStatus;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  
  // Citizen submission data
  citizenId: string;
  citizenName: string;
  citizenPhone: string;
  submittedAt: string;
  photoBeforeUrl: string;
  complaintLocation: GPSLocation;
  aiClassification: {
    predictedCategory: Category;
    confidence: number;
    duplicateRiskPercentage: number;
    detectedObjects: string[];
  };

  // Upvotes & Community
  upvotes: number;
  hasUpvoted?: boolean;
  comments: ComplaintComment[];

  // Field Officer Resolution data
  assignedOfficerId?: string;
  assignedOfficerName?: string;
  workStartedAt?: string;
  resolvedAt?: string;
  photoAfterUrl?: string;
  resolutionRemarks?: string;
  resolutionRemarksGu?: string;
  resolutionLocation?: GPSLocation;
  geoFenceDistanceMeters?: number;
  geoFencePassed?: boolean;
  exifValid?: boolean;

  // Verification & Audit
  verifiedAt?: string;
  reopenedAt?: string;
  reopenReason?: string;
  verificationCall?: VerificationCall;
  
  timeline: TimelineEvent[];
}

export interface CivicBadge {
  id: string;
  title: string;
  titleGu: string;
  description: string;
  descriptionGu: string;
  icon: string;
  color: string;
  unlockedAt?: string;
  progressPercentage?: number;
}

export interface RewardItem {
  id: string;
  title: string;
  titleGu: string;
  costXp: number;
  category: 'TRANSIT' | 'TAX_REBATE' | 'NURSERY' | 'MERCH';
  partnerName: string;
  image: string;
  claimed?: boolean;
}

export interface FraudAlert {
  id: string;
  complaintId: string;
  ticketNumber: string;
  officerName: string;
  departmentName: string;
  type: 'GEO_FENCE_BREACH' | 'PHOTO_DUPLICATION' | 'REPEATED_REOPEN' | 'TIME_ANOMALY';
  severity: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  description: string;
  detectedAt: string;
  status: 'PENDING_REVIEW' | 'FLAGGED' | 'DISMISSED';
}

export interface IvrMonitorItem {
  id: string;
  callerPhone: string;
  ward: string;
  city: string;
  duration: string;
  language: 'gu' | 'en';
  status: 'RESOLVED_VOICE' | 'TRANSFERRED' | 'RECORDED_COMPLAINT';
  timestamp: string;
  audioDuration: number;
  transcriptGu: string;
  summaryEn: string;
  detectedCategory: Category;
}

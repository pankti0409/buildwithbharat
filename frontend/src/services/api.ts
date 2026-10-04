import { 
  Complaint, 
  ComplaintStatus, 
  Department, 
  Officer, 
  Category, 
  CivicBadge, 
  RewardItem, 
  FraudAlert, 
  IvrMonitorItem,
  GPSLocation
} from '../types';

// Mock Gujarat Departments
export const DEPARTMENTS: Department[] = [
  {
    id: 'dept_roads',
    name: 'Roads & Bridges Department',
    nameGu: 'રસ્તા અને પુલ વિભાગ',
    code: 'RBD',
    icon: 'Hammer',
    color: '#8B7CF6',
    headName: 'Er. Nitin Patel',
    slaHours: 24,
    activeCount: 14,
    resolvedCount: 148,
    reopenRate: 2.1,
    avgResolutionHours: 16.5,
  },
  {
    id: 'dept_solid_waste',
    name: 'Solid Waste Management',
    nameGu: 'ઘન કચરા વ્યવસ્થાપન',
    code: 'SWM',
    icon: 'Trash2',
    color: '#7ED9B8',
    headName: 'Dr. Meera Trivedi',
    slaHours: 12,
    activeCount: 8,
    resolvedCount: 290,
    reopenRate: 1.4,
    avgResolutionHours: 8.2,
  },
  {
    id: 'dept_water_drainage',
    name: 'Water Supply & Drainage',
    nameGu: 'પાણી પુરવઠો અને ગટર વ્યવસ્થા',
    code: 'WSD',
    icon: 'Droplets',
    color: '#9CCBFF',
    headName: 'Er. Hardik Shah',
    slaHours: 18,
    activeCount: 11,
    resolvedCount: 215,
    reopenRate: 3.5,
    avgResolutionHours: 14.1,
  },
  {
    id: 'dept_streetlights',
    name: 'Streetlights & Electricals',
    nameGu: 'શેરી બત્તી અને વિદ્યુત વિભાગ',
    code: 'SLE',
    icon: 'Lightbulb',
    color: '#FFE29A',
    headName: 'Shri K. R. Varma',
    slaHours: 24,
    activeCount: 6,
    resolvedCount: 182,
    reopenRate: 1.8,
    avgResolutionHours: 11.0,
  },
  {
    id: 'dept_public_health',
    name: 'Public Health & Sanitation',
    nameGu: 'જાહેર આરોગ્ય અને સ્વચ્છતા',
    code: 'PHS',
    icon: 'HeartPulse',
    color: '#F7A1B5',
    headName: 'Dr. Sunita Barot',
    slaHours: 12,
    activeCount: 5,
    resolvedCount: 164,
    reopenRate: 0.9,
    avgResolutionHours: 7.8,
  },
];

// Initial Realistic Complaints across Gujarat
const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'cmp_101',
    ticketNumber: 'TS-2026-0891',
    title: 'Severe Pothole Cluster on CG Road near Stadium Circle',
    titleGu: 'સ્ટેડિયમ સર્કલ પાસે સી.જી. રોડ પર ખાડાઓનું મોટું ઝૂંડ',
    description: 'Multiple deep potholes right near the pedestrian crossing. Waterlogged and causing severe two-wheeler traffic hazards during peak hours.',
    descriptionGu: 'પેડેસ્ટ્રિયન ક્રોસિંગ પાસે ઘણા ઊંડા ખાડા છે. પાણી ભરાવાથી પીક અવર્સમાં ટુ-વ્હીલર માટે અકસ્માતનો ભય રહે છે.',
    category: 'ROADS_POTHOLES',
    departmentId: 'dept_roads',
    departmentName: 'Roads & Bridges Department',
    status: 'IN_PROGRESS',
    urgency: 'HIGH',
    citizenId: 'usr_citizen_01',
    citizenName: 'Aarav Patel',
    citizenPhone: '+91 98795 43210',
    submittedAt: '2026-10-04T08:30:00Z',
    photoBeforeUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
    complaintLocation: {
      lat: 23.0378,
      lng: 72.5621,
      accuracyMeters: 4.2,
      address: 'Near Swastik Cross Roads, CG Road, Navrangpura',
      addressGu: 'સ્વસ્તિક ચાર રસ્તા પાસે, સી.જી. રોડ, નવરંગપુરા',
      ward: 'Navrangpura (Ward 12)',
      zone: 'West Zone',
      city: 'Ahmedabad',
    },
    aiClassification: {
      predictedCategory: 'ROADS_POTHOLES',
      confidence: 0.98,
      duplicateRiskPercentage: 12,
      detectedObjects: ['asphalt breakage', 'cavity depth ~15cm', 'water puddle'],
    },
    upvotes: 24,
    hasUpvoted: true,
    comments: [
      {
        id: 'c1',
        userId: 'u2',
        userName: 'Priya Joshi',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        text: 'I almost slipped here yesterday evening on my scooter! Needs urgent patch up.',
        timestamp: '2026-10-04T09:15:00Z',
      },
    ],
    assignedOfficerId: 'off_roads_01',
    assignedOfficerName: 'Rajesh Solanki',
    workStartedAt: '2026-10-04T10:45:00Z',
    timeline: [
      {
        id: 'tl_1',
        status: 'PENDING',
        title: 'Grievance Registered',
        titleGu: 'ફરિયાદ નોંધાઈ',
        description: 'Citizen filed grievance with GPS camera telemetry locked.',
        actor: 'Aarav Patel',
        role: 'citizen',
        timestamp: '2026-10-04T08:30:00Z',
      },
      {
        id: 'tl_2',
        status: 'PENDING',
        title: 'AI Auto-Routing',
        titleGu: 'AI આપોઆપ વિભાગ ફાળવણી',
        description: 'Vision model classified image as Roads & Potholes (98% confidence). Routed to RBD Navrangpura.',
        actor: 'Tark AI Engine',
        role: 'SYSTEM',
        timestamp: '2026-10-04T08:30:05Z',
      },
      {
        id: 'tl_3',
        status: 'IN_PROGRESS',
        title: 'Field Team Dispatched',
        titleGu: 'ટીમ સ્થળ પર રવાના',
        description: 'Officer Rajesh Solanki accepted ticket and marked In-Progress.',
        actor: 'Rajesh Solanki',
        role: 'officer',
        timestamp: '2026-10-04T10:45:00Z',
      },
    ],
  },
  {
    id: 'cmp_102',
    ticketNumber: 'TS-2026-0887',
    title: 'Overflowing Municipal Garbage Container on Vastrapur Lake Road',
    titleGu: 'વસ્ત્રાપુર તળાવ રોડ પર કચરાપેટી ઊભરાઈ રહી છે',
    description: 'Solid waste container not cleared for 2 days. Stray cattle gathered and litter spilled across 15 meters of pedestrian footpath.',
    descriptionGu: '૨ દિવસથી કચરાપેટી ખાલી કરવામાં આવી નથી. રખડતા ઢોર ભેગા થયા છે અને કચરો ફૂટપાથ પર ફેલાયો છે.',
    category: 'SOLID_WASTE',
    departmentId: 'dept_solid_waste',
    departmentName: 'Solid Waste Management',
    status: 'RESOLVED',
    urgency: 'HIGH',
    citizenId: 'usr_citizen_02',
    citizenName: 'Bhavik Shah',
    citizenPhone: '+91 98250 11234',
    submittedAt: '2026-10-03T14:10:00Z',
    photoBeforeUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&auto=format&fit=crop&q=80',
    complaintLocation: {
      lat: 23.0354,
      lng: 72.5283,
      accuracyMeters: 3.8,
      address: 'Opposite Vastrapur Amphitheatre, Vastrapur Lake Ring Road',
      addressGu: 'વસ્ત્રાપુર એમ્ફીથિયેટર સામે, વસ્ત્રાપુર',
      ward: 'Bodakdev & Vastrapur (Ward 14)',
      zone: 'New West Zone',
      city: 'Ahmedabad',
    },
    aiClassification: {
      predictedCategory: 'SOLID_WASTE',
      confidence: 0.99,
      duplicateRiskPercentage: 5,
      detectedObjects: ['overflowing dumper', 'solid waste', 'polythene'],
    },
    upvotes: 38,
    comments: [],
    assignedOfficerId: 'off_waste_01',
    assignedOfficerName: 'Kiran Parmar',
    workStartedAt: '2026-10-03T15:30:00Z',
    resolvedAt: '2026-10-03T17:45:00Z',
    photoAfterUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    resolutionRemarks: 'Compactor vehicle GJ-01-CZ-4412 cleared 3.4 tonnes of solid waste. Area washed with disinfectant powder.',
    resolutionRemarksGu: 'કચરો સંપૂર્ણપણે ઉપાડી લેવાયો છે અને સેનિટાઈઝેશન કરવામાં આવ્યું છે.',
    resolutionLocation: {
      lat: 23.0355,
      lng: 72.5284,
      accuracyMeters: 2.9,
      address: 'Vastrapur Lake Road Container Station',
      ward: 'Bodakdev & Vastrapur (Ward 14)',
      zone: 'New West Zone',
      city: 'Ahmedabad',
    },
    geoFenceDistanceMeters: 14,
    geoFencePassed: true,
    exifValid: true,
    verificationCall: {
      id: 'call_9901',
      complaintId: 'cmp_102',
      citizenPhone: '+91 98250 11234',
      status: 'COMPLETED',
      outcome: 'VERIFIED_PRESSED_1',
      dialedAt: '2026-10-03T18:00:10Z',
      durationSeconds: 42,
      transcriptGu: 'નમસ્તે ભાવિકભાઈ, તર્ક શાસ્ત્ર મ્યુનિસિપલ સિસ્ટમમાંથી કોલ છે. વસ્ત્રાપુર ખાતે કચરો સાફ થઈ ગયો છે? જો હા, તો ૧ દબાવો. [નાગરિકે ૧ દબાવ્યું]',
      transcriptEn: 'Hello Bhavik-bhai, Tark Shaastra automated verification call. Has the solid waste at Vastrapur been completely cleared? Press 1 to verify. [Citizen pressed 1: Confirmed]',
      sentiment: 'POSITIVE',
    },
    timeline: [
      {
        id: 'tl_201',
        status: 'PENDING',
        title: 'Report Submitted',
        description: 'Grievance logged with photo evidence & precise location.',
        actor: 'Bhavik Shah',
        role: 'citizen',
        timestamp: '2026-10-03T14:10:00Z',
      },
      {
        id: 'tl_202',
        status: 'IN_PROGRESS',
        title: 'Compactor Dispatched',
        description: 'Sanitation unit 04 deployed.',
        actor: 'Kiran Parmar',
        role: 'officer',
        timestamp: '2026-10-03T15:30:00Z',
      },
      {
        id: 'tl_203',
        status: 'RESOLVED',
        title: 'Proof of Resolution Uploaded',
        description: 'Photo uploaded with 14m geo-fence clearance and EXIF match.',
        actor: 'Kiran Parmar',
        role: 'officer',
        timestamp: '2026-10-03T17:45:00Z',
      },
      {
        id: 'tl_204',
        status: 'VERIFIED',
        title: 'Citizen Verified via Gujarati IVR Call',
        description: 'Automated call dialed +91 98250 11234. Citizen pressed 1 to confirm clean spot.',
        actor: 'Twilio IVR Voice Engine',
        role: 'SYSTEM',
        timestamp: '2026-10-03T18:00:10Z',
      },
    ],
  },
  {
    id: 'cmp_103',
    ticketNumber: 'TS-2026-0872',
    title: 'High Pressure Water Pipe Leakage at Alkapuri Main Road',
    titleGu: 'અલકાપુરી મુખ્ય માર્ગ પર હાઇ પ્રેશર પાણીની પાઇપલાઇન લીકેજ',
    description: 'Underground potable water supply line burst. Clean drinking water flooding the road and entering commercial basement complexes.',
    descriptionGu: 'પીવાના પાણીની મુખ્ય પાઇપલાઇન તૂટવાથી હજારો લીટર પાણી રસ્તા પર વહી રહ્યું છે.',
    category: 'WATER_DRAINAGE',
    departmentId: 'dept_water_drainage',
    departmentName: 'Water Supply & Drainage',
    status: 'VERIFIED',
    urgency: 'CRITICAL',
    citizenId: 'usr_citizen_03',
    citizenName: 'Devansh Desai',
    citizenPhone: '+91 94270 55667',
    submittedAt: '2026-10-02T07:15:00Z',
    photoBeforeUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80',
    complaintLocation: {
      lat: 22.3107,
      lng: 73.1812,
      accuracyMeters: 3.1,
      address: 'Near Circuit House, RC Dutt Road, Alkapuri',
      addressGu: 'સર્કિટ હાઉસ પાસે, આર.સી. દત્ત રોડ, અલકાપુરી',
      ward: 'Alkapuri (Ward 7)',
      zone: 'West Zone',
      city: 'Vadodara',
    },
    aiClassification: {
      predictedCategory: 'WATER_DRAINAGE',
      confidence: 0.97,
      duplicateRiskPercentage: 0,
      detectedObjects: ['water pipe burst', 'flooded asphalt', 'high pressure geyser'],
    },
    upvotes: 52,
    comments: [],
    assignedOfficerId: 'off_water_01',
    assignedOfficerName: 'Hardik Shah',
    workStartedAt: '2026-10-02T08:00:00Z',
    resolvedAt: '2026-10-02T13:30:00Z',
    photoAfterUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    resolutionRemarks: 'Main 300mm DI line valve closed, joint welded and sealed with heavy-duty sleeve clamp. Pressure restored to 2.8 bar.',
    resolutionRemarksGu: 'મુખ્ય પાઇપલાઇન વેલ્ડિંગ કરી રીપેર કરવામાં આવી છે.',
    resolutionLocation: {
      lat: 22.3106,
      lng: 73.1811,
      accuracyMeters: 2.4,
      address: 'Alkapuri RC Dutt Road',
      ward: 'Alkapuri (Ward 7)',
      zone: 'West Zone',
      city: 'Vadodara',
    },
    geoFenceDistanceMeters: 18,
    geoFencePassed: true,
    exifValid: true,
    verifiedAt: '2026-10-02T14:00:00Z',
    timeline: [
      {
        id: 'tl_301',
        status: 'PENDING',
        title: 'Emergency Complaint Logged',
        description: 'High priority water line burst reported.',
        actor: 'Devansh Desai',
        role: 'citizen',
        timestamp: '2026-10-02T07:15:00Z',
      },
      {
        id: 'tl_302',
        status: 'IN_PROGRESS',
        title: 'Emergency Valve Shuttered & Crew Active',
        description: 'Excavation team began sleeve repair.',
        actor: 'Hardik Shah',
        role: 'officer',
        timestamp: '2026-10-02T08:00:00Z',
      },
      {
        id: 'tl_303',
        status: 'RESOLVED',
        title: 'Pipeline Repaired & Sealed',
        description: 'Pressure tested and road surface backfilled.',
        actor: 'Hardik Shah',
        role: 'officer',
        timestamp: '2026-10-02T13:30:00Z',
      },
      {
        id: 'tl_304',
        status: 'VERIFIED',
        title: 'Resolution Verified by Citizen',
        description: 'Citizen approved via citizen portal after inspecting site.',
        actor: 'Devansh Desai',
        role: 'citizen',
        timestamp: '2026-10-02T14:00:00Z',
      },
    ],
  },
  {
    id: 'cmp_104',
    ticketNumber: 'TS-2026-0865',
    title: 'Series of 8 Streetlights Non-Functional on Adajan Canal Road',
    titleGu: 'અડાજણ કેનાલ રોડ પર ૮ સ્ટ્રીટલાઈટો બંધ હાલતમાં છે',
    description: 'Entire 200m stretch is completely dark since 3 nights. Safety concern for women commuters and evening joggers.',
    descriptionGu: 'છેલ્લા ૩ દિવસથી અડાજણ કેનાલ રોડ પર અંધારપટ છવાયેલો છે. રાત્રિના સમયે અસુરક્ષા અનુભવાય છે.',
    category: 'STREETLIGHTS',
    departmentId: 'dept_streetlights',
    departmentName: 'Streetlights & Electricals',
    status: 'REOPENED',
    urgency: 'MEDIUM',
    citizenId: 'usr_citizen_04',
    citizenName: 'Ananya Mehta',
    citizenPhone: '+91 97230 44991',
    submittedAt: '2026-10-01T19:20:00Z',
    photoBeforeUrl: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&auto=format&fit=crop&q=80',
    photoAfterUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80',
    complaintLocation: {
      lat: 21.1959,
      lng: 72.7933,
      accuracyMeters: 4.8,
      address: 'Adajan Canal Road, Near Pal Bridge, Adajan',
      addressGu: 'અડાજણ કેનાલ રોડ, પાલ બ્રિજ પાસે, અડાજણ',
      ward: 'Adajan & Pal (Ward 10)',
      zone: 'West Zone',
      city: 'Surat',
    },
    aiClassification: {
      predictedCategory: 'STREETLIGHTS',
      confidence: 0.96,
      duplicateRiskPercentage: 0,
      detectedObjects: ['dark road pole', 'non-functioning sodium lamp'],
    },
    upvotes: 41,
    comments: [],
    assignedOfficerId: 'off_light_01',
    assignedOfficerName: 'K. R. Varma',
    reopenedAt: '2026-10-03T20:15:00Z',
    reopenReason: 'Officer replaced only 2 bulbs at the start of the road, but remaining 6 lights are still completely pitch black.',
    timeline: [
      {
        id: 'tl_401',
        status: 'PENDING',
        title: 'Report Submitted',
        description: 'Dark stretch reported on Adajan canal road.',
        actor: 'Ananya Mehta',
        role: 'citizen',
        timestamp: '2026-10-01T19:20:00Z',
      },
      {
        id: 'tl_402',
        status: 'RESOLVED',
        title: 'Officer Submitted Partial Resolution',
        description: 'Officer marked resolved stating timer replaced.',
        actor: 'K. R. Varma',
        role: 'officer',
        timestamp: '2026-10-03T16:00:00Z',
      },
      {
        id: 'tl_403',
        status: 'REOPENED',
        title: 'Citizen Pressed 2 on IVR Call (Reopened)',
        description: 'Citizen stated 6 lamps are still dead. Complaint auto-reopened and escalated to Ward Superintendent.',
        actor: 'Ananya Mehta via Twilio IVR',
        role: 'citizen',
        timestamp: '2026-10-03T20:15:00Z',
      },
    ],
  },
  {
    id: 'cmp_105',
    ticketNumber: 'TS-2026-0850',
    title: 'Illegal Encroachment and Construction Debris Dumping on SG Highway Footpath',
    titleGu: 'એસ.જી. હાઇવે ફૂટપાથ પર ગેરકાયદે બાંધકામ કાટમાળ અને દબાણ',
    description: 'Trucks dumping concrete rubble on the public service road and cycle track near Gota Flyover.',
    descriptionGu: 'ગોતા ફ્લાયઓવર નજીક સાયકલ ટ્રેક અને ફૂટપાથ પર મોટા પ્રમાણમાં કાટમાળ ફેંકવામાં આવ્યો છે.',
    category: 'ENCROACHMENT',
    departmentId: 'dept_roads',
    departmentName: 'Roads & Bridges Department',
    status: 'PENDING',
    urgency: 'HIGH',
    citizenId: 'usr_citizen_05',
    citizenName: 'Manish Vaghela',
    citizenPhone: '+91 99099 22334',
    submittedAt: '2026-10-04T06:45:00Z',
    photoBeforeUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80',
    complaintLocation: {
      lat: 23.1065,
      lng: 72.5398,
      accuracyMeters: 5.0,
      address: 'Near Gota Cross Roads, SG Highway Service Lane',
      addressGu: 'ગોતા ચાર રસ્તા પાસે, એસ.જી. હાઇવે',
      ward: 'Gota & Chandlodia (Ward 1)',
      zone: 'North West Zone',
      city: 'Ahmedabad',
    },
    aiClassification: {
      predictedCategory: 'ENCROACHMENT',
      confidence: 0.94,
      duplicateRiskPercentage: 0,
      detectedObjects: ['debris piles', 'concrete chunks', 'blocked footpath'],
    },
    upvotes: 19,
    comments: [],
    timeline: [
      {
        id: 'tl_501',
        status: 'PENDING',
        title: 'Report Registered',
        description: 'Debris encroachment ticket logged.',
        actor: 'Manish Vaghela',
        role: 'citizen',
        timestamp: '2026-10-04T06:45:00Z',
      },
    ],
  },
  {
    id: 'cmp_106',
    ticketNumber: 'TS-2026-0842',
    title: 'Stagnant Dirty Water & Mosquito Breeding Ground near Maninagar Railway Station',
    titleGu: 'મણિનગર રેલ્વે સ્ટેશન નજીક ગંદુ પાણી ભરાયેલું અને મચ્છરોનો ઉપદ્રવ',
    description: 'Post-monsoon water logging causing heavy mosquito density. Need urgent anti-larval chemical fogging and suction pump evacuation.',
    descriptionGu: 'મણિનગર સ્ટેશન પાછળ ખુલ્લા પ્લોટમાં ગંદુ પાણી ભરાતા મચ્છરોનો ભારે ઉપદ્રવ થયો છે. તાત્કાલિક દવાનો છંટકાવ જરૂરી છે.',
    category: 'PUBLIC_HEALTH',
    departmentId: 'dept_public_health',
    departmentName: 'Public Health & Sanitation',
    status: 'IN_PROGRESS',
    urgency: 'HIGH',
    citizenId: 'usr_citizen_06',
    citizenName: 'Geeta Ben Rathod',
    citizenPhone: '+91 98980 77112',
    submittedAt: '2026-10-03T11:00:00Z',
    photoBeforeUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&auto=format&fit=crop&q=80',
    complaintLocation: {
      lat: 22.9984,
      lng: 72.6033,
      accuracyMeters: 3.5,
      address: 'Behind Railway Colony, Station Road, Maninagar',
      addressGu: 'રેલ્વે કોલોની પાછળ, મણિનગર',
      ward: 'Maninagar (Ward 22)',
      zone: 'South Zone',
      city: 'Ahmedabad',
    },
    aiClassification: {
      predictedCategory: 'PUBLIC_HEALTH',
      confidence: 0.95,
      duplicateRiskPercentage: 0,
      detectedObjects: ['stagnant water', 'green algae', 'larvae risk'],
    },
    upvotes: 33,
    comments: [],
    assignedOfficerId: 'off_health_01',
    assignedOfficerName: 'Dr. Sunita Barot',
    workStartedAt: '2026-10-04T09:00:00Z',
    timeline: [
      {
        id: 'tl_601',
        status: 'PENDING',
        title: 'Health Grievance Registered',
        description: 'Mosquito breeding risk flagged.',
        actor: 'Geeta Ben Rathod',
        role: 'citizen',
        timestamp: '2026-10-03T11:00:00Z',
      },
      {
        id: 'tl_602',
        status: 'IN_PROGRESS',
        title: 'Fogging Team Assigned',
        description: 'Health team vehicle deployed with Abate larvicide.',
        actor: 'Dr. Sunita Barot',
        role: 'officer',
        timestamp: '2026-10-04T09:00:00Z',
      },
    ],
  },
  {
    id: 'cmp_107',
    ticketNumber: 'TS-2026-0839',
    title: 'Fallen Neem Tree Branch Blocking School Bus Lane at Race Course Ring Road',
    titleGu: 'રેસકોર્સ રિંગ રોડ પર લીમડાની મોટી ડાળી તૂટી પડી - રસ્તો બ્લોક',
    description: 'Heavy wind caused branch collapse onto the primary school bus transit lane.',
    descriptionGu: 'મોટો લીમડો પડી જવાથી શાળાની બસો માટે રસ્તો બંધ થઈ ગયો છે.',
    category: 'PARKS_TREES',
    departmentId: 'dept_roads',
    departmentName: 'Roads & Bridges Department',
    status: 'RESOLVED',
    urgency: 'HIGH',
    citizenId: 'usr_citizen_07',
    citizenName: 'Jayeshbhai Patel',
    citizenPhone: '+91 94080 33211',
    submittedAt: '2026-10-03T08:15:00Z',
    photoBeforeUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    complaintLocation: {
      lat: 22.2982,
      lng: 70.7963,
      accuracyMeters: 4.1,
      address: 'Near Madhavrao Scindia Cricket Stadium, Race Course Ring Road',
      addressGu: 'ક્રિકેટ સ્ટેડિયમ પાસે, રેસકોર્સ, રાજકોટ',
      ward: 'Race Course (Ward 3)',
      zone: 'Central Zone',
      city: 'Rajkot',
    },
    aiClassification: {
      predictedCategory: 'PARKS_TREES',
      confidence: 0.99,
      duplicateRiskPercentage: 0,
      detectedObjects: ['fallen tree trunk', 'blocked roadway', 'green foliage'],
    },
    upvotes: 45,
    comments: [],
    assignedOfficerId: 'off_roads_02',
    assignedOfficerName: 'Sanjay Zala',
    workStartedAt: '2026-10-03T09:00:00Z',
    resolvedAt: '2026-10-03T11:20:00Z',
    photoAfterUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop&q=80',
    resolutionRemarks: 'Chainsaw crew sectioned tree and loaded onto municipal tractor. Road clear.',
    resolutionRemarksGu: 'ઝાડ કટિંગ કરીને રસ્તો ખુલ્લો કરવામાં આવ્યો છે.',
    resolutionLocation: {
      lat: 22.2983,
      lng: 70.7962,
      accuracyMeters: 3.0,
      address: 'Race Course Ring Road',
      ward: 'Race Course (Ward 3)',
      zone: 'Central Zone',
      city: 'Rajkot',
    },
    geoFenceDistanceMeters: 12,
    geoFencePassed: true,
    exifValid: true,
    verifiedAt: '2026-10-03T12:00:00Z',
    timeline: [
      {
        id: 'tl_701',
        status: 'PENDING',
        title: 'Tree Fall Reported',
        description: 'Road blocked emergency ticket logged.',
        actor: 'Jayeshbhai Patel',
        role: 'citizen',
        timestamp: '2026-10-03T08:15:00Z',
      },
      {
        id: 'tl_702',
        status: 'RESOLVED',
        title: 'Cleared and Transported',
        description: 'Chainsaw crew cleared site within 2 hours.',
        actor: 'Sanjay Zala',
        role: 'officer',
        timestamp: '2026-10-03T11:20:00Z',
      },
    ],
  },
  {
    id: 'cmp_108',
    ticketNumber: 'TS-2026-0810',
    title: 'Broken Sewer Cover creating open chamber trap on Science City Road',
    titleGu: 'સાયન્સ સિટી રોડ પર ગટરનું ઢાંકણું તૂટેલું - અકસ્માતનો ભય',
    description: 'Heavy duty cast iron manhole cover smashed. Open 10-foot chamber directly in the path of vehicular movement.',
    descriptionGu: 'સાયન્સ સિટી રોડ પર ગટરનું ખુલ્લું ચેમ્બર છે જેમાં કોઈપણ વાહન કે વ્યક્તિ પડી શકે છે.',
    category: 'WATER_DRAINAGE',
    departmentId: 'dept_water_drainage',
    departmentName: 'Water Supply & Drainage',
    status: 'IN_PROGRESS',
    urgency: 'CRITICAL',
    citizenId: 'usr_citizen_08',
    citizenName: 'Sneha Trivedi',
    citizenPhone: '+91 98240 66554',
    submittedAt: '2026-10-04T07:10:00Z',
    photoBeforeUrl: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=600&auto=format&fit=crop&q=80',
    complaintLocation: {
      lat: 23.0768,
      lng: 72.5098,
      accuracyMeters: 3.2,
      address: 'Opposite Shell Petrol Pump, Science City Main Road, Sola',
      addressGu: 'સાયન્સ સિટી રોડ, સોલા, અમદાવાદ',
      ward: 'Sola & Science City (Ward 15)',
      zone: 'North West Zone',
      city: 'Ahmedabad',
    },
    aiClassification: {
      predictedCategory: 'WATER_DRAINAGE',
      confidence: 0.99,
      duplicateRiskPercentage: 0,
      detectedObjects: ['open manhole chamber', 'broken rim', 'fall hazard'],
    },
    upvotes: 67,
    comments: [],
    assignedOfficerId: 'off_water_02',
    assignedOfficerName: 'Ramesh Chauhan',
    workStartedAt: '2026-10-04T08:30:00Z',
    timeline: [
      {
        id: 'tl_801',
        status: 'PENDING',
        title: 'Critical Open Chamber Reported',
        description: 'Auto-escalated due to critical life safety score.',
        actor: 'Sneha Trivedi',
        role: 'citizen',
        timestamp: '2026-10-04T07:10:00Z',
      },
      {
        id: 'tl_802',
        status: 'IN_PROGRESS',
        title: 'Barricaded & New SFRC Cover in Transit',
        description: 'Safety cones placed, replacement team active.',
        actor: 'Ramesh Chauhan',
        role: 'officer',
        timestamp: '2026-10-04T08:30:00Z',
      },
    ],
  },
];

// Mock Officers
export const OFFICERS: Officer[] = [
  {
    id: 'off_roads_01',
    name: 'Rajesh Solanki',
    phone: '+91 94260 88712',
    email: 'rajesh.solanki@amc.gov.in',
    departmentId: 'dept_roads',
    ward: 'Navrangpura & Stadium',
    city: 'Ahmedabad',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    activeTasks: 4,
    resolvedMonth: 42,
    accuracyScore: 98.4,
    streak: 19,
    status: 'FIELD',
  },
  {
    id: 'off_waste_01',
    name: 'Kiran Parmar',
    phone: '+91 98791 22345',
    email: 'kiran.parmar@amc.gov.in',
    departmentId: 'dept_solid_waste',
    ward: 'Bodakdev & Vastrapur',
    city: 'Ahmedabad',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    activeTasks: 2,
    resolvedMonth: 78,
    accuracyScore: 99.1,
    streak: 26,
    status: 'ON_DUTY',
  },
  {
    id: 'off_water_01',
    name: 'Hardik Shah',
    phone: '+91 94270 99881',
    email: 'hardik.shah@vmc.gov.in',
    departmentId: 'dept_water_drainage',
    ward: 'Alkapuri & Sayajigunj',
    city: 'Vadodara',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    activeTasks: 3,
    resolvedMonth: 55,
    accuracyScore: 97.2,
    streak: 14,
    status: 'FIELD',
  },
  {
    id: 'off_light_01',
    name: 'K. R. Varma',
    phone: '+91 97245 66789',
    email: 'kr.varma@smc.gov.in',
    departmentId: 'dept_streetlights',
    ward: 'Adajan & Pal',
    city: 'Surat',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    activeTasks: 5,
    resolvedMonth: 38,
    accuracyScore: 92.5,
    streak: 8,
    status: 'ON_DUTY',
  },
];

// Mock Badges
export const CIVIC_BADGES: CivicBadge[] = [
  {
    id: 'eagle_eye',
    title: 'Eagle Eye',
    titleGu: 'તીક્ષ્ણ નજર',
    description: 'First to report an unregistered municipal issue in your ward.',
    descriptionGu: 'તમારા વોર્ડમાં પ્રથમ વખત નવી ફરિયાદ નોંધાવનાર.',
    icon: 'Eye',
    color: '#8B7CF6',
    unlockedAt: '2026-09-12',
    progressPercentage: 100,
  },
  {
    id: 'ward_guardian',
    title: 'Ward Guardian',
    titleGu: 'વોર્ડ રક્ષક',
    description: 'Reported 5 or more verified grievances with 100% genuine score.',
    descriptionGu: '૫ કે તેથી વધુ સાચી ફરિયાદો સફળતાપૂર્વક નોંધાવી.',
    icon: 'ShieldCheck',
    color: '#7ED9B8',
    unlockedAt: '2026-09-28',
    progressPercentage: 100,
  },
  {
    id: 'quick_verifier',
    title: 'Prompt Verifier',
    titleGu: 'ત્વરિત ચકાસણીકાર',
    description: 'Answered IVR confirmation call within 1 ring cycle.',
    descriptionGu: 'IVR કોલનો ત્વરિત ઉત્તર આપી કામગીરી ચકાસી.',
    icon: 'PhoneCall',
    color: '#FFE29A',
    unlockedAt: '2026-10-01',
    progressPercentage: 100,
  },
  {
    id: 'clean_crusader',
    title: 'Cleanliness Crusader',
    titleGu: 'સ્વચ્છતા યોદ્ધા',
    description: 'Participate in 10 solid waste clearances.',
    descriptionGu: '૧૦ કચરા નિકાલમાં સક્રિય સહભાગિતા.',
    icon: 'Sparkles',
    color: '#9CCBFF',
    progressPercentage: 70,
  },
];

// Mock Rewards
export const CIVIC_REWARDS: RewardItem[] = [
  {
    id: 'rew_1',
    title: 'Ahmedabad Metro ₹100 Smart Card Recharge',
    titleGu: 'અમદાવાદ મેટ્રો ₹૧૦૦ સ્માર્ટ કાર્ડ રિચાર્જ',
    costXp: 300,
    category: 'TRANSIT',
    partnerName: 'Gujarat Metro Rail Corp',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'rew_2',
    title: '5% AMC Property Tax Rebate Voucher',
    titleGu: '૫% મિલકત વેરા રિબેટ વાઉચર',
    costXp: 800,
    category: 'TAX_REBATE',
    partnerName: 'Ahmedabad Municipal Corporation',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'rew_3',
    title: '2 Free Medicinal Saplings from AMC Nursery',
    titleGu: 'મ્યુનિસિપલ નર્સરીમાંથી ૨ ઔષધીય રોપાઓ મફત',
    costXp: 150,
    category: 'NURSERY',
    partnerName: 'Parks & Garden Department',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&auto=format&fit=crop&q=80',
  },
];

// Mock Fraud & Integrity Alerts
export const FRAUD_ALERTS: FraudAlert[] = [
  {
    id: 'frd_01',
    complaintId: 'cmp_104',
    ticketNumber: 'TS-2026-0865',
    officerName: 'K. R. Varma',
    departmentName: 'Streetlights & Electricals',
    type: 'REPEATED_REOPEN',
    severity: 'HIGH',
    description: 'Complaint reopened 2 times by citizen via IVR following incomplete resolution claims.',
    detectedAt: '2026-10-03T20:15:00Z',
    status: 'FLAGGED',
  },
  {
    id: 'frd_02',
    complaintId: 'cmp_902',
    ticketNumber: 'TS-2026-0774',
    officerName: 'Suresh Prajapati',
    departmentName: 'Roads & Bridges Department',
    type: 'GEO_FENCE_BREACH',
    severity: 'CRITICAL',
    description: 'Resolution photo attempted from 850m away from complaint pin. System blocked upload.',
    detectedAt: '2026-10-02T16:20:00Z',
    status: 'FLAGGED',
  },
];

// Mock IVR Logs
export const IVR_LOGS: IvrMonitorItem[] = [
  {
    id: 'ivr_01',
    callerPhone: '+91 98250 11234',
    ward: 'Bodakdev (Ward 14)',
    city: 'Ahmedabad',
    duration: '0m 42s',
    language: 'gu',
    status: 'RESOLVED_VOICE',
    timestamp: '2026-10-03T18:00:10Z',
    audioDuration: 42,
    transcriptGu: 'નમસ્તે, વસ્ત્રાપુર ખાતે કચરો સાફ થઈ ગયો છે? જો હા, તો ૧ દબાવો. [નાગરિક: ૧]',
    summaryEn: 'Citizen Bhavik Shah pressed 1 to confirm solid waste cleared at Vastrapur container station.',
    detectedCategory: 'SOLID_WASTE',
  },
  {
    id: 'ivr_02',
    callerPhone: '+91 97230 44991',
    ward: 'Adajan (Ward 10)',
    city: 'Surat',
    duration: '1m 15s',
    language: 'gu',
    status: 'RECORDED_COMPLAINT',
    timestamp: '2026-10-03T20:15:00Z',
    audioDuration: 75,
    transcriptGu: 'લાઈટ હજુ બંધ છે સાહેબ, માત્ર આગળના બે થાંભલા ચાલુ કર્યા છે, પાછળ બધું અંધારું છે. [નાગરિક: ૨]',
    summaryEn: 'Citizen Ananya Mehta pressed 2 to reject resolution. Stated 6 lamps remain non-functional.',
    detectedCategory: 'STREETLIGHTS',
  },
  {
    id: 'ivr_03',
    callerPhone: '+91 98790 99881',
    ward: 'Navrangpura (Ward 12)',
    city: 'Ahmedabad',
    duration: '0m 54s',
    language: 'gu',
    status: 'RECORDED_COMPLAINT',
    timestamp: '2026-10-04T07:20:00Z',
    audioDuration: 54,
    transcriptGu: 'સી.જી. રોડ પર મોટો ખાડો પડ્યો છે, ટુ વ્હીલર પડે તેમ છે.',
    summaryEn: 'Voice report from keypad phone user logged for pothole on CG Road.',
    detectedCategory: 'ROADS_POTHOLES',
  },
];

// Helper: Haversine distance in meters
export function getDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// LocalStorage Persistence Wrapper
class TarkApiService {
  private getStoredComplaints(): Complaint[] {
    const raw = localStorage.getItem('tark_complaints');
    if (!raw) {
      localStorage.setItem('tark_complaints', JSON.stringify(INITIAL_COMPLAINTS));
      return INITIAL_COMPLAINTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_COMPLAINTS;
    }
  }

  private setStoredComplaints(complaints: Complaint[]) {
    localStorage.setItem('tark_complaints', JSON.stringify(complaints));
  }

  async getComplaints(filter?: {
    status?: ComplaintStatus;
    departmentId?: string;
    ward?: string;
    citizenId?: string;
  }): Promise<Complaint[]> {
    await new Promise((r) => setTimeout(r, 150));
    let list = this.getStoredComplaints();
    if (filter?.status) {
      list = list.filter((c) => c.status === filter.status);
    }
    if (filter?.departmentId) {
      list = list.filter((c) => c.departmentId === filter.departmentId);
    }
    if (filter?.citizenId) {
      list = list.filter((c) => c.citizenId === filter.citizenId);
    }
    return list;
  }

  async getComplaintById(id: string): Promise<Complaint | null> {
    await new Promise((r) => setTimeout(r, 100));
    const list = this.getStoredComplaints();
    return list.find((c) => c.id === id) || null;
  }

  async findNearbyDuplicates(
    lat: number,
    lng: number,
    category: Category,
    radiusMeters: number = 500
  ): Promise<Complaint[]> {
    await new Promise((r) => setTimeout(r, 200));
    const list = this.getStoredComplaints();
    return list.filter((c) => {
      if (c.status === 'VERIFIED') return false;
      const dist = getDistanceMeters(lat, lng, c.complaintLocation.lat, c.complaintLocation.lng);
      return dist <= radiusMeters && c.category === category;
    });
  }

  async createComplaint(data: {
    title: string;
    titleGu: string;
    description: string;
    descriptionGu: string;
    category: Category;
    departmentId: string;
    departmentName: string;
    photoBeforeUrl: string;
    location: GPSLocation;
    citizenId: string;
    citizenName: string;
    citizenPhone: string;
  }): Promise<Complaint> {
    await new Promise((r) => setTimeout(r, 300));
    const list = this.getStoredComplaints();
    const newId = `cmp_${Date.now()}`;
    const ticket = `TS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newComplaint: Complaint = {
      id: newId,
      ticketNumber: ticket,
      title: data.title,
      titleGu: data.titleGu,
      description: data.description,
      descriptionGu: data.descriptionGu,
      category: data.category,
      departmentId: data.departmentId,
      departmentName: data.departmentName,
      status: 'PENDING',
      urgency: 'HIGH',
      citizenId: data.citizenId,
      citizenName: data.citizenName,
      citizenPhone: data.citizenPhone,
      submittedAt: new Date().toISOString(),
      photoBeforeUrl: data.photoBeforeUrl,
      complaintLocation: data.location,
      aiClassification: {
        predictedCategory: data.category,
        confidence: 0.98,
        duplicateRiskPercentage: 0,
        detectedObjects: ['visual civic anomaly', 'geo-tagged surface'],
      },
      upvotes: 1,
      hasUpvoted: true,
      comments: [],
      timeline: [
        {
          id: `tl_${Date.now()}`,
          status: 'PENDING',
          title: 'Grievance Registered',
          titleGu: 'ફરિયાદ નોંધાઈ',
          description: 'Logged with camera EXIF coordinates & timestamp.',
          actor: data.citizenName,
          role: 'citizen',
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const updated = [newComplaint, ...list];
    this.setStoredComplaints(updated);
    return newComplaint;
  }

  async upvoteComplaint(id: string, userId: string): Promise<Complaint> {
    await new Promise((r) => setTimeout(r, 100));
    const list = this.getStoredComplaints();
    const updated = list.map((c) => {
      if (c.id === id) {
        const hasVoted = !c.hasUpvoted;
        return {
          ...c,
          hasUpvoted: hasVoted,
          upvotes: hasVoted ? c.upvotes + 1 : Math.max(0, c.upvotes - 1),
        };
      }
      return c;
    });
    this.setStoredComplaints(updated);
    return updated.find((c) => c.id === id)!;
  }

  async addComment(id: string, comment: { userId: string; userName: string; text: string }): Promise<Complaint> {
    await new Promise((r) => setTimeout(r, 100));
    const list = this.getStoredComplaints();
    const updated = list.map((c) => {
      if (c.id === id) {
        const newC = {
          id: `c_${Date.now()}`,
          userId: comment.userId,
          userName: comment.userName,
          userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          text: comment.text,
          timestamp: new Date().toISOString(),
        };
        return { ...c, comments: [...c.comments, newC] };
      }
      return c;
    });
    this.setStoredComplaints(updated);
    return updated.find((c) => c.id === id)!;
  }

  async startWork(complaintId: string, officerId: string, officerName: string): Promise<Complaint> {
    await new Promise((r) => setTimeout(r, 200));
    const list = this.getStoredComplaints();
    const updated = list.map((c) => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: 'IN_PROGRESS' as ComplaintStatus,
          assignedOfficerId: officerId,
          assignedOfficerName: officerName,
          workStartedAt: new Date().toISOString(),
          timeline: [
            ...c.timeline,
            {
              id: `tl_${Date.now()}`,
              status: 'IN_PROGRESS' as ComplaintStatus,
              title: 'Field Officer Started Work',
              titleGu: 'અધિકારીએ કામગીરી શરૂ કરી',
              description: `${officerName} arrived at site and commenced resolution.`,
              actor: officerName,
              role: 'officer' as const,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      }
      return c;
    });
    this.setStoredComplaints(updated);
    return updated.find((c) => c.id === complaintId)!;
  }

  async resolveComplaint(
    complaintId: string,
    data: {
      officerId: string;
      officerName: string;
      photoAfterUrl: string;
      remarks: string;
      resolutionLocation: GPSLocation;
    }
  ): Promise<{ complaint: Complaint; geoFencePassed: boolean; distanceMeters: number }> {
    await new Promise((r) => setTimeout(r, 300));
    const list = this.getStoredComplaints();
    const target = list.find((c) => c.id === complaintId);
    if (!target) throw new Error('Complaint not found');

    const distance = getDistanceMeters(
      target.complaintLocation.lat,
      target.complaintLocation.lng,
      data.resolutionLocation.lat,
      data.resolutionLocation.lng
    );

    const geoFencePassed = distance <= 100;

    const updated = list.map((c) => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: 'RESOLVED' as ComplaintStatus,
          resolvedAt: new Date().toISOString(),
          photoAfterUrl: data.photoAfterUrl,
          resolutionRemarks: data.remarks,
          resolutionLocation: data.resolutionLocation,
          geoFenceDistanceMeters: distance,
          geoFencePassed: geoFencePassed,
          exifValid: true,
          timeline: [
            ...c.timeline,
            {
              id: `tl_${Date.now()}`,
              status: 'RESOLVED' as ComplaintStatus,
              title: 'Proof of Resolution Uploaded',
              titleGu: 'સમારકામનો પુરાવો અપલોડ થયો',
              description: `Photo captured within ${distance}m geo-fence. Awaiting citizen verification.`,
              actor: data.officerName,
              role: 'officer' as const,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      }
      return c;
    });

    this.setStoredComplaints(updated);
    return {
      complaint: updated.find((c) => c.id === complaintId)!,
      geoFencePassed,
      distanceMeters: distance,
    };
  }

  async triggerIvrSimulation(
    complaintId: string,
    outcome: 'VERIFIED_PRESSED_1' | 'REOPENED_PRESSED_2'
  ): Promise<Complaint> {
    await new Promise((r) => setTimeout(r, 400));
    const list = this.getStoredComplaints();
    const target = list.find((c) => c.id === complaintId);
    if (!target) throw new Error('Complaint not found');

    const isVerified = outcome === 'VERIFIED_PRESSED_1';
    const newStatus: ComplaintStatus = isVerified ? 'VERIFIED' : 'REOPENED';

    const updated = list.map((c) => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: newStatus,
          verifiedAt: isVerified ? new Date().toISOString() : undefined,
          reopenedAt: !isVerified ? new Date().toISOString() : undefined,
          reopenReason: !isVerified ? 'Citizen reported on IVR that issue is unresolved.' : undefined,
          verificationCall: {
            id: `call_${Date.now()}`,
            complaintId: c.id,
            citizenPhone: c.citizenPhone,
            status: 'COMPLETED' as const,
            outcome: outcome,
            dialedAt: new Date().toISOString(),
            durationSeconds: isVerified ? 38 : 65,
            transcriptGu: isVerified
              ? 'નમસ્તે, તર્ક શાસ્ત્ર સિસ્ટમમાંથી કોલ છે. ફરિયાદ ઉકેલાઈ ગઈ છે? નાગરિકે ૧ દબાવ્યું.'
              : 'નાગરિકે જણાવ્યું કે સમસ્યા હજુ બાકી છે. ૨ દબાવ્યું.',
            transcriptEn: isVerified
              ? 'Citizen pressed 1: Confirmed issue has been resolved satisfactorily.'
              : 'Citizen pressed 2: Reported issue is incomplete or unsatisfied.',
            sentiment: isVerified ? ('POSITIVE' as const) : ('NEGATIVE' as const),
          },
          timeline: [
            ...c.timeline,
            {
              id: `tl_${Date.now()}`,
              status: newStatus,
              title: isVerified ? 'Citizen Verified via IVR Call' : 'Auto-Reopened by Citizen via IVR',
              titleGu: isVerified ? 'IVR કોલ દ્વારા નાગરિકે માન્ય કર્યું' : 'IVR કોલ દ્વારા ફરી ખોલવામાં આવી',
              description: isVerified
                ? 'Automated feedback call completed successfully.'
                : 'Complaint returned to department work queue with high escalation.',
              actor: 'Twilio IVR Voice Engine',
              role: 'SYSTEM' as const,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      }
      return c;
    });

    this.setStoredComplaints(updated);
    return updated.find((c) => c.id === complaintId)!;
  }

  async reopenComplaint(complaintId: string, reason: string): Promise<Complaint> {
    await new Promise((r) => setTimeout(r, 200));
    const list = this.getStoredComplaints();
    const updated = list.map((c) => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: 'REOPENED' as ComplaintStatus,
          reopenedAt: new Date().toISOString(),
          reopenReason: reason,
          timeline: [
            ...c.timeline,
            {
              id: `tl_${Date.now()}`,
              status: 'REOPENED' as ComplaintStatus,
              title: 'Complaint Reopened by Citizen',
              titleGu: 'નાગરિક દ્વારા ફરી ખોલવામાં આવી',
              description: `Reason: ${reason}`,
              actor: c.citizenName,
              role: 'citizen' as const,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      }
      return c;
    });
    this.setStoredComplaints(updated);
    return updated.find((c) => c.id === complaintId)!;
  }

  async getDepartments(): Promise<Department[]> {
    return DEPARTMENTS;
  }

  async getOfficers(): Promise<Officer[]> {
    return OFFICERS;
  }

  async getFraudAlerts(): Promise<FraudAlert[]> {
    return FRAUD_ALERTS;
  }

  async getIvrLogs(): Promise<IvrMonitorItem[]> {
    return IVR_LOGS;
  }

  async addOfficer(data: Omit<Officer, 'id' | 'activeTasks' | 'resolvedMonth' | 'accuracyScore' | 'streak' | 'status'>): Promise<Officer> {
    await new Promise((r) => setTimeout(r, 200));
    const newOff: Officer = {
      ...data,
      id: `off_${Date.now()}`,
      activeTasks: 0,
      resolvedMonth: 0,
      accuracyScore: 100,
      streak: 1,
      status: 'ON_DUTY',
    };
    OFFICERS.push(newOff);
    return newOff;
  }
}

export const api = new TarkApiService();

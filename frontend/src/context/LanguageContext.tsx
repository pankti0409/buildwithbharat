import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'gu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // App & Navigation
    'app.title': 'Tark Shaastra',
    'app.subtitle': 'AI Municipal Grievance Verifier',
    'nav.home': 'Home',
    'nav.report': 'Report Issue',
    'nav.myComplaints': 'My Complaints',
    'nav.communityMap': 'Live Map',
    'nav.rewards': 'Rewards & XP',
    'nav.help': 'Voice Helpline',
    'nav.login': 'Sign In',
    'nav.logout': 'Sign Out',
    'nav.dashboard': 'Dashboard',
    'nav.queue': 'Work Queue',
    'nav.performance': 'Performance',
    'nav.admin': 'Admin Center',
    'nav.switchRole': 'Quick Role Switcher',

    // Landing Page
    'hero.badge': 'AI-Powered Proof-of-Resolution System',
    'hero.title': 'Every civic issue resolved.',
    'hero.titleHighlight': 'Mathematically verified.',
    'hero.subtitle': 'Tark Shaastra turns municipal grievances into accountable action with GPS geo-fenced proof, instant AI duplicate detection, and automated citizen IVR feedback calls.',
    'hero.ctaReport': 'Report Civic Grievance',
    'hero.ctaExplore': 'Explore Live Map',
    'hero.callBanner': 'Dial toll-free 1800-TARK-78 (1800 8275 78) from any keypad phone',
    'stats.resolved': 'Grievances Resolved',
    'stats.avgTime': 'Avg Resolution SLA',
    'stats.citizenSat': 'Citizen Satisfaction',
    'stats.ivrCalls': 'IVR Feedback Calls',

    // How it works
    'how.title': 'The 4-Step Logic of Verification',
    'how.step1.title': '1. Geo-Locked Capture',
    'how.step1.desc': 'Citizens snap the issue using GPS camera. Coordinates, compass heading & timestamp are hardcoded into the report.',
    'how.step2.title': '2. AI Classification & Deduplication',
    'how.step2.desc': 'Our vision model categorizes the department in 300ms and flags identical issues within 500m to prevent duplicate queues.',
    'how.step3.title': '3. Geo-Fenced Proof of Work',
    'how.step3.desc': 'Officers must be within 100 meters of the original pin to upload the resolution photo with verified EXIF timestamps.',
    'how.step4.title': '4. Automated Citizen IVR Verification',
    'how.step4.desc': 'Twilio IVR automatically dials the citizen in Gujarati/English. Press 1 to confirm resolution, or 2 to auto-reopen.',

    // Categories
    'cat.ROADS_POTHOLES': 'Roads & Potholes',
    'cat.SOLID_WASTE': 'Garbage & Waste',
    'cat.WATER_DRAINAGE': 'Water Supply & Sewage',
    'cat.STREETLIGHTS': 'Streetlights & Poles',
    'cat.PUBLIC_HEALTH': 'Public Health & Fogging',
    'cat.ENCROACHMENT': 'Illegal Encroachment',
    'cat.PARKS_TREES': 'Parks & Fallen Trees',

    // Statuses
    'status.PENDING': 'Pending Allocation',
    'status.IN_PROGRESS': 'In Progress',
    'status.RESOLVED': 'Resolved (Awaiting Verification)',
    'status.VERIFIED': 'Citizen Verified',
    'status.REOPENED': 'Reopened by Citizen',

    // Actions & Buttons
    'action.submit': 'Submit Grievance',
    'action.cancel': 'Cancel',
    'action.startWork': 'Start Work',
    'action.resolve': 'Submit Proof & Resolve',
    'action.upvote': 'Upvote Issue',
    'action.reopen': 'Reopen Complaint',
    'action.viewDetails': 'View Details',
    'action.exportCsv': 'Export CSV',
    'action.capturePhoto': 'Capture GPS Photo',
  },
  gu: {
    // App & Navigation
    'app.title': 'તર્ક શાસ્ત્ર',
    'app.subtitle': 'AI મ્યુનિસિપલ ફરિયાદ ચકાસણી સિસ્ટમ',
    'nav.home': 'મુખ્ય પૃષ્ઠ',
    'nav.report': 'ફરિયાદ નોંધાવો',
    'nav.myComplaints': 'મારી ફરિયાદો',
    'nav.communityMap': 'લાઈવ નકશો',
    'nav.rewards': 'ઇનામો અને XP',
    'nav.help': 'વોઇસ હેલ્પલાઇન',
    'nav.login': 'પ્રવેશ કરો',
    'nav.logout': 'બહાર નીકળો',
    'nav.dashboard': 'ડેશબોર્ડ',
    'nav.queue': 'કામની યાદી',
    'nav.performance': 'કામગીરી',
    'nav.admin': 'એડમિન કંટ્રોલ',
    'nav.switchRole': 'રોલ બદલો',

    // Landing Page
    'hero.badge': 'AI-આધારિત ઉકેલ ચકાસણી પદ્ધતિ',
    'hero.title': 'દરેક નાગરિક ફરિયાદનો ઉકેલ.',
    'hero.titleHighlight': 'ગણિતિક રીતે ચકાસાયેલ.',
    'hero.subtitle': 'તર્ક શાસ્ત્ર GPS જીઓ-ફેન્સ્ડ પુરાવા, AI ડુપ્લિકેટ શોધ અને સ્વચાલિત IVR કોલિંગ દ્વારા મ્યુનિસિપલ ફરિયાદોનું પારદર્શક નિરાકરણ લાવે છે.',
    'hero.ctaReport': 'ફરિયાદ નોંધાવો',
    'hero.ctaExplore': 'લાઈવ નકશો જુઓ',
    'hero.callBanner': 'કોઈપણ કીપેડ ફોન પરથી ૧૮૦૦-તર્ક-૭૮ (1800 8275 78) પર કોલ કરો',
    'stats.resolved': 'ઉકેલાયેલી ફરિયાદો',
    'stats.avgTime': 'સરેરાશ ઉકેલ સમય',
    'stats.citizenSat': 'નાગરિક સંતોષ',
    'stats.ivrCalls': 'IVR ચકાસણી કોલ્સ',

    // How it works
    'how.title': 'ચકાસણીના ૪ મુખ્ય તબક્કા',
    'how.step1.title': '૧. જીઓ-લોક્ડ ફોટો કેપ્ચર',
    'how.step1.desc': 'નાગરિક GPS કેમેરા વડે ફોટો પાડે છે. અક્ષાંશ-રેખાંશ અને સમય આપોઆપ રિપોર્ટમાં લોક થાય છે.',
    'how.step2.title': '૨. AI વર્ગીકરણ અને ડુપ્લિકેટ રોકથામ',
    'how.step2.desc': 'વિઝન મોડેલ ૩૦૦ મિલીસેકન્ડમાં વિભાગ ઓળખે છે અને ૫૦૦ મીટરમાં સમાન ફરિયાદો શોધીને કતાર બચાવે છે.',
    'how.step3.title': '૩. ૧૦૦ મીટર જીઓ-ફેન્સ્ડ કામગીરી પુરાવો',
    'how.step3.desc': 'અધિકારીએ મૂળ સ્થળના ૧૦૦ મીટરના દાયરામાં રહીને જ સમારકામનો ફોટો અપલોડ કરવો ફરજિયાત છે.',
    'how.step4.title': '૪. સ્વચાલિત ગુજરાતી IVR કોલિંગ',
    'how.step4.desc': 'સિસ્ટમ નાગરિકને આપમેળે ફોન કરે છે. ઉકેલ માન્ય કરવા ૧ દબાવો, ફરી ખોલવા ૨ દબાવો.',

    // Categories
    'cat.ROADS_POTHOLES': 'રસ્તા અને ખાડા',
    'cat.SOLID_WASTE': 'કચરો અને સફાઈ',
    'cat.WATER_DRAINAGE': 'પાણી અને ગટર વ્યવસ્થા',
    'cat.STREETLIGHTS': 'શેરી બત્તીઓ (સ્ટ્રીટલાઇટ)',
    'cat.PUBLIC_HEALTH': 'જાહેર આરોગ્ય અને દવાનો છંટકાવ',
    'cat.ENCROACHMENT': 'ગેરકાયદે દબાણ',
    'cat.PARKS_TREES': 'બગીચા અને પડેલા વૃક્ષો',

    // Statuses
    'status.PENDING': 'ફાળવણી બાકી',
    'status.IN_PROGRESS': 'કામ ચાલુ છે',
    'status.RESOLVED': 'ઉકેલાયેલ (ચકાસણી બાકી)',
    'status.VERIFIED': 'નાગરિક દ્વારા માન્ય',
    'status.REOPENED': 'ફરી ખોલવામાં આવેલ',

    // Actions & Buttons
    'action.submit': 'ફરિયાદ સબમિટ કરો',
    'action.cancel': 'રદ કરો',
    'action.startWork': 'કામ શરૂ કરો',
    'action.resolve': 'પુરાવો સબમિટ કરી પૂર્ણ કરો',
    'action.upvote': 'સમર્થન આપો',
    'action.reopen': 'ફરિયાદ પુનઃ ખોલો',
    'action.viewDetails': 'વિગતો જુઓ',
    'action.exportCsv': 'CSV ડાઉનલોડ કરો',
    'action.capturePhoto': 'GPS ફોટો લો',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('tark_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('tark_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

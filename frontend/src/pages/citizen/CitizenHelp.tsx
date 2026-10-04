import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { IvrSimulator } from '../../components/common/IvrSimulator';
import { 
  PhoneCall, 
  HelpCircle, 
  Volume2, 
  CheckCircle2, 
  Bell, 
  Globe, 
  Sparkles,
  Info
} from 'lucide-react';

export const CitizenHelp: React.FC = () => {
  const { t, language } = useTranslation();

  const mockNotifications = [
    {
      id: 'n1',
      title: 'Road Repair Completed on CG Road',
      time: '10 mins ago',
      desc: 'Officer Rajesh Solanki uploaded verified proof photo. Stand by for IVR verification call.',
      unread: true,
    },
    {
      id: 'n2',
      title: 'You Earned +15 XP for Upvoting',
      time: '2 hours ago',
      desc: 'Your community vote helped prioritize the open sewer chamber on Science City Road.',
      unread: false,
    },
    {
      id: 'n3',
      title: 'Garbage Collection Container Cleared',
      time: 'Yesterday',
      desc: 'Ticket TS-2026-0887 confirmed verified by citizen IVR response.',
      unread: false,
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Voice Hotline & Notifications</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Toll-free telephone guidance in Gujarati and notification history
        </p>
      </div>

      {/* 1. Toll Free IVR Call Simulator */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <span>Interactive Twilio IVR Demonstration</span>
        </h2>
        <IvrSimulator
          complaintTitle="Severe Pothole Cluster on CG Road"
          ticketNumber="TS-2026-0891"
          citizenPhone="+91 98795 43210"
          onCallCompleted={(outcome) => {
            console.log('IVR Call outcome:', outcome);
          }}
        />
      </div>

      {/* 2. Hotline Instructions in Gujarati and English */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Gujarati Card */}
        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <Globe className="w-4 h-4 text-slate-500" />
            <span className="font-gujarati">ગુજરાતી માર્ગદર્શિકા (કીપેડ ફોન માટે)</span>
          </div>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-gujarati leading-relaxed">
            <p>૧. કોઈપણ સાદા કે કીપેડ ફોન પરથી <b>૧૮૦૦-તર્ક-૭૮ (1800 8275 78)</b> ડાયલ કરો.</p>
            <p>૨. તમારી ફરિયાદ બોલીને જણાવો (જેમ કે: "મારા વિસ્તારમાં સ્ટ્રીટલાઇટ બંધ છે").</p>
            <p>૩. સમારકામ પૂર્ણ થતાં અમારા તરફથી આપોઆપ ફોન આવશે.</p>
            <p>૪. જો કામ બરાબર થઈ ગયું હોય તો <b>૧ દબાવો</b>, જો કામ બાકી હોય તો <b>૨ દબાવો</b>.</p>
          </div>
        </Card>

        {/* English Card */}
        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <Info className="w-4 h-4 text-slate-500" />
            <span>English Guide (Feature Phones)</span>
          </div>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>1. Dial toll-free <b>1800-TARK-78 (1800 8275 78)</b> from any telephone.</p>
            <p>2. Speak naturally in English or Hindi to register your grievance.</p>
            <p>3. Once the field team uploads proof, our IVR system dials you back.</p>
            <p>4. Press <b>[1]</b> on your dialpad to verify closure, or <b>[2]</b> to auto-reopen.</p>
          </div>
        </Card>
      </div>

      {/* 3. Live Notification Feed */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <span>Real-time Civic Alerts</span>
        </h2>

        <div className="space-y-2.5">
          {mockNotifications.map((notif) => (
            <Card
              key={notif.id}
              className={`p-4 bg-white dark:bg-slate-900 border flex items-start gap-3.5 shadow-xs ${
                notif.unread ? 'border-slate-400 dark:border-slate-600' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                notif.unread ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{notif.title}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{notif.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{notif.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

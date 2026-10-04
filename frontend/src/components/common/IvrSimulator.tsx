import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, PhoneForwarded, PhoneOff, Volume2, CheckCircle2, RotateCcw, Play, Pause } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { useTranslation } from '../../context/LanguageContext';

interface IvrSimulatorProps {
  complaintTitle: string;
  ticketNumber: string;
  citizenPhone: string;
  onCallCompleted: (outcome: 'VERIFIED_PRESSED_1' | 'REOPENED_PRESSED_2') => void;
  className?: string;
}

export const IvrSimulator: React.FC<IvrSimulatorProps> = ({
  complaintTitle,
  ticketNumber,
  citizenPhone,
  onCallCompleted,
  className = '',
}) => {
  const { language } = useTranslation();
  const [callState, setCallState] = useState<'IDLE' | 'DIALING' | 'RINGING' | 'CONNECTED' | 'COMPLETED'>('IDLE');
  const [seconds, setSeconds] = useState(0);
  const [pressedKey, setPressedKey] = useState<1 | 2 | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'CONNECTED') {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  const startOutboundCall = () => {
    setCallState('DIALING');
    setSeconds(0);
    setPressedKey(null);

    setTimeout(() => {
      setCallState('RINGING');
    }, 1500);

    setTimeout(() => {
      setCallState('CONNECTED');
      setIsPlayingAudio(true);
    }, 3500);
  };

  const handleKeyPress = (digit: 1 | 2) => {
    setPressedKey(digit);
    setIsPlayingAudio(false);
    setTimeout(() => {
      setCallState('COMPLETED');
      const outcome = digit === 1 ? 'VERIFIED_PRESSED_1' : 'REOPENED_PRESSED_2';
      onCallCompleted(outcome);
    }, 1200);
  };

  return (
    <Card className={`border-lavender/40 shadow-soft-lg overflow-hidden ${className}`}>
      {/* Phone Call Simulator Banner */}
      <div className="bg-gradient-to-r from-ink via-slate-900 to-indigo-950 p-6 text-white rounded-2xl relative overflow-hidden">
        {/* Background glow & waveform */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-lavender/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs uppercase tracking-widest font-mono text-lavender-light">
              Twilio Cloud IVR Engine • 1800-TARK
            </span>
          </div>
          <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded-full text-zinc-300">
            {ticketNumber}
          </span>
        </div>

        <div className="mt-6 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center mb-3">
            {callState === 'IDLE' && <Phone className="w-7 h-7 text-white" />}
            {callState === 'DIALING' && <PhoneForwarded className="w-7 h-7 text-sky animate-pulse" />}
            {callState === 'RINGING' && <PhoneCall className="w-7 h-7 text-butter animate-bounce" />}
            {callState === 'CONNECTED' && <Volume2 className="w-7 h-7 text-emerald-400 animate-pulse" />}
            {callState === 'COMPLETED' && <CheckCircle2 className="w-7 h-7 text-lavender-light" />}
          </div>

          <h4 className="text-xl font-bold text-white tracking-tight">{citizenPhone}</h4>
          <p className="text-xs text-zinc-400 mt-1">
            {callState === 'IDLE' && 'Ready to trigger automated verification call'}
            {callState === 'DIALING' && 'Connecting to Gujarat telecom gateway...'}
            {callState === 'RINGING' && 'Citizen phone is ringing...'}
            {callState === 'CONNECTED' && `Active Call (${seconds}s) • Speaking in ગુજરાતી / English`}
            {callState === 'COMPLETED' && 'Verification Call Recorded & Telemetry Logged'}
          </p>
        </div>

        {/* Live Interactive IVR Prompts */}
        {callState === 'CONNECTED' && (
          <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-left text-xs space-y-3">
            <div className="flex items-start gap-2 text-lavender-light">
              <Volume2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">IVR Audio Prompt (ગુજરાતી / English):</p>
                <p className="text-zinc-200 mt-1 italic font-gujarati text-sm">
                  "નમસ્તે! તર્ક શાસ્ત્ર મ્યુનિસિપલ સિસ્ટમમાંથી કોલ છે. તમારી ફરિયાદ <b>{complaintTitle}</b> નું કામ પૂર્ણ થયું છે? જો હા, તો કીપેડ પર ૧ દબાવો. જો હજુ કામ બાકી હોય, તો ૨ દબાવો."
                </p>
              </div>
            </div>

            {/* Dialpad Simulated Keypress Options */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Button
                variant="mint"
                size="sm"
                onClick={() => handleKeyPress(1)}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
                className="flex-1 text-xs"
              >
                Press [1] : Confirm Verified (+50 XP)
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleKeyPress(2)}
                leftIcon={<RotateCcw className="w-4 h-4" />}
                className="flex-1 text-xs bg-rose-500 text-white hover:bg-rose-600"
              >
                Press [2] : Reopen Issue
              </Button>
            </div>
          </div>
        )}

        {/* Idle Trigger Action */}
        {callState === 'IDLE' && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="mint"
              size="lg"
              onClick={startOutboundCall}
              leftIcon={<PhoneCall className="w-5 h-5" />}
              className="shadow-glow-mint"
            >
              Simulate Live IVR Outbound Call
            </Button>
          </div>
        )}

        {callState === 'COMPLETED' && (
          <div className="mt-6 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-center text-xs">
            Outcome: {pressedKey === 1 ? '✓ Citizen Confirmed (Verified)' : '⚠ Citizen Rejected (Reopened)'}
          </div>
        )}
      </div>
    </Card>
  );
};

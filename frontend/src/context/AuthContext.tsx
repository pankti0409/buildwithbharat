import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  role: Role;
  login: (role: Role, customUser?: Partial<User>) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
  updateUserXp: (additionalXp: number) => void;
  updateUser: (updatedData: Partial<User>) => void;
}

const DEMO_USERS: Record<Role, User> = {
  citizen: {
    id: 'usr_citizen_01',
    name: 'Aarav Patel',
    phone: '+91 98795 43210',
    email: 'aarav.patel@gujarat.in',
    role: 'citizen',
    ward: 'Navrangpura (Ward 12)',
    city: 'Ahmedabad',
    language: 'en',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    xp: 420,
    level: 3,
    streak: 6,
    badges: ['eagle_eye', 'ward_guardian', 'quick_verifier'],
  },
  officer: {
    id: 'off_roads_01',
    name: 'Rajesh Solanki',
    phone: '+91 94260 88712',
    email: 'rajesh.solanki@amc.gov.in',
    role: 'officer',
    ward: 'Navrangpura & Stadium',
    city: 'Ahmedabad',
    language: 'gu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    xp: 1850,
    level: 7,
    streak: 19,
    badges: ['zero_backlog', 'geo_master', 'speed_demon'],
  },
  admin: {
    id: 'adm_commissioner_01',
    name: 'Commissioner S. Mehta (IAS)',
    phone: '+91 79265 89000',
    email: 'commissioner@amc.gov.in',
    role: 'admin',
    ward: 'All Wards (Central Command)',
    city: 'Ahmedabad & Gujarat Municipal Grid',
    language: 'en',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    xp: 5400,
    level: 15,
    streak: 45,
    badges: ['chief_auditor', 'civic_architect'],
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>(() => {
    return (localStorage.getItem('tark_active_role') as Role) || 'citizen';
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('tark_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        // fallback
      }
    }
    return DEMO_USERS['citizen'];
  });

  const switchRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem('tark_active_role', newRole);
    const demoUser = DEMO_USERS[newRole];
    setUser(demoUser);
    localStorage.setItem('tark_user', JSON.stringify(demoUser));
  };

  const login = (newRole: Role, customUser?: Partial<User>) => {
    setRoleState(newRole);
    localStorage.setItem('tark_active_role', newRole);
    const baseUser = DEMO_USERS[newRole];
    const finalUser = customUser ? { ...baseUser, ...customUser } : baseUser;
    setUser(finalUser);
    localStorage.setItem('tark_user', JSON.stringify(finalUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tark_user');
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (!user) return;
    const updated = {
      ...user,
      ...updatedData,
    };
    setUser(updated);
    localStorage.setItem('tark_user', JSON.stringify(updated));
  };

  const updateUserXp = (additionalXp: number) => {
    if (!user) return;
    const updated = {
      ...user,
      xp: user.xp + additionalXp,
      level: Math.floor((user.xp + additionalXp) / 150) + 1,
    };
    setUser(updated);
    localStorage.setItem('tark_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, switchRole, updateUserXp, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

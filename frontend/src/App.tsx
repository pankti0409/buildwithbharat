import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';

// Citizen Portal
import { CitizenLayout } from './pages/citizen/CitizenLayout';
import { CitizenHome } from './pages/citizen/CitizenHome';
import { CitizenReport } from './pages/citizen/CitizenReport';
import { CitizenMyComplaints } from './pages/citizen/CitizenMyComplaints';
import { CitizenCommunityMap } from './pages/citizen/CitizenCommunityMap';
import { CitizenRewards } from './pages/citizen/CitizenRewards';
import { CitizenHelp } from './pages/citizen/CitizenHelp';

// Department Portal
import { DepartmentLayout } from './pages/department/DepartmentLayout';
import { DepartmentDashboard } from './pages/department/DepartmentDashboard';
import { DepartmentQueue } from './pages/department/DepartmentQueue';
import { DepartmentPerformance } from './pages/department/DepartmentPerformance';

// Admin Portal
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminComplaintsTable } from './pages/admin/AdminComplaintsTable';
import { AdminDepartmentRanking } from './pages/admin/AdminDepartmentRanking';
import { AdminHeatmap } from './pages/admin/AdminHeatmap';
import { AdminFraudIntegrity } from './pages/admin/AdminFraudIntegrity';
import { AdminOfficerManagement } from './pages/admin/AdminOfficerManagement';
import { AdminIvrMonitor } from './pages/admin/AdminIvrMonitor';

// Legal & Policy
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col bg-canvas dark:bg-canvas-dark text-ink dark:text-white transition-colors duration-200">
                <Navbar />
                <div className="flex-1">
                  <Routes>
                    {/* Landing, Auth & Policies */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsPage />} />

                    {/* Citizen Portal */}
                    <Route path="/citizen" element={<CitizenLayout />}>
                      <Route index element={<CitizenHome />} />
                      <Route path="report" element={<CitizenReport />} />
                      <Route path="complaints" element={<CitizenMyComplaints />} />
                      <Route path="map" element={<CitizenCommunityMap />} />
                      <Route path="rewards" element={<CitizenRewards />} />
                      <Route path="help" element={<CitizenHelp />} />
                    </Route>

                    {/* Department Officer Portal */}
                    <Route path="/department" element={<DepartmentLayout />}>
                      <Route index element={<DepartmentDashboard />} />
                      <Route path="queue" element={<DepartmentQueue />} />
                      <Route path="performance" element={<DepartmentPerformance />} />
                    </Route>

                    {/* Municipal Admin Portal */}
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="complaints" element={<AdminComplaintsTable />} />
                      <Route path="departments" element={<AdminDepartmentRanking />} />
                      <Route path="heatmap" element={<AdminHeatmap />} />
                      <Route path="fraud" element={<AdminFraudIntegrity />} />
                      <Route path="officers" element={<AdminOfficerManagement />} />
                      <Route path="ivr" element={<AdminIvrMonitor />} />
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

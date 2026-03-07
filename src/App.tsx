import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import FarmSetup from './pages/FarmSetup';
import Dashboard from './pages/Dashboard';
import ChatBot from './components/ChatBot';

function AppContent() {
  const { user, farmer, loading: authLoading } = useAuth();
  const [hasFarm, setHasFarm] = useState<boolean | null>(null);
  const [showLanding, setShowLanding] = useState(true);
  const [showChatFromLanding, setShowChatFromLanding] = useState(false);

  useEffect(() => {
    if (user) {
      checkFarmProfile();
    }
  }, [user]);

  async function checkFarmProfile() {
    try {
      const { data, error } = await supabase
        .from('farms')
        .select('id')
        .eq('farmer_id', user?.id)
        .maybeSingle();

      if (error) throw error;
      setHasFarm(!!data);
    } catch (error) {
      console.error('Error checking farm profile:', error);
      setHasFarm(false);
    }
  }

  if (authLoading || (user && hasFarm === null)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (showLanding) {
      return (
        <>
          <LandingPage
            onGetStarted={() => setShowLanding(false)}
            onChatWithAI={() => setShowChatFromLanding(true)}
          />
          {showChatFromLanding && (
            <ChatBot onClose={() => setShowChatFromLanding(false)} />
          )}
        </>
      );
    }
    return <AuthPage />;
  }

  if (!hasFarm) {
    return <FarmSetup onComplete={() => setHasFarm(true)} />;
  }

  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

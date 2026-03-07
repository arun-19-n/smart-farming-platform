import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Farm } from '../lib/supabase';
import {
  LayoutDashboard,
  Cloud,
  Sprout,
  TrendingUp,
  DollarSign,
  BarChart3,
  MessageSquare,
  Bug,
  Bell,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import WeatherDashboard from '../components/dashboard/WeatherDashboard';
import CropRecommendation from '../components/dashboard/CropRecommendation';
import YieldPrediction from '../components/dashboard/YieldPrediction';
import FinancialAnalytics from '../components/dashboard/FinancialAnalytics';
import MarketPrices from '../components/dashboard/MarketPrices';
import DiseaseDetection from '../components/dashboard/DiseaseDetection';
import AdminPanel from '../components/dashboard/AdminPanel';
import ChatBot from '../components/ChatBot';

type Tab = 'overview' | 'weather' | 'crops' | 'yield' | 'finance' | 'market' | 'disease' | 'admin';

export default function Dashboard() {
  const { user, farmer, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [farm, setFarm] = useState<Farm | null>(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFarm();
    }
  }, [user]);

  async function fetchFarm() {
    try {
      const { data, error } = await supabase
        .from('farms')
        .select('*')
        .eq('farmer_id', user?.id)
        .maybeSingle();

      if (error) throw error;
      setFarm(data);
    } catch (error) {
      console.error('Error fetching farm:', error);
    } finally {
      setLoading(false);
    }
  }

  const navigation = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'weather', name: 'Weather', icon: Cloud },
    { id: 'crops', name: 'Crop Recommendation', icon: Sprout },
    { id: 'yield', name: 'Yield Prediction', icon: TrendingUp },
    { id: 'finance', name: 'Financial Analytics', icon: DollarSign },
    { id: 'market', name: 'Market Prices', icon: BarChart3 },
    { id: 'disease', name: 'Disease Detection', icon: Bug },
    ...(farmer?.role === 'admin' ? [{ id: 'admin', name: 'Admin Panel', icon: Users }] : []),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your farm data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SmartFarm AI</h1>
                <p className="text-xs text-gray-500">{farm?.farm_name || 'No Farm'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={signOut}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </aside>

          <main className="flex-1">
            {activeTab === 'overview' && <DashboardOverview farm={farm} />}
            {activeTab === 'weather' && <WeatherDashboard farm={farm} />}
            {activeTab === 'crops' && <CropRecommendation farm={farm} />}
            {activeTab === 'yield' && <YieldPrediction farm={farm} />}
            {activeTab === 'finance' && <FinancialAnalytics farm={farm} />}
            {activeTab === 'market' && <MarketPrices farm={farm} />}
            {activeTab === 'disease' && <DiseaseDetection farm={farm} />}
            {activeTab === 'admin' && farmer?.role === 'admin' && <AdminPanel />}
          </main>
        </div>
      </div>

      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {showChat && <ChatBot onClose={() => setShowChat(false)} />}
    </div>
  );
}

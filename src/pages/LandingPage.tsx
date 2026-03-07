import { Sprout, Cloud, TrendingUp, DollarSign, MessageSquare, Bug } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onChatWithAI: () => void;
}

export default function LandingPage({ onGetStarted, onChatWithAI }: LandingPageProps) {
  const features = [
    {
      icon: Sprout,
      title: 'Crop Recommendation',
      description: 'Get AI-powered crop suggestions based on your soil, weather, and market demand',
    },
    {
      icon: Cloud,
      title: 'Weather Forecast',
      description: 'Access accurate 7-day weather forecasts to plan your farming activities',
    },
    {
      icon: TrendingUp,
      title: 'Yield Prediction',
      description: 'Predict your harvest yield using machine learning and historical data',
    },
    {
      icon: DollarSign,
      title: 'Profit Analytics',
      description: 'Track expenses, revenue, and optimize your farm profitability',
    },
    {
      icon: MessageSquare,
      title: 'AI Chat Assistant',
      description: 'Get instant answers to farming questions from our AI advisor',
    },
    {
      icon: Bug,
      title: 'Disease Detection',
      description: 'Upload crop images to detect diseases and get treatment recommendations',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">SmartFarm AI</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Smart Farming Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Optimize crop selection, soil health, and yield using AI insights.
            Make data-driven decisions to maximize your farm's profitability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              Start Farm Analysis
            </button>
            <button
              onClick={onChatWithAI}
              className="px-8 py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Talk to AI Advisor
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-green-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-lg mb-6 text-green-100">
            Join thousands of farmers who are using AI to increase their yields and profits
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>SmartFarm AI - Empowering Farmers with Technology</p>
        </div>
      </footer>
    </div>
  );
}

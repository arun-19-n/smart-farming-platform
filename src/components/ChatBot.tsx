import { useState } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  onClose: () => void;
}

export default function ChatBot({ onClose }: Props) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am your AI farming assistant. I can help you with crop selection, disease management, fertilizers, irrigation, and general farming advice. How can I assist you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages([...messages, { role: 'user', content: userMessage }]);
    setLoading(true);

    const response = await generateResponse(userMessage);

    setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);

    if (user) {
      await supabase.from('chatbot_queries').insert({
        farmer_id: user.id,
        query: userMessage,
        response: response,
        category: 'general',
      });
    }
  }

  async function generateResponse(query: string): Promise<string> {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('wheat') || lowerQuery.includes('crop') || lowerQuery.includes('grow')) {
      return 'For wheat cultivation, I recommend: 1) Loamy or clay soil with good drainage. 2) Sow in October-November for Rabi season. 3) Apply balanced NPK fertilizer (120:60:40 kg/ha). 4) Maintain 5-6 irrigations throughout the season. 5) Expected yield: 18-25 quintals per acre with proper care. Would you like specific advice on any aspect?';
    }

    if (lowerQuery.includes('disease') || lowerQuery.includes('pest') || lowerQuery.includes('insect')) {
      return 'Common crop diseases include leaf blight, powdery mildew, and aphid infestations. To prevent diseases: 1) Use disease-resistant varieties. 2) Maintain proper plant spacing for air circulation. 3) Avoid overhead irrigation. 4) Apply fungicides preventively. 5) Remove infected plants immediately. Upload a crop image to our Disease Detection feature for accurate identification!';
    }

    if (lowerQuery.includes('fertilizer') || lowerQuery.includes('nutrient')) {
      return 'Proper fertilization is key to good yields: 1) Get your soil tested first. 2) For cereals: Apply N:P:K in ratio 4:2:1. 3) Apply basal dose at sowing, then top dress nitrogen in 2-3 splits. 4) Use organic compost to improve soil health. 5) Consider micro-nutrients like zinc and iron if deficiency symptoms appear. What crop are you growing?';
    }

    if (lowerQuery.includes('irrigation') || lowerQuery.includes('water')) {
      return 'Efficient water management improves yields: 1) Water in early morning or evening to reduce evaporation. 2) Drip irrigation can save 30-60% water. 3) Monitor soil moisture before irrigating. 4) Critical stages for irrigation: germination, flowering, and grain filling. 5) Avoid water logging. Check our Weather Dashboard for irrigation scheduling!';
    }

    if (lowerQuery.includes('price') || lowerQuery.includes('market') || lowerQuery.includes('sell')) {
      return 'For market information: 1) Check our Market Prices section for latest mandi rates. 2) Prices are highest just after season starts. 3) Consider crops with better profit margins like mustard, cotton. 4) Store produce properly to sell at better prices. 5) Connect with buyer networks for assured prices. Would you like current prices for any crop?';
    }

    if (lowerQuery.includes('soil') || lowerQuery.includes('land')) {
      return 'Understanding your soil is crucial: 1) Get soil testing done every 2-3 years. 2) Loamy soil is ideal for most crops. 3) Add organic matter to improve soil structure. 4) Maintain pH between 6-7.5 for most crops. 5) Practice crop rotation to maintain soil health. 6) Use green manuring to add nutrients naturally. What is your soil type?';
    }

    return 'Thank you for your question! I can help you with: crop selection and recommendations, disease identification and treatment, fertilizer application, irrigation scheduling, market prices, soil management, and general farming practices. Please feel free to ask anything specific about farming!';
  }

  return (
    <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50">
      <div className="bg-green-600 text-white p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6" />
          <div>
            <h3 className="font-semibold">AI Farming Assistant</h3>
            <p className="text-xs text-green-100">Always here to help</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-green-700 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.role === 'assistant' && (
                <Bot className="h-4 w-4 inline mr-1 text-green-600" />
              )}
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about crops, diseases, fertilizers..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

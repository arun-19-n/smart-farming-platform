import { useState, useEffect } from 'react';
import { Farm, Expense, Payment } from '../../lib/supabase';
import { DollarSign, TrendingUp, TrendingDown, Plus, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  farm: Farm | null;
}

export default function FinancialAnalytics({ farm }: Props) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'expenses' | 'revenue'>('overview');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showRevenueForm, setShowRevenueForm] = useState(false);

  const [expenseForm, setExpenseForm] = useState({
    category: 'Seeds',
    amount: '',
    description: '',
    cropRelated: '',
  });

  const [revenueForm, setRevenueForm] = useState({
    cropSold: '',
    quantity: '',
    buyerName: '',
    amountReceived: '',
    pendingAmount: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (farm) {
      fetchFinancialData();
    }
  }, [farm]);

  async function fetchFinancialData() {
    if (!farm) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const token = localStorage.getItem('auth_token');

      if (!token) return;

      const [expensesRes, paymentsRes] = await Promise.all([
        fetch(`${apiUrl}/expenses/farm/${farm.id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${apiUrl}/payments/farm/${farm.id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      const expensesData = expensesRes.ok ? await expensesRes.json() : [];
      const paymentsData = paymentsRes.ok ? await paymentsRes.json() : [];

      setExpenses(expensesData || []);
      setPayments(paymentsData || []);
    } catch (error) {
      console.error('Error fetching financial data:', error);
    }
  }

  async function handleAddExpense(e: React.FormEvent) {
    e.preventDefault();
    if (!farm || !user) {
      setError('Farm or user not found');
      return;
    }

    if (!expenseForm.amount) {
      setError('Please enter an amount');
      return;
    }

    try {
      setError('');
      setSuccess('');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const token = localStorage.getItem('auth_token');

      if (!token) {
        setError('Not authenticated');
        return;
      }

      const response = await fetch(`${apiUrl}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          farm_id: farm.id,
          farmer_id: user.id,
          category: expenseForm.category,
          amount: parseFloat(expenseForm.amount),
          description: expenseForm.description,
          crop_related: expenseForm.cropRelated || null,
          expense_date: new Date().toISOString().split('T')[0],
        }),
      });

      if (response.ok) {
        setExpenseForm({ category: 'Seeds', amount: '', description: '', cropRelated: '' });
        setShowExpenseForm(false);
        setSuccess('Expense added successfully!');
        setTimeout(() => setSuccess(''), 3000);
        fetchFinancialData();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      setError('Error adding expense. Please try again.');
    }
  }

  async function handleAddRevenue(e: React.FormEvent) {
    e.preventDefault();
    if (!farm || !user) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const token = localStorage.getItem('auth_token');

      if (!token) return;

      const amountReceived = parseFloat(revenueForm.amountReceived);
      const pendingAmount = parseFloat(revenueForm.pendingAmount || '0');
      const paymentStatus =
        pendingAmount > 0 ? (amountReceived > 0 ? 'Partial' : 'Pending') : 'Paid';

      const response = await fetch(`${apiUrl}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          farm_id: farm.id,
          crop_sold: revenueForm.cropSold,
          quantity: parseFloat(revenueForm.quantity),
          buyer_name: revenueForm.buyerName,
          amount_received: amountReceived,
          pending_amount: pendingAmount,
          payment_status: paymentStatus,
          sale_date: new Date().toISOString().split('T')[0],
        }),
      });

      if (response.ok) {
        setRevenueForm({ cropSold: '', quantity: '', buyerName: '', amountReceived: '', pendingAmount: '' });
        setShowRevenueForm(false);
        fetchFinancialData();
      } else {
        console.error('Failed to add revenue');
      }
    } catch (error) {
      console.error('Error adding revenue:', error);
    }
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalRevenue = payments.reduce((sum, pay) => sum + pay.amount_received, 0);
  const totalPending = payments.reduce((sum, pay) => sum + pay.pending_amount, 0);
  const profit = totalRevenue - totalExpenses;

  const expensesByCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  if (!farm) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <p className="text-gray-600">Please set up your farm profile to track finances.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Financial Analytics</h2>
          <p className="text-gray-600">Track expenses, revenue, and profitability</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{payments.length} transactions</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <TrendingDown className="h-5 w-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{totalExpenses.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{expenses.length} entries</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Net Profit</p>
            <DollarSign className={`h-5 w-5 ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          </div>
          <p className={`text-2xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{profit.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {profit >= 0 ? 'Profitable' : 'Loss'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Pending Payments</p>
            <DollarSign className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{totalPending.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">To be collected</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'overview'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'expenses'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'revenue'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Revenue
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Distribution</h3>
                <div className="space-y-3">
                  {Object.entries(expensesByCategory).map(([category, amount]) => {
                    const percentage = (amount / totalExpenses) * 100;
                    return (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-700">{category}</span>
                          <span className="text-sm font-semibold text-gray-900">
                            ₹{amount.toLocaleString()} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="space-y-4">
              <button
                onClick={() => setShowExpenseForm(!showExpenseForm)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Expense
              </button>

              {showExpenseForm && (
                <form onSubmit={handleAddExpense} className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={expenseForm.category}
                      onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option>Seeds</option>
                      <option>Fertilizers</option>
                      <option>Labor</option>
                      <option>Machinery</option>
                      <option>Water</option>
                      <option>Pesticides</option>
                    </select>
                    <input
                      type="number"
                      value={expenseForm.amount}
                      onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                      placeholder="Amount (₹)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    value={expenseForm.description}
                    onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                    placeholder="Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowExpenseForm(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{expense.category}</p>
                      <p className="text-sm text-gray-600">{expense.description}</p>
                      <p className="text-xs text-gray-500">{new Date(expense.expense_date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-lg font-bold text-red-600">-₹{expense.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'revenue' && (
            <div className="space-y-4">
              <button
                onClick={() => setShowRevenueForm(!showRevenueForm)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Record Sale
              </button>

              {showRevenueForm && (
                <form onSubmit={handleAddRevenue} className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={revenueForm.cropSold}
                      onChange={(e) => setRevenueForm({ ...revenueForm, cropSold: e.target.value })}
                      placeholder="Crop Name"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <input
                      type="number"
                      value={revenueForm.quantity}
                      onChange={(e) => setRevenueForm({ ...revenueForm, quantity: e.target.value })}
                      placeholder="Quantity (Q)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    value={revenueForm.buyerName}
                    onChange={(e) => setRevenueForm({ ...revenueForm, buyerName: e.target.value })}
                    placeholder="Buyer Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={revenueForm.amountReceived}
                      onChange={(e) => setRevenueForm({ ...revenueForm, amountReceived: e.target.value })}
                      placeholder="Amount Received (₹)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <input
                      type="number"
                      value={revenueForm.pendingAmount}
                      onChange={(e) => setRevenueForm({ ...revenueForm, pendingAmount: e.target.value })}
                      placeholder="Pending Amount (₹)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRevenueForm(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{payment.crop_sold}</p>
                      <p className="text-sm text-gray-600">
                        {payment.quantity} Q • {payment.buyer_name}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(payment.sale_date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">+₹{payment.amount_received.toLocaleString()}</p>
                      {payment.pending_amount > 0 && (
                        <p className="text-xs text-amber-600">₹{payment.pending_amount.toLocaleString()} pending</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

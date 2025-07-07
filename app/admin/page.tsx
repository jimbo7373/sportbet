'use client';

import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  plan: string;
  registrationDate: string;
  paymentStatus: string;
  amount: number;
}

interface Payment {
  id: string;
  orderId: string;
  email: string;
  amount: number;
  planType: string;
  status: string;
  paymentTime: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = sessionStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    // Load users from localStorage (simulating database)
    const storedUsers = localStorage.getItem('registeredUsers');
    const storedPayments = localStorage.getItem('adminPayments');
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    
    if (storedPayments) {
      setPayments(JSON.parse(storedPayments));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'jim' && password === 'jim') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setError('');
      loadData();
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setUsername('');
    setPassword('');
  };

  const clearData = (type: string) => {
    if (window.confirm(`Are you sure you want to clear all ${type}?`)) {
      if (type === 'users') {
        localStorage.removeItem('registeredUsers');
        setUsers([]);
      } else if (type === 'payments') {
        localStorage.removeItem('adminPayments');
        setPayments([]);
      }
    }
  };

  // Mock data for demonstration
  useEffect(() => {
    if (isAuthenticated && users.length === 0 && payments.length === 0) {
      // Add some sample data if none exists
      const sampleUsers: User[] = [
        {
          id: '1',
          email: 'marius@marius.com',
          plan: 'trial',
          registrationDate: new Date().toISOString(),
          paymentStatus: 'completed',
          amount: 19
        }
      ];
      
      const samplePayments: Payment[] = [
        {
          id: '1',
          orderId: 'ORDER123',
          email: 'marius@marius.com',
          amount: 19,
          planType: 'trial',
          status: 'completed',
          paymentTime: new Date().toISOString()
        }
      ];

      setUsers(sampleUsers);
      setPayments(samplePayments);
      localStorage.setItem('registeredUsers', JSON.stringify(sampleUsers));
      localStorage.setItem('adminPayments', JSON.stringify(samplePayments));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/logo.png" 
                alt="Jim's Sportbets Logo" 
                className="h-20 w-auto"
              />
            </div>
            <h2 className="text-3xl font-bold text-white">Admin Access</h2>
            <p className="mt-2 text-gray-300">
              Enter your admin credentials
            </p>
          </div>

          <div className="bg-gray-800 py-8 px-4 shadow rounded-lg sm:px-10">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-800 border border-red-600 rounded-lg p-3">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-xs text-center text-gray-400">
              <p>🔒 Admin access required</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/logo.png" 
              alt="Jim's Sportbets Logo" 
              className="h-20 w-auto"
            />
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
          <p className="mt-2 text-gray-300">
            Manage users and payments
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                Users ({users.length})
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'payments'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                Payments ({payments.length})
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stats'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                Statistics
              </button>
            </nav>
          </div>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">Registered Users</h3>
              <button
                onClick={() => clearData('users')}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Clear All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded">
                          {user.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(user.registrationDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span className={`px-2 py-1 text-xs rounded ${
                          user.paymentStatus === 'completed' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-yellow-600 text-white'
                        }`}>
                          {user.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${user.amount}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">Payment Transactions</h3>
              <button
                onClick={() => clearData('payments')}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Clear All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                        {payment.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {payment.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded">
                          {payment.planType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span className="px-2 py-1 text-xs bg-green-600 text-white rounded">
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(payment.paymentTime).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {payments.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                        No payments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-blue-400">{users.length}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-2">Total Payments</h3>
              <p className="text-3xl font-bold text-green-400">{payments.length}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-yellow-400">
                ${payments.reduce((sum, payment) => sum + payment.amount, 0)}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-2">Avg. Order Value</h3>
              <p className="text-3xl font-bold text-purple-400">
                ${payments.length > 0 ? (payments.reduce((sum, payment) => sum + payment.amount, 0) / payments.length).toFixed(2) : '0'}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 
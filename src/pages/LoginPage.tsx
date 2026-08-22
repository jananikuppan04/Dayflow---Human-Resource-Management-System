import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { Shield, Users, BarChart3, Lock, User, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { OdooLogo } from '../components/layout/Navbar';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginId, setLoginId] = useState<string>('admin@dayflow.com');
  const [password, setPassword] = useState<string>('admin123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSelectRole = (roleType: 'ADMIN' | 'EMPLOYEE') => {
    if (roleType === 'ADMIN') {
      setLoginId('admin@dayflow.com');
      setPassword('admin123');
    } else {
      setLoginId('OIJODO20220001'); // Original generated format OIJODO20220001
      setPassword('emp123');
    }
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId.trim()) {
      setError('Please enter your login ID or email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const isAdmin = loginId.toLowerCase().includes('admin');
      
      login({
        id: isAdmin ? 'u1' : 'emp_1001',
        email: loginId,
        role: isAdmin ? 'admin' : 'employee',
        employeeId: isAdmin ? 'ADMIN001' : 'EMP-1001',
      });

      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-200">
        
        {/* Left Dark Branding Panel */}
        <div className="lg:col-span-5 bg-[#0F172A] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#714B67]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#714B67]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-8 relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#714B67] flex items-center justify-center text-white font-black text-sm">
                odoo
              </div>
              <div>
                <h1 className="font-extrabold text-xl tracking-tight leading-none text-white">Dayflow</h1>
                <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">HRM System</span>
              </div>
            </div>

            <div className="w-12 h-1 bg-[#714B67] rounded-full" />

            {/* Headline */}
            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
                Every workday, <br />
                <span className="text-[#c7a9c1] font-black">
                  perfectly
                </span>{' '}
                aligned.
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Dayflow HRM helps you manage your workforce, streamline HR operations, and empower your people.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-[#c7a9c1] flex-shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Secure & Reliable</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Your data is protected with enterprise-grade security.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-[#c7a9c1] flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Role-Based Access</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Admins and Employees get the right access they need.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-[#c7a9c1] flex-shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Smart Insights</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Make data-driven decisions with powerful analytics.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Illustration */}
          <div className="pt-8 relative z-10 flex justify-center">
            <img
              src="/dayflow_dashboard_illustration.png"
              alt="Dayflow HRMS Dashboard Illustration"
              className="w-full max-w-xs object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Right Sign In Form Panel */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-7">

            {/* Lock Icon Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-purple-50 text-[#714B67] flex items-center justify-center mx-auto border border-purple-100 shadow-xs">
                <Lock className="w-7 h-7" />
              </div>
              <div className="flex justify-center mb-1">
                <span className="text-[#714B67] text-3xl font-black tracking-tighter" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  odoo
                </span>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back!</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Sign in to continue to your account</p>
              </div>
            </div>

            {/* Role Preset Selector Pills */}
            <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleSelectRole('ADMIN')}
                className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  loginId.includes('admin')
                    ? 'bg-white text-[#714B67] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Portal
              </button>
              <button
                type="button"
                onClick={() => handleSelectRole('EMPLOYEE')}
                className={`flex-1 py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  !loginId.includes('admin')
                    ? 'bg-white text-[#714B67] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Employee Portal
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Login ID / Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Login ID / Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter your login ID or email"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-purple-600 rounded"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset instructions sent to registered administrator.');
                  }}
                  className="font-bold text-[#714B67] hover:text-[#5f3e56] hover:underline transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#714B67] via-[#5f3e56] to-[#714B67] hover:opacity-95 shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Security Footer Note */}
            <div className="pt-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-500 border border-slate-200">
                <Shield className="w-3.5 h-3.5 text-[#714B67]" />
                <span>Your information is safe with us</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

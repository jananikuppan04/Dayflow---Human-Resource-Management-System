import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast, ToastContainer } from '../components/auth/Toast';
import { useAuth } from '../store/AuthContext';
import { mockApi } from '../services/mockApi';
import { LayoutDashboard, CheckCircle2, Shield, Eye, EyeOff, User, Lock, Users } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { toasts, addToast } = useToast();
  const { login } = useAuth();
  
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // First Login Flow State
  const [requiresPasswordChange, setRequiresPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [tempUser, setTempUser] = useState<any>(null);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!loginId.trim() || !password) {
      addToast('Please enter both Login ID/Email and password.', 'error');
      return;
    }
    setLoading(true);
    
    try {
      const user = await mockApi.login(loginId.trim(), password);
      
      const isFirst = await mockApi.isFirstLogin(user.email);
      if (isFirst) {
        setTempUser(user);
        setRequiresPasswordChange(true);
        addToast('Action Required: Please change your temporary password.', 'error');
        setLoading(false);
        return;
      }

      setLoading(false);
      addToast('Welcome back to Dayflow!', 'success');
      login(user);
      navigate(user.role === 'admin' ? '/employees' : '/dashboard');
    } catch (err: any) {
      setLoading(false);
      addToast(err.message || 'Invalid credentials', 'error');
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      addToast('Password must be at least 8 characters.', 'error');
      return;
    }
    
    try {
      await mockApi.changePassword(tempUser.email, newPassword);
      // Accept new password and login
      setRequiresPasswordChange(false);
      addToast('Password updated successfully. Welcome to Dayflow!', 'success');
      login(tempUser);
      navigate(tempUser.role === 'admin' ? '/employees' : '/dashboard');
    } catch (err: any) {
      addToast('Failed to update password', 'error');
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <ToastContainer toasts={toasts} />
      
      {/* Left Branding Panel (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col justify-between w-[40%] xl:w-[35%] bg-[#211a52] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#322382] to-[#211a52] p-12 text-white shadow-2xl z-10 relative overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight">Dayflow</span>
          </div>
          
          <h1 className="text-4xl font-bold leading-tight mb-4 tracking-tight">
            Every workday,<br />
            <span className="text-primary-300">perfectly</span> aligned.
          </h1>
          <p className="text-[#a4a0cf] text-lg max-w-sm leading-relaxed mb-12 font-medium">
            A smarter way to manage your people, attendance, leave, and HR operations.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#43389a] bg-[#2a2266] flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Secure Role-Based Access</h3>
                <p className="text-sm text-[#8c86bc] leading-relaxed max-w-[240px]">
                  Ensure the right access for the right people securely.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#43389a] bg-[#2a2266] flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Enterprise Ready</h3>
                <p className="text-sm text-[#8c86bc] leading-relaxed max-w-[240px]">
                  Built to scale with your growing organization globally.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-xs text-[#706a9c] font-medium">
          © {new Date().getFullYear()} Dayflow HRMS. All rights reserved.
        </div>
      </div>

      {/* Right Auth Panel */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-16 bg-slate-50 relative">
        
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center justify-center gap-2 mb-8 mt-4">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-md shadow-primary-600/20">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-2xl text-slate-900 tracking-tight">Dayflow</span>
        </div>

        <div className="w-full max-w-[440px] mx-auto bg-white p-8 sm:p-10 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          {!requiresPasswordChange ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-primary-100/50">
                  <User className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Welcome back!</h2>
                <p className="text-slate-500 text-sm">Sign in to continue to your Dayflow account</p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Login ID / Email</label>
                  <div className="relative">
                    <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-800 placeholder-slate-400"
                      placeholder="Enter your email"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPw ? 'text' : 'password'}
                      className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-800 placeholder-slate-400 font-medium tracking-wide"
                      placeholder="••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      onClick={() => setShowPw(!showPw)}
                    >
                      {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm pt-1 pb-1">
                  <label className="flex items-center gap-2.5 cursor-pointer text-slate-500 hover:text-slate-700 transition-colors">
                    <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500 border-slate-300 w-4 h-4 cursor-pointer" />
                    Remember me
                  </label>
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-700 transition-colors">Forgot Password?</a>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-2 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all active:scale-[0.99] disabled:opacity-70 disabled:active:scale-100"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs font-medium text-slate-400 uppercase tracking-widest">
                  <span className="px-3 bg-white">OR</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-orange-100/50">
                  <Shield className="w-7 h-7 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Change Password</h2>
                <p className="text-slate-500 text-sm">You are using a temporary system-generated password. Set a new password to continue.</p>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPw ? 'text' : 'password'}
                      className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-800 placeholder-slate-400"
                      placeholder="Minimum 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      onClick={() => setShowPw(!showPw)}
                    >
                      {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full mt-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all active:scale-[0.99]"
                >
                  Save & Continue
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

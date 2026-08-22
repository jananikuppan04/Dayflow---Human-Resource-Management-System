import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast, ToastContainer } from '../components/auth/Toast';
import { ShieldCheck, UserCog, BarChart4, CheckCircle2, Copy, ArrowLeft, LayoutDashboard, Shield } from 'lucide-react';

const DayflowLogoIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="4" width="8" height="16" rx="3" fill="#8b5cf6" />
    <rect x="12" y="12" width="10" height="8" rx="3" fill="#c4b5fd" />
    <circle cx="17" cy="6" r="4" fill="#c4b5fd" />
  </svg>
);
import { mockApi } from '../services/mockApi';

function computeLoginId(firstName: string, lastName: string, year: string) {
  const code = 'DAYF';
  const fn   = firstName.replace(/\s+/g, '').toUpperCase().slice(0, 2).padEnd(2, 'X');
  const ln   = lastName.replace(/\s+/g, '').toUpperCase().slice(0, 2).padEnd(2, 'X');
  const yr   = year || new Date().getFullYear().toString();
  return `${code}${fn}${ln}${yr}0001`;
}

function generatePassword() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$';
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function SignupPage() {
  const navigate = useNavigate();
  const { toasts, addToast } = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [phone, setPhone]         = useState('');
  const [year, setYear]           = useState(new Date().getFullYear().toString());

  const [tempPassword, setTempPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const loginId = computeLoginId(firstName, lastName, year);
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  useEffect(() => {
    setTempPassword(generatePassword());
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName) { addToast('Employee name is required.', 'error'); return; }
    if (!email.includes('@')) { addToast('Enter a valid email address.', 'error'); return; }
    if (!phone) { addToast('Phone number is required.', 'error'); return; }
    if (!year) { addToast('Year of joining is required.', 'error'); return; }
    
    setLoading(true);
    try {
      await mockApi.createEmployee({
        firstName,
        lastName,
        email,
        mobile: phone,
        loginId
      }, tempPassword);
      setLoading(false);
      setSuccess(true);
      addToast(`Employee account created successfully!`, 'success');
    } catch (err: any) {
      setLoading(false);
      addToast(err.message || 'Failed to create account.', 'error');
    }
  }

  const copyCredentials = () => {
    navigator.clipboard.writeText(`Login ID: ${loginId}\nEmail: ${email}\nPassword: ${tempPassword}`);
    addToast('Credentials copied to clipboard!', 'success');
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <ToastContainer toasts={toasts} />
      
      {/* Left Branding Panel (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col justify-between w-[40%] xl:w-[35%] bg-[#211a52] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#322382] to-[#211a52] p-12 text-white shadow-2xl z-10 relative overflow-hidden sticky top-0 h-screen">
        {/* Subtle decorative background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10">
          <button onClick={() => navigate('/employees')} className="flex items-center gap-2 text-[#a4a0cf] hover:text-white transition-colors mb-16">
            <ArrowLeft className="w-5 h-5" /> Back to Employees
          </button>
          
          <div className="flex items-center gap-3 mb-10">
            <DayflowLogoIcon className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight leading-none">Dayflow</span>
              <span className="text-[11px] text-[#a4a0cf] font-medium mt-1">HRM System</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold leading-tight mb-3 tracking-tight">
            Every workday,<br />
            <span className="text-primary-300">perfectly</span> aligned.
          </h1>
          <p className="text-[#a4a0cf] text-sm max-w-sm leading-relaxed mb-8 font-medium">
            Dayflow HRM helps you manage your workforce, streamline HR operations, and empower your people.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#43389a] bg-[#2a2266] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-primary-300" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-0.5">Secure & Reliable</h3>
                <p className="text-xs text-[#8c86bc] leading-relaxed max-w-[250px]">
                  Your data is protected with enterprise-grade security.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#43389a] bg-[#2a2266] flex items-center justify-center">
                <UserCog className="w-4 h-4 text-primary-300" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-0.5">Role-Based Access</h3>
                <p className="text-xs text-[#8c86bc] leading-relaxed max-w-[250px]">
                  Admins and Employees get the right access they need.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#43389a] bg-[#2a2266] flex items-center justify-center">
                <BarChart4 className="w-4 h-4 text-primary-300" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-0.5">Smart Insights</h3>
                <p className="text-xs text-[#8c86bc] leading-relaxed max-w-[250px]">
                  Make data-driven decisions with powerful analytics.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 relative flex justify-center">
            <img src="/assets/auth-illustration.jpg" alt="Dashboard Illustration" className="w-full max-w-[320px] rounded-xl shadow-2xl border border-[#43389a]/30 object-cover" />
          </div>
        </div>

        <div className="relative z-10 text-xs text-[#706a9c] font-medium">
          © {new Date().getFullYear()} Dayflow HRMS. All rights reserved.
        </div>
      </div>

      {/* Right Auth Panel */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-16 bg-slate-50 relative py-12 min-h-screen">
        
        {/* Mobile Logo & Back */}
        <div className="lg:hidden flex items-center justify-between mb-8 mt-4">
          <div className="flex items-center gap-3">
            <DayflowLogoIcon className="w-8 h-8 text-primary-600" />
            <span className="font-bold text-2xl text-slate-900 tracking-tight">Dayflow</span>
          </div>
          <button onClick={() => navigate('/employees')} className="text-sm font-semibold text-slate-500">Back</button>
        </div>

        <div className="w-full max-w-[500px] mx-auto bg-white p-8 sm:p-10 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          {!success ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-orange-100/50">
                  <Shield className="w-7 h-7 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Create Employee</h2>
                <p className="text-slate-500 text-sm">Enter employee details to generate credentials.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-800"
                      value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-800"
                      value={lastName} onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-800"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-800"
                      value={phone} onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Year of Joining</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-white text-slate-800"
                    value={year} onChange={(e) => setYear(e.target.value)}
                  >
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-slate-700 tracking-tight">Auto-Generated Credentials</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Login ID</span>
                      <span className="text-sm font-mono font-bold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-md">{loginId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Temp Password</span>
                      <span className="text-sm font-mono text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                        ••••••••••••
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-4 leading-relaxed font-medium">
                    A temporary password is generated securely. The employee will be required to change it upon their first login.
                  </p>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-4 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all active:scale-[0.99] disabled:opacity-70 disabled:active:scale-100"
                >
                  {loading ? 'Creating Account...' : 'Create Employee Account'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-5 border border-[#dcfce7]">
                <CheckCircle2 className="w-8 h-8 text-[#166534]" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Account Created!</h2>
              <p className="text-slate-500 text-sm mb-8">Please securely share these credentials with the employee.</p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left mb-8">
                <div className="mb-4">
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email / Login ID</span>
                  <div className="font-mono font-medium text-slate-900 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm">
                    {email} <span className="text-slate-300 mx-2">|</span> {loginId}
                  </div>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Temporary Password</span>
                  <div className="font-mono font-medium text-slate-900 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm">
                    {tempPassword}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={copyCredentials}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Copy className="w-4 h-4" /> Copy
                </button>
                <button 
                  onClick={() => navigate('/employees')}
                  className="flex-1 bg-primary-600 text-white font-semibold py-3.5 rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

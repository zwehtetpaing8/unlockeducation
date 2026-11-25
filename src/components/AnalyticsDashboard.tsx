import React, { useState, useEffect, useCallback } from 'react';
import { AnalyticsSummary } from '../types';
import {
  ShieldCheck,
  Users,
  Globe,
  Activity,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  KeyRound,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  Clock,
  Search,
  ShieldAlert,
  ArrowLeft,
  LogOut,
} from 'lucide-react';
import { motion } from 'motion/react';

interface AnalyticsDashboardProps {
  onNavigateHome?: () => void;
}

export default function AnalyticsDashboard({ onNavigateHome }: AnalyticsDashboardProps) {
  // Keep server-issued session token strictly in React memory (never localStorage or URL)
  const [sessionToken, setSessionToken] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [requiresClaim, setRequiresClaim] = useState<boolean>(false);
  const [statusLoaded, setStatusLoaded] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState<boolean>(false);

  // Clean up any legacy credential stored in localStorage from older versions
  useEffect(() => {
    try {
      localStorage.removeItem('unlock_edu_admin_key');
    } catch {
      // Ignore storage errors
    }
    fetch('/api/owner-auth/status', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : { requiresClaim: false }))
      .then((info) => {
        setRequiresClaim(Boolean(info?.requiresClaim));
      })
      .catch(() => {
        setRequiresClaim(false);
      })
      .finally(() => {
        setStatusLoaded(true);
      });
  }, []);

  const parseUserAgent = (ua: string) => {
    if (!ua || ua === 'Unknown') return { device: 'Unknown', isMobile: false };

    let os = 'Desktop';
    if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Macintosh') || ua.includes('Mac OS')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';

    let browser = 'Browser';
    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Edg')) browser = 'Edge';

    const isMobile = os === 'iOS' || os === 'Android' || ua.includes('Mobile');
    return { device: `${browser} on ${os}`, isMobile };
  };

  const fetchAnalytics = useCallback(async (tokenToUse: string) => {
    if (!tokenToUse) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/owner-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenToUse}`,
          'X-Owner-Token': tokenToUse,
        },
        body: JSON.stringify({}),
      });

      if (res.ok) {
        const result: AnalyticsSummary = await res.json();
        setData(result);
        setIsAuthenticated(true);
      } else if (res.status === 401) {
        setSessionToken('');
        setIsAuthenticated(false);
        setError('Session expired. Please sign in again.');
      } else {
        setError('Unable to load analytics right now.');
      }
    } catch {
      setError('Server နှင့် ချိတ်ဆက်၍မရသေးပါ။ ခဏစောင့်ပြီး ပြန်လည်ကြိုးစားပေးပါ။');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (sessionToken) {
      fetchAnalytics(sessionToken);
    }
  }, [sessionToken, fetchAnalytics]);

  useEffect(() => {
    if (!isAuthenticated || !autoRefresh || !sessionToken) return;
    const interval = setInterval(() => {
      fetchAnalytics(sessionToken);
    }, 10000);
    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh, sessionToken, fetchAnalytics]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pwd = inputPassword.trim();
    if (!pwd) return;

    if (requiresClaim) {
      if (pwd.length < 8) {
        setError('Owner password သည် အနည်းဆုံး 8 လုံး ရှိရပါမည်။');
        return;
      }
      if (pwd !== confirmPassword.trim()) {
        setError('Password နှစ်ခု မတူညီပါ။');
        return;
      }
    }

    setLoading(true);
    setError(null);
    try {
      const endpoint = requiresClaim ? '/api/owner-auth/claim' : '/api/owner-auth/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });

      const body = await res.json().catch(() => ({}));
      if (res.ok && typeof body?.token === 'string') {
        setInputPassword('');
        setConfirmPassword('');
        setRequiresClaim(false);
        setSessionToken(body.token);
      } else {
        setError(body?.error || 'Password မမှန်ပါ။');
      }
    } catch {
      setError('Server နှင့် ချိတ်ဆက်၍မရသေးပါ။');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (sessionToken) {
      fetch('/api/owner-auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          'X-Owner-Token': sessionToken,
        },
      }).catch(() => {});
    }
    setSessionToken('');
    setIsAuthenticated(false);
    setData(null);
    setConfirmClearOpen(false);
  };

  const handleClearLogs = async () => {
    if (!sessionToken) return;
    try {
      const res = await fetch('/api/owner-data/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`,
          'X-Owner-Token': sessionToken,
        },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        setConfirmClearOpen(false);
        fetchAnalytics(sessionToken);
      } else if (res.status === 401) {
        setSessionToken('');
        setIsAuthenticated(false);
      }
    } catch {
      setError('Failed to clear logs.');
    }
  };

  const portalLink = `${window.location.origin}?admin`;

  const copyPortalLink = () => {
    navigator.clipboard.writeText(portalLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredLogs =
    data?.recentLogs.filter(
      (log) =>
        log.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userAgent.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-6 text-center"
        >
          <div className="w-16 h-16 mx-auto bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
            <KeyRound className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              {requiresClaim ? 'Set Up Owner Password' : 'Website Owner Portal'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {requiresClaim
                ? 'Create a strong password (min 8 characters) to claim admin access, or set ADMIN_SECRET in Settings → Secrets.'
                : 'Enter your Owner Password to view live visitor statistics.'}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={requiresClaim ? 'Create Owner Password (min 8 chars)' : 'Enter Owner Password'}
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                autoComplete={requiresClaim ? 'new-password' : 'current-password'}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {requiresClaim && (
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Owner Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            )}

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/30 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center gap-2 text-left">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !statusLoaded}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  {requiresClaim ? 'Save Password & Unlock' : 'Unlock Dashboard'}
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-400 space-y-1">
            <p>Protected by server-verified session authentication</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm">
        <div className="flex items-center gap-4">
          {onNavigateHome && (
            <button
              onClick={onNavigateHome}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl text-slate-600 dark:text-slate-300 transition cursor-pointer"
              title="Return to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900 dark:text-white tracking-tight">
              Website Owner Visitor Dashboard
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Real-time traffic monitor & visitor IP addresses
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              autoRefresh
                ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Auto-Refresh {autoRefresh ? 'ON (10s)' : 'OFF'}</span>
          </button>

          <button
            onClick={() => fetchAnalytics(sessionToken)}
            disabled={loading}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition cursor-pointer shadow-sm shadow-indigo-500/20"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
            title="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Portal Link Info Banner (credential-free URL) */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-900 text-white p-5 rounded-3xl border border-indigo-900/50 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold tracking-tight">Owner Portal Link</h3>
          </div>
          <p className="text-xs text-slate-300">
            Bookmark this link to open the owner sign-in page (passwords are never placed in URLs):
          </p>
          <div className="text-[11px] font-mono text-indigo-300 bg-black/40 px-3 py-1.5 rounded-lg overflow-x-auto max-w-xl truncate border border-indigo-500/20">
            {portalLink}
          </div>
        </div>

        <button
          onClick={copyPortalLink}
          className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-500/30 shrink-0 self-start lg:self-auto"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied' : 'Copy Portal Link'}</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {data?.totalVisits ?? 0}
            </div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">
              Total Visitor Pageviews
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {data?.uniqueIpsCount ?? 0}
            </div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">
              Unique IP Addresses
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-amber-600 dark:text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {data?.todayVisits ?? 0}
            </div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">
              Visits Today
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Logs Table & Top IPs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 columns: Recent Visitor Log Table */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Recent Visitor Logs ({filteredLogs.length})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live recorded traffic requests with visitor IP addresses
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search IP or Path..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/80 text-slate-400 uppercase text-[10px] font-mono tracking-wider">
                  <th className="py-2.5 px-3">IP Address</th>
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Device / Browser</th>
                  <th className="py-2.5 px-3">Page Path</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => {
                    const uaInfo = parseUserAgent(log.userAgent);
                    return (
                      <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition">
                        <td className="py-3 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {log.ip}
                        </td>
                        <td className="py-3 px-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                          <span className="text-[10px] text-slate-400 block">
                            {new Date(log.timestamp).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                          <div className="flex items-center gap-1.5">
                            {uaInfo.isMobile ? (
                              <Smartphone className="w-3.5 h-3.5 text-amber-500" />
                            ) : (
                              <Monitor className="w-3.5 h-3.5 text-indigo-500" />
                            )}
                            <span>{uaInfo.device}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-600 dark:text-slate-400 max-w-[150px] truncate">
                          {log.path}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400">
                      No visitor records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-2 text-xs text-slate-400">
            <span>Showing last {filteredLogs.length} logs</span>
            {confirmClearOpen ? (
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-semibold">Clear all logs?</span>
                <button
                  onClick={handleClearLogs}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold cursor-pointer transition"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setConfirmClearOpen(false)}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-semibold cursor-pointer transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClearOpen(true)}
                className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-1 cursor-pointer transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Log History</span>
              </button>
            )}
          </div>
        </div>

        {/* Right 4 columns: Top Visiting IP addresses */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm p-6 space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Top Visitor IPs
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              IP addresses with highest visit counts
            </p>
          </div>

          <div className="space-y-2">
            {data?.topIps && data.topIps.length > 0 ? (
              data.topIps.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800/60"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                      {item.ip}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
                    {item.count} views
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">No top IP data yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

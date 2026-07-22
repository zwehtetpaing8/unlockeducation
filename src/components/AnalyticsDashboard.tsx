import React, { useState, useEffect } from 'react';
import { AnalyticsSummary, VisitorLog } from '../types';
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
  ExternalLink,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';

interface AnalyticsDashboardProps {
  initialKey?: string;
  onNavigateHome?: () => void;
}

export default function AnalyticsDashboard({ initialKey = '', onNavigateHome }: AnalyticsDashboardProps) {
  const [secretKey, setSecretKey] = useState<string>(() => {
    return initialKey || localStorage.getItem('unlock_edu_admin_key') || '';
  });
  const [inputKey, setInputKey] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);

  // Parse User Agent into friendly device name
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

  // Fetch Analytics from server
  const fetchAnalytics = async (keyToUse: string) => {
    if (!keyToUse) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: keyToUse }),
      });

      if (res.ok) {
        const result: AnalyticsSummary = await res.json();
        setData(result);
        setIsAuthenticated(true);
        localStorage.setItem('unlock_edu_admin_key', keyToUse);
      } else {
        const errJson = await res.json();
        setError(errJson.error || 'Access denied. Invalid Secret Link key or PIN.');
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError('Server connection failed. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (secretKey) {
      fetchAnalytics(secretKey);
    }
  }, [secretKey]);

  // Auto-refresh interval
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh || !secretKey) return;
    const interval = setInterval(() => {
      fetchAnalytics(secretKey);
    }, 10000);
    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh, secretKey]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    setSecretKey(inputKey.trim());
  };

  const handleClearLogs = async () => {
    if (!window.confirm('Are you sure you want to clear all visitor logs? This action cannot be undone.')) return;
    try {
      const res = await fetch('/api/analytics/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: secretKey }),
      });
      if (res.ok) {
        fetchAnalytics(secretKey);
      }
    } catch (err) {
      console.error('Failed to clear logs', err);
    }
  };

  const secretLink = `${window.location.origin}?view=analytics&key=${encodeURIComponent(secretKey || '@uledu?300525')}`;

  const copySecretLink = () => {
    navigator.clipboard.writeText(secretLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Filter logs
  const filteredLogs = data?.recentLogs.filter((log) => 
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
              Website Owner Portal
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter Secret PIN or Link Key to view live visitor statistics & IP addresses.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                placeholder="Enter Secret Password or Key"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/30 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center gap-2 text-left">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Unlock Dashboard
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-400 space-y-1">
            <p>Protected by Website Owner Password</p>
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
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Tracking Active
              </span>
            </div>
            <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900 dark:text-white tracking-tight mt-1">
              Website Owner Visitor Dashboard
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Real-time traffic monitor & visitor IP addresses
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
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
            onClick={() => fetchAnalytics(secretKey)}
            disabled={loading}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition cursor-pointer shadow-sm shadow-indigo-500/20"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Secret Link Info Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-900 text-white p-5 rounded-3xl border border-indigo-900/50 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold tracking-tight">Your Secret Owner Access Link</h3>
          </div>
          <p className="text-xs text-slate-300">
            Bookmark this unique link to quickly open this Visitor Dashboard without re-entering PINs.
          </p>
          <div className="text-[11px] font-mono text-indigo-300 bg-black/40 px-3 py-1.5 rounded-lg overflow-x-auto max-w-xl truncate border border-indigo-500/20">
            {secretLink}
          </div>
        </div>

        <button
          onClick={copySecretLink}
          className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer shadow-md shadow-indigo-500/30"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Link Copied!' : 'Copy Secret Link'}</span>
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
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
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

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <span>Showing last {filteredLogs.length} logs</span>
            <button
              onClick={handleClearLogs}
              className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-1 cursor-pointer transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Log History</span>
            </button>
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

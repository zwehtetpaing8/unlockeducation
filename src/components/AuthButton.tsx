import { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "../lib/firebase";
import { LogOut, User as UserIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        try {
          await setDoc(doc(db, "users", currentUser.uid), {
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName,
            photoURL: currentUser.photoURL,
            createdAt: serverTimestamp()
          }, { merge: true });
        } catch (error) {
          console.error("Error saving user profile:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (isAuthenticating) return;
    setIsAuthenticating(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.code === 'auth/popup-blocked') {
        alert("Sign in popup was blocked by your browser. Please allow popups for this site or open the app in a new tab.");
      } else if (error.code === 'auth/network-request-failed') {
        alert("Network error during sign in. Please try opening the app in a new tab.");
      } else if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
        // User cancelled the login, just ignore
      } else {
        // Show generic error for other cases if needed
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowMenu(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
        <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <button
        onClick={handleLogin}
        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold text-xs tracking-wide transition-all shadow-sm cursor-pointer whitespace-nowrap"
      >
        <UserIcon className="w-4 h-4" />
        Sign In
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-8 h-8 rounded-full overflow-hidden border-2 border-indigo-100 dark:border-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm hover:scale-105 cursor-pointer"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
            {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
          </div>
        )}
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 origin-top-right"
          >
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {user.displayName || "User"}
              </p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">
                {user.email}
              </p>
            </div>
            <div className="p-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors font-medium cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component ensures that every time the route changes,
 * the window is scrolled back to the top (0, 0).
 * This fixes the common SPA issue where navigation leaves the scroll position
 * from the previous page.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset scroll position to top whenever pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'instant' is preferred for page transitions to avoid awkward sliding
    });
  }, [pathname]);

  return null;
}

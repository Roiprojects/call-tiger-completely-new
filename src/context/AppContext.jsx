/**
 * CALL TIGER — REACT GLOBAL CONTEXT & STATE MANAGER
 * Persists properties, master Bangalore areas catalog, founder letter, and enquiries to localStorage
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_PROPERTIES } from '../data/defaultProperties';
import { DEFAULT_AREA_NAMES, PREMIUM_AREA_NAMES } from '../data/bangaloreAreas';

const STORAGE_KEYS = {
  PROPERTIES: 'call_tiger_react_properties_v4',
  AREAS: 'call_tiger_react_areas_v4',
  LETTER: 'call_tiger_react_letter_v4',
  ENQUIRIES: 'call_tiger_react_enquiries_v4',
  THEME: 'call_tiger_react_theme_v4'
};

const DEFAULT_FOUNDER_LETTER = {
  badge: 'CONSULTANT COLLABORATION & MANDATE NETWORK',
  title: "Subject: Let's collaborate and grow our business together",
  salutation: 'Dear fellow real estate consultant,',
  body: `Instead of relying entirely on Magicbricks and 99acres, let’s collaborate with each other to close more deals.

I would love to cross-share listings with you. If you share your properties with me, I will list them on my website (Call Tiger) as "Indirect listings." If a property comes directly from an owner, I will mark it clearly as a "Direct listing."

By building a little trust between us, we can both do a lot more business.`,
  signoffClosing: 'Best regards,',
  signoffName: 'Manjunath T R',
  signoffTitle: 'Founder, Call Tiger Real Estate Network',
  conciergePhone: '+91 98450 00000',
  whatsappNumber: '919845000000',
  leadWhatsAppNumber: '919740402975' // Specific number from Page 10 wireframe: 9740402975
};

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. Properties
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading properties:', e);
    }
    return DEFAULT_PROPERTIES;
  });

  // 2. Areas (100+ Bangalore areas from bangaloreAreas.js)
  const [areas, setAreas] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AREAS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading areas:', e);
    }
    return DEFAULT_AREA_NAMES;
  });

  // 3. Founder's Letter
  const [founderLetter, setFounderLetter] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LETTER);
      if (saved) return { ...DEFAULT_FOUNDER_LETTER, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Error reading letter:', e);
    }
    return DEFAULT_FOUNDER_LETTER;
  });

  // 4. Enquiries & Requirement Submissions
  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return [];
  });

  // 5. Navigation & View Routing
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'admin' | 'premium-areas' | 'all-areas' | 'export' | listing keys
  const [historyStack, setHistoryStack] = useState([]);
  const [activeAreaFilter, setActiveAreaFilter] = useState('ALL');

  // 6. Theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  });

  // 7. Toast Message
  const [toastMessage, setToastMessage] = useState('');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(areas));
  }, [areas]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LETTER, JSON.stringify(founderLetter));
  }, [founderLetter]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Methods
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigateTo = (viewName, preselectedArea = 'ALL') => {
    setHistoryStack(prev => [...prev, currentView]);
    setCurrentView(viewName);
    if (preselectedArea) {
      setActiveAreaFilter(preselectedArea);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (historyStack.length > 0) {
      const prev = historyStack[historyStack.length - 1];
      setHistoryStack(historyStack.slice(0, -1));
      setCurrentView(prev);
    } else {
      setCurrentView('home');
      setHistoryStack([]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setCurrentView('home');
    setHistoryStack([]);
    setActiveAreaFilter('ALL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addProperty = (prop) => {
    setProperties(prev => [prop, ...prev]);
    showToast(`Mandate ${prop.id} published live!`);
  };

  const updateProperty = (updatedProp) => {
    setProperties(prev => prev.map(p => (p.id === updatedProp.id ? updatedProp : p)));
    showToast(`Mandate ${updatedProp.id} updated!`);
  };

  const deleteProperty = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    showToast(`Property ${id} deleted from inventory.`);
  };

  const addArea = (areaName) => {
    const trimmed = areaName.trim();
    if (!trimmed) return;
    if (!areas.some(a => a.toLowerCase() === trimmed.toLowerCase())) {
      setAreas(prev => [trimmed, ...prev]);
      showToast(`Area "${trimmed}" added to master database.`);
    }
  };

  const removeArea = (areaName) => {
    setAreas(prev => prev.filter(a => a !== areaName));
    showToast(`Area "${areaName}" removed.`);
  };

  const updateFounderLetter = (data) => {
    setFounderLetter(prev => ({ ...prev, ...data }));
    showToast("Founder's Letter updated.");
  };

  const addEnquiry = (enquiryData) => {
    const newEnq = {
      id: 'ENQ-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      ...enquiryData
    };
    setEnquiries(prev => [newEnq, ...prev]);
    showToast("Your requirement has been sent to Manjunath T R!");
    return newEnq;
  };

  const resetToDefaults = () => {
    setProperties(DEFAULT_PROPERTIES);
    setAreas(DEFAULT_AREA_NAMES);
    setFounderLetter(DEFAULT_FOUNDER_LETTER);
    showToast("Demo inventory restored to defaults.");
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        areas,
        premiumAreas: PREMIUM_AREA_NAMES,
        founderLetter,
        enquiries,
        currentView,
        activeAreaFilter,
        setActiveAreaFilter,
        theme,
        toastMessage,
        showToast,
        toggleTheme,
        navigateTo,
        goBack,
        goHome,
        addProperty,
        updateProperty,
        deleteProperty,
        addArea,
        removeArea,
        updateFounderLetter,
        addEnquiry,
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

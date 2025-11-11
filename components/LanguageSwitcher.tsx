import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { VnFlagIcon, EnFlagIcon, ChevronDownIcon } from './Icons';

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (lang: 'vi' | 'en') => {
    setLocale(lang);
    setIsOpen(false);
  };

  const languages = {
    vi: { name: 'Tiếng Việt', Icon: VnFlagIcon },
    en: { name: 'English', Icon: EnFlagIcon },
  };

  const CurrentLangIcon = languages[locale].Icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-m365-primary"
      >
        <CurrentLangIcon className="w-5 h-5 rounded-sm" />
        <span className="text-sm font-medium text-gray-700">{locale.toUpperCase()}</span>
        <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <ul className="py-1">
            <li
              onClick={() => selectLanguage('vi')}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-m365-light cursor-pointer"
            >
              <VnFlagIcon className="w-5 h-5 mr-3 rounded-sm" />
              <span>Tiếng Việt</span>
            </li>
            <li
              onClick={() => selectLanguage('en')}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-m365-light cursor-pointer"
            >
              <EnFlagIcon className="w-5 h-5 mr-3 rounded-sm" />
              <span>English</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

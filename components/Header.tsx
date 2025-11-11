import React from 'react';
import { BriefcaseIcon, PhoneIcon } from './Icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useI18n } from '../contexts/I18nContext';

export const Header: React.FC = () => {
  const { t } = useI18n();
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
         <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BriefcaseIcon className="w-8 h-8 text-m365-primary" />
              <div>
                <span className="text-xl font-bold text-m365-primary">
                  {t('headerTitle')}
                </span>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                   <PhoneIcon className="w-3 h-3 mr-1.5"/>
                   <span>{t('contactInfo')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 hidden sm:block">{t('headerWelcome')}</span>
              <img
                src="https://i.pravatar.cc/40?u=a042581f4e29026704d"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-m365-primary"
              />
              <LanguageSwitcher />
            </div>
        </div>
      </div>
    </header>
  );
};

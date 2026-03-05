import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, Moon, Sun } from 'lucide-react';
import { CoreButton } from '@/core/components/buttons';
import { SearchBar } from '@/core/components/inputs/searchbar.component';
import { CoreDropdownMenu, type CoreDropdownMenuItem } from '@/core/components/dropdown/coreDropdownMenu';
import { useTheme } from '@app/providers/theme/hooks';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const { mode, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language.toUpperCase();

  const features = [
    { key: 'users.title', namespace: 'users', path: '/users' },
    { key: 'formBuilder.title', namespace: 'formBuilder', path: '/forms' },
    { key: 'integrations.title', namespace: 'integrations', path: '/integrations' },
    { key: 'condLogic.title', namespace: 'condLogic', path: '/conditional-logic' },
  ];

  const featuresItems: CoreDropdownMenuItem[] = features.map((feature) => ({
    id: feature.path,
    label: t(feature.key, { ns: feature.namespace }),
    onClick: () => navigate(feature.path),
  }));

  const languageItems: CoreDropdownMenuItem[] = [
    {
      id: 'en',
      label: 'English',
      onClick: () => handleLanguageChange('en'),
      selected: i18n.language === 'en',
    },
    {
      id: 'fr',
      label: 'Français',
      onClick: () => handleLanguageChange('fr'),
      selected: i18n.language === 'fr',
    },
  ];

  return (
    <header style={{
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      transition: 'background-color 200ms, color 200ms, border-color 200ms'
    }}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section: Logo and Search */}
        <div className="flex items-center gap-8 flex-1">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
              background: `linear-gradient(to bottom right, var(--primary-color), var(--primary-color))`
            }}>
              <span className="font-bold text-lg" style={{ color: 'var(--bg-primary)' }}>M</span>
            </div>
            <span className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">{t('header.monorepo')}</span>
          </div>

          {/* Search Bar */}
          <SearchBar
            type="text"
            placeholder={t('common.search') || 'Search...'}
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-9 text-sm"
          />
        </div>

        {/* Right Section: Theme, Features, and Language Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <CoreButton
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center gap-2"
            title={t('header.toggleTheme')}
          >
            {mode === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </CoreButton>

          {/* Features Dropdown */}
          <CoreDropdownMenu
            trigger={
              <CoreButton
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <Menu className="w-4 h-4" />
                <span>{t('header.features')}</span>
              </CoreButton>
            }
            items={featuresItems}
            align="end"
          />

          {/* Language Dropdown */}
          <CoreDropdownMenu
            trigger={
              <CoreButton
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLanguage}</span>
              </CoreButton>
            }
            items={languageItems}
            align="end"
          />
        </div>
      </div>
    </header>
  );
};

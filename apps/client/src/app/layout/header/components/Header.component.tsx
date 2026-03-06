import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, Moon, Sun } from 'lucide-react';
import { CoreButton } from '@/core/components/buttons';
import { SearchBar } from '@/core/components/inputs/searchbar.component';
import { CoreDropdownMenu, type CoreDropdownMenuItem } from '@/core/components/dropdown/coreDropdownMenu';
import { useTheme } from '@app/providers/theme/hooks';

interface SearchItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const { mode, toggleTheme } = useTheme();
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language.toUpperCase();

  const features = [
    { key: 'users.title', namespace: 'users', path: '/users', label: 'Users' },
    { key: 'formBuilder.title', namespace: 'formBuilder', path: '/forms', label: 'Form Builder' },
    { key: 'integrations.title', namespace: 'integrations', path: '/integrations', label: 'Integrations' },
    { key: 'condLogic.title', namespace: 'condLogic', path: '/conditional-logic', label: 'Conditional Logic' },
  ];

  const searchItems: SearchItem[] = features.map((feature) => ({
    id: feature.path,
    label: t(feature.key, { ns: feature.namespace, defaultValue: feature.label }),
    onClick: () => navigate(feature.path),
  }));

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

  const handleSearchToggle = () => {
    setIsSearchEnabled(!isSearchEnabled);
  };

  const handleItemSelect = (_item: SearchItem) => {
    // Item selection is handled by the onClick in the item
  };

  return (
    <header className='w-full border-b-2 border-accent'>
      <div className="flex items-center justify-between px-6 py-2">
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

          {/* Search Bar - conditionally shown */}
          {isSearchEnabled && (
            <SearchBar
              items={searchItems}
              onItemSelect={handleItemSelect}
              placeholder={t('common.search') || 'Search features...'}
            />
          )}
        </div>

        {/* Right Section: Search Toggle, Theme, Features, and Language Controls */}
        <div className="flex items-center gap-2">
          {/* Search Toggle Button */}
          <CoreButton
            variant={isSearchEnabled ? "default" : "outline"}
            size="sm"
            onClick={handleSearchToggle}
            title={t('header.toggleSearch', 'Toggle search')}
            aria-label={t('header.toggleSearch', 'Toggle search')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </CoreButton>

          {/* Theme Toggle Button */}
          <CoreButton
            variant="default"
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
                variant="default"
                size="sm"
                className="flex items-center gap-2 text-sm"
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
                variant="default"
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

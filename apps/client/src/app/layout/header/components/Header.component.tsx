import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CircleUserRound, Globe, LayoutGrid, Moon, Sun } from 'lucide-react';
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
  const [isSearchEnabled] = useState(true);

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

  const accountMenuConfig = [
    { id: 'account-label', labelKey: 'header.accountMenu', isLabel: true },
    { id: 'profile', labelKey: 'header.profile', path: '/users' },
    { id: 'settings', labelKey: 'header.settings' },
    { id: 'preferences', labelKey: 'header.preferences' },
    { id: 'account-separator', separator: true },
    { id: 'sign-out', labelKey: 'header.signOut' },
  ] as const;

  const accountItems: CoreDropdownMenuItem[] = accountMenuConfig.map((item) => {
    if ('separator' in item) {
      return {
        id: item.id,
        label: item.id,
        separator: true,
      };
    }

    const translatedLabel = t(item.labelKey);

    return {
      id: item.id,
      label: translatedLabel,
      isLabel: 'isLabel' in item ? item.isLabel : false,
      onClick: 'path' in item && item.path ? () => navigate(item.path) : undefined,
    };
  });

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

          {/* Features Dropdown */}
          <CoreDropdownMenu
            trigger={
              <CoreButton
                variant="icon"
                size="icon"
                className="flex items-center gap-2 text-sm"
              >
                <LayoutGrid className="w-4 h-4" />
              </CoreButton>
            }
            items={featuresItems}
            align="end"
          />

        </div>

        {/* Right Section: Search Toggle, Theme, Features, and Language Controls */}
        <div className="flex items-center gap-2">

          {/* Theme Toggle Button */}
          <CoreButton
            variant="default"
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

          {/* Language Dropdown */}
          <CoreDropdownMenu
            trigger={
              <CoreButton
                variant="default"
                className="flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLanguage}</span>
              </CoreButton>
            }
            items={languageItems}
            align="end"
          />

          {/* Account Dropdown */}
          <CoreDropdownMenu
            trigger={
              <CoreButton
                variant="default"
                className="flex items-center gap-2"
              >
                <CircleUserRound className="w-4 h-4" />
                <span>{t('header.account')}</span>
              </CoreButton>
            }
            items={accountItems}
            align="end"
          />
        </div>
      </div>
    </header>
  );
};

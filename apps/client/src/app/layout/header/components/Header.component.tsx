import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CircleUserRound, Globe, LayoutGrid, Moon, Sun } from 'lucide-react';
import { Button } from '@/core/shadcn/components/ui';
import { SearchBar } from '@/core/components/inputs/searchbar.component';
import { CoreDropdownMenu, type CoreDropdownMenuItem } from '@/core/components/dropdown/coreDropdownMenu';
import { authClient } from '@app/providers/auth';
import { useTheme } from '@app/providers/theme/hooks';
import { OrganizationSwitcher } from './OrganizationSwitcher.component';

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

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate('/login', { replace: true });
  };

  const currentLanguage = i18n.language.toUpperCase();

  const features = [
    { translationKey: 'formBuilder.page.title', namespace: 'formBuilder', path: '/forms', label: 'Form Builder' },
    { translationKey: 'integrations.page.title', namespace: 'integrations', path: '/integrations', label: 'Integrations' },
    { translationKey: 'title', namespace: 'condLogic', path: '/conditional-logic', label: 'Conditional Logic' },
  ];

  const searchItems: SearchItem[] = features.map((feature) => ({
    id: feature.path,
    label: t(feature.translationKey, { ns: feature.namespace, defaultValue: feature.label }),
    onClick: () => navigate(feature.path),
  }));

  const featuresItems: CoreDropdownMenuItem[] = features.map((feature) => ({
    id: feature.path,
    label: t(feature.translationKey, { ns: feature.namespace, defaultValue: feature.label }),
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
    { id: 'users', labelKey: 'users.page.title', path: '/users', namespace: 'users' },
    { id: 'organizations', labelKey: 'users.organizations.page.title', path: '/account/organizations', namespace: 'users' },
    { id: 'profile', labelKey: 'header.profile', path: '/account/profile' },
    { id: 'settings', labelKey: 'header.settings', path: '/account/settings' },
    { id: 'preferences', labelKey: 'header.preferences', path: '/account/preferences' },
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

    const translatedLabel = t(item.labelKey, {
      ns: 'namespace' in item ? item.namespace : undefined,
      defaultValue: item.labelKey,
    });

    return {
      id: item.id,
      label: translatedLabel,
      isLabel: 'isLabel' in item ? item.isLabel : false,
      onClick:
        item.id === 'sign-out'
          ? handleSignOut
          : 'path' in item && item.path
            ? () => navigate(item.path)
            : undefined,
    };
  });

  const handleItemSelect = (_item: SearchItem) => {
    // Item selection is handled by the onClick in the item
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section: Logo and Search */}
        <div className="flex items-center gap-8 flex-1">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm ring-1 ring-border/40">
              <span className="text-base font-bold">M</span>
            </div>
            <span className="text-lg font-semibold text-foreground">{t('header.monorepo')}</span>
          </div>

          {/* Search Bar - conditionally shown */}
          {isSearchEnabled && (
            <SearchBar
              items={searchItems}
              onItemSelect={handleItemSelect}
              placeholder={t('common.search', { defaultValue: 'Search features...' })}
            />
          )}

          {/* Features Dropdown */}
          <CoreDropdownMenu
            trigger={
              <Button
                variant="icon"
                size="icon"
                className="flex items-center gap-2 text-sm"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
            }
            items={featuresItems}
            align="end"
          />

        </div>

        {/* Right Section: Search Toggle, Theme, Features, and Language Controls */}
        <div className="flex items-center gap-2">
          <OrganizationSwitcher />

          {/* Theme Toggle Button */}
          <Button
            variant="default"
            onClick={toggleTheme}
            className="gap-2"
            title={t('header.toggleTheme')}
          >
            {mode === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* Language Dropdown */}
          <CoreDropdownMenu
            trigger={
              <Button
                variant="default"
                className="gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLanguage}</span>
              </Button>
            }
            items={languageItems}
            align="end"
          />

          {/* Account Dropdown */}
          <CoreDropdownMenu
            trigger={
              <Button
                variant="default"
                className="gap-2"
              >
                <CircleUserRound className="w-4 h-4" />
                <span>{t('header.account')}</span>
              </Button>
            }
            items={accountItems}
            align="end"
          />
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Globe, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@core/components/shadcn/Button.component';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@core/components/shadcn/DropdownMenu.component';
import { Input } from '@core/components/shadcn/Input.component';
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
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <Input
              type="text"
              placeholder={t('common.search') || 'Search...'}
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-9 text-sm"
            />
          </div>
        </div>

        {/* Right Section: Theme, Features, and Language Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <Button
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
          </Button>

          {/* Features Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <Menu className="w-4 h-4" />
                <span>{t('header.features')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {features.map((feature) => (
                <DropdownMenuItem
                  key={feature.path}
                  onClick={() => navigate(feature.path)}
                >
                  {t(feature.key, { ns: feature.namespace })}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLanguage}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleLanguageChange('en')}
                className={i18n.language === 'en' ? 'bg-neutral-100' : ''}
              >
                <span>English</span>
                {i18n.language === 'en' && (
                  <span className="ml-2 text-blue-600">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleLanguageChange('fr')}
                className={i18n.language === 'fr' ? 'bg-neutral-100' : ''}
              >
                <span>Français</span>
                {i18n.language === 'fr' && (
                  <span className="ml-2 text-blue-600">✓</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

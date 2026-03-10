import { useTranslation } from 'react-i18next';
import { useTheme } from '@app/providers/theme/hooks';
import { AVAILABLE_THEMES } from '@app/providers/theme/store/theme.slice';
import { CoreButton } from '@/core/components/buttons';

export const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { currentTheme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          {t('devtools.selectTheme')}
        </h3>
        <div className="flex flex-col gap-2">
          {AVAILABLE_THEMES.map((theme) => (
            <CoreButton
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              variant={currentTheme.id === theme.id ? 'default' : 'outline'}
              className="w-full justify-start text-left"
            >
              <div className="font-medium">{theme.name}</div>
            </CoreButton>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-secondary/30 p-3 transition-colors">
        <div className="mb-1 text-xs text-muted-foreground">
          {t('devtools.currentTheme')}
        </div>
        <div className="text-sm font-medium text-foreground">{currentTheme.name}</div>
      </div>
    </div>
  );
};

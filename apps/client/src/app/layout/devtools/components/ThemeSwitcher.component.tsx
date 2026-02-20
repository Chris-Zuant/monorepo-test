import { useTranslation } from 'react-i18next';
import { useTheme } from '@app/providers/theme/hooks';
import { AVAILABLE_THEMES } from '@app/providers/theme/store/theme.slice';
import { Button } from '@core/components/shadcn/Button.component';

export const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { currentTheme, setTheme } = useTheme();

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{t('devtools.selectTheme')}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {AVAILABLE_THEMES.map((theme) => (
            <Button
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              variant={currentTheme.id === theme.id ? 'default' : 'outline'}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              <div style={{ fontWeight: '500' }}>{theme.name}</div>
            </Button>
          ))}
        </div>
      </div>

      {/* Current Theme Info */}
      <div style={{
        padding: '0.75rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '0.5rem',
        border: '1px solid var(--border-color)',
        transition: 'all 200ms'
      }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{t('devtools.currentTheme')}</div>
        <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-primary)' }}>{currentTheme.name}</div>
      </div>
    </div>
  );
};

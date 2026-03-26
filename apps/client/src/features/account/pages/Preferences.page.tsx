import { useTranslation } from 'react-i18next';

export default function PreferencesPage() {
  const { t } = useTranslation('users');

  return (
    <div className="w-full p-6">
      <h1 className="mb-2 text-3xl font-bold">{t('users.preferences.page.title')}</h1>
      <p className="mb-6 text-muted-foreground">{t('users.preferences.page.description')}</p>

      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">{t('users.preferences.placeholder')}</p>
      </div>
    </div>
  );
}

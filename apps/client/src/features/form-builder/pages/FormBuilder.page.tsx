import React from 'react';
import { useTranslation } from 'react-i18next';

export const FormBuilderPage: React.FC = () => {
  const { t } = useTranslation('formBuilder');

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-4">{t('formBuilder.page.title')}</h1>
      <p className="text-gray-600">{t('formBuilder.page.description')}</p>
    </div>
  );
};

export default FormBuilderPage;

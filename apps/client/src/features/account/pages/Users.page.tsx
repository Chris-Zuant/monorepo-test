import React from 'react';
import { useTranslation } from 'react-i18next';
import UserCard from '../components/UserCard.component';

export const UsersPage: React.FC = () => {
  const { t } = useTranslation('users');

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-4">{t('users.page.title')}</h1>
      <p className="text-gray-600 mb-6">{t('users.page.description')}</p>
      <UserCard />
    </div>
  );
};

export default UsersPage;


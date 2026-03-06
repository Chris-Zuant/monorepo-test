import React from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '@/core/components/inputs/searchbar.component';
import { Button } from '@/core/shadcn/components/ui/Button.component';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from '@/core/shadcn/components/ui/Card.component';
import { Badge } from '@/core/shadcn/components/ui/Badge.component';
import { CreateFormDialog } from '../components/CreateFormDialog.component';

export const FormBuilderPage: React.FC = () => {
  const { t } = useTranslation('formBuilder');

  const fakeForms = React.useMemo(
    () => [
      {
        id: '1',
        name: 'Event Registration',
        image: 'https://via.placeholder.com/300x200',
        dateStart: '2026-03-01',
        dateEnd: '2026-03-10',
        inProgress: true,
      },
      {
        id: '2',
        name: 'Customer Feedback',
        image: 'https://via.placeholder.com/300x200',
        dateStart: '2026-04-05',
        dateEnd: '2026-04-15',
        inProgress: false,
      },
      {
        id: '3',
        name: 'Survey Form',
        image: 'https://via.placeholder.com/300x200',
        dateStart: '2026-05-10',
        dateEnd: '2026-05-20',
        inProgress: true,
      },
    ],
    []
  );

  const [query, setQuery] = React.useState('');
  const filteredForms = React.useMemo(
    () =>
      fakeForms.filter((f) =>
        f.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [fakeForms, query]
  );

  return (
    <div className="w-full p-6">
      {/* header: title, search, new form button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t('forms', 'Forms')}</h1>

        <div className="flex-1 flex justify-center px-4">
          <SearchBar
            onChange={setQuery}
            placeholder={t('formBuilder.page.searchPlaceholder', 'Search forms...')}
          />
        </div>

        <CreateFormDialog>
          <Button variant="default">{t('formBuilder.page.newForm', 'New Form')}</Button>
        </CreateFormDialog>
      </div>

      {/* cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredForms.map((form) => (
          <Card key={form.id}>
            <img
              src={form.image}
              alt={form.name}
              className="w-full h-32 object-cover"
            />
            <CardHeader>
              <CardTitle>{form.name}</CardTitle>
              <CardDescription>
                {form.dateStart} – {form.dateEnd}
              </CardDescription>
              <CardAction>
                {form.inProgress && (
                  <Badge variant="confirm">{t('inProgress', 'In progress')}</Badge>
                )}
              </CardAction>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FormBuilderPage;

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/shadcn/components/ui/Dialog.component';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/core/shadcn/components/ui/Tabs.component';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/core/shadcn/components/ui/Card.component';
import { Button } from '@/core/shadcn/components/ui/Button.component';
import { Badge } from '@/core/shadcn/components/ui/Badge.component';
import { Plus, FileText, Users, Calendar, CheckSquare } from 'lucide-react';

interface CreateFormDialogProps {
  children: React.ReactNode;
}

const FORM_TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank Form',
    description: 'Start with a completely empty form',
    icon: FileText,
  },
  {
    id: 'contact',
    name: 'Contact Form',
    description: 'Collect contact information and messages',
    icon: Users,
  },
  {
    id: 'event',
    name: 'Event Registration',
    description: 'Register attendees for events',
    icon: Calendar,
  },
  {
    id: 'survey',
    name: 'Survey',
    description: 'Create polls and gather feedback',
    icon: CheckSquare,
  },
];

const EXISTING_FORMS = [
  {
    id: '1',
    name: 'Customer Feedback Survey',
    description: 'Monthly customer satisfaction survey',
    lastModified: '2026-03-01',
    responses: 45,
  },
  {
    id: '2',
    name: 'Event Registration Form',
    description: 'Registration for upcoming conference',
    lastModified: '2026-02-28',
    responses: 23,
  },
  {
    id: '3',
    name: 'Product Feedback',
    description: 'Gather feedback on new product features',
    lastModified: '2026-02-25',
    responses: 67,
  },
  {
    id: '4',
    name: 'Newsletter Signup',
    description: 'Email newsletter subscription form',
    lastModified: '2026-02-20',
    responses: 89,
  },
];

export const CreateFormDialog: React.FC<CreateFormDialogProps> = ({ children }) => {
  const { t } = useTranslation('formBuilder');

  const handleCreateFromTemplate = (templateId: string) => {
    console.log('Creating form from template:', templateId);
    // TODO: Implement form creation logic
  };

  const handleCloneForm = (formId: string) => {
    console.log('Cloning form:', formId);
    // TODO: Implement form cloning logic
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-full min-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {t('createForm.title', 'Create New Form')}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="scratch" className="w-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scratch">
              {t('createForm.fromScratch', 'From Scratch')}
            </TabsTrigger>
            <TabsTrigger value="clone">
              {t('createForm.cloneExisting', 'Clone Existing')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scratch" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 grid-auto-rows">
              {FORM_TEMPLATES.map((template) => {
                const IconComponent = template.icon;
                return (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow h-40"
                    onClick={() => handleCreateFromTemplate(template.id)}
                  >
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="clone" className="mt-6">
            <div className="space-y-3">
              {EXISTING_FORMS.map((form) => (
                <Card
                  key={form.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleCloneForm(form.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{form.name}</CardTitle>
                        <CardDescription className="text-sm mb-2">
                          {form.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Last modified: {form.lastModified}</span>
                          <Badge variant="secondary" className="text-xs">
                            {form.responses} responses
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloneForm(form.id);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Clone
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
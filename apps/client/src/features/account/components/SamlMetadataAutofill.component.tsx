import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Textarea } from '@/core/shadcn/components/ui';

const SAML_METADATA_NS = 'urn:oasis:names:tc:SAML:2.0:metadata';
const XML_SIGNATURE_NS = 'http://www.w3.org/2000/09/xmldsig#';
const HTTP_REDIRECT_BINDING = 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect';
const HTTP_POST_BINDING = 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST';

export interface ParsedSamlMetadataValues {
  metadataXml: string;
  providerDomain: string;
  providerEntryPoint: string;
  identityProviderEntityId: string;
  providerCertificate: string;
}

interface SamlMetadataAutofillProps {
  value: string;
  placeholder: string;
  hintKey: string;
  onChange: (value: string) => void;
  onParsed: (values: ParsedSamlMetadataValues) => void;
}

function getFirstElementText(document: XMLDocument, namespace: string, localName: string) {
  const element = document.getElementsByTagNameNS(namespace, localName).item(0);
  return element?.textContent?.replace(/\s+/g, '') ?? '';
}

function parseSamlMetadata(metadataXml: string): ParsedSamlMetadataValues {
  const parser = new DOMParser();
  const document = parser.parseFromString(metadataXml, 'application/xml');
  const parserError = document.getElementsByTagName('parsererror').item(0);

  if (parserError) {
    throw new Error('users.organizations.errors.ssoMetadataInvalid');
  }

  const entityDescriptor = document.getElementsByTagNameNS(SAML_METADATA_NS, 'EntityDescriptor').item(0);
  const identityProviderEntityId = entityDescriptor?.getAttribute('entityID')?.trim() ?? '';

  const singleSignOnServices = Array.from(
    document.getElementsByTagNameNS(SAML_METADATA_NS, 'SingleSignOnService')
  );
  const preferredSingleSignOnService =
    singleSignOnServices.find((service) => service.getAttribute('Binding') === HTTP_REDIRECT_BINDING) ??
    singleSignOnServices.find((service) => service.getAttribute('Binding') === HTTP_POST_BINDING) ??
    singleSignOnServices[0];

  const providerEntryPoint = preferredSingleSignOnService?.getAttribute('Location')?.trim() ?? '';
  const providerCertificate = getFirstElementText(document, XML_SIGNATURE_NS, 'X509Certificate');
  const providerDomain = providerEntryPoint ? new URL(providerEntryPoint).hostname : '';

  if (!identityProviderEntityId || !providerEntryPoint || !providerCertificate) {
    throw new Error('users.organizations.errors.ssoMetadataIncomplete');
  }

  return {
    metadataXml,
    providerDomain,
    providerEntryPoint,
    identityProviderEntityId,
    providerCertificate,
  };
}

export function SamlMetadataAutofill({
  value,
  placeholder,
  hintKey,
  onChange,
  onParsed,
}: SamlMetadataAutofillProps) {
  const { t } = useTranslation('users');
  const [parseErrorKey, setParseErrorKey] = useState<string | null>(null);

  const handleAutofill = () => {
    try {
      const parsedValues = parseSamlMetadata(value.trim());
      onParsed(parsedValues);
      setParseErrorKey(null);
    } catch (error) {
      setParseErrorKey(error instanceof Error ? error.message : 'users.organizations.errors.ssoMetadataInvalid');
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {t('users.organizations.sso.fields.metadataXml')}
      </label>
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-40"
      />
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="outline" onClick={handleAutofill} disabled={value.trim().length === 0}>
          {t('users.organizations.sso.autofill.submit')}
        </Button>
        <p className="text-xs text-muted-foreground">{t(hintKey)}</p>
      </div>
      {parseErrorKey ? <p className="text-xs text-destructive">{t(parseErrorKey)}</p> : null}
    </div>
  );
}

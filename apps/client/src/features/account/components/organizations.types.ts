export interface OrganizationInvitation {
  id: string;
  email: string;
  role: string;
  status: string;
  createdAt: string | Date;
  expiresAt: string | Date;
  organizationId?: string;
  organizationName?: string;
  organization?: {
    id?: string;
    name?: string;
    slug?: string;
  };
}

export interface OrganizationSsoProvider {
  id?: string;
  providerId: string;
  type?: string;
  issuer: string;
  domain: string;
  organizationId?: string;
  domainVerified?: boolean;
  spMetadataUrl?: string;
}

export interface SsoProvidersResponse {
  providers?: OrganizationSsoProvider[];
}

export const SAMLTEST_DEFAULTS = {
  providerId: 'samltest',
  issuer: 'https://samltest.id/saml/idp',
  domain: 'samltest.local',
  entryPoint: 'https://samltest.id/idp/profile/SAML2/Redirect/SSO',
  callbackUrl: '/users',
  audience: 'http://localhost:3000',
};

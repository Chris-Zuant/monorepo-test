import { createRequire } from "node:module";

export const ensureSamlifyCompat = () => {
  const localRequire = createRequire(__filename);
  const ssoEntry = localRequire.resolve("@better-auth/sso");
  const ssoRequire = createRequire(ssoEntry);
  const samlModule = ssoRequire("samlify") as {
    SPMetadata?: unknown;
    IdPMetadata?: unknown;
    default?: {
      SPMetadata?: unknown;
      IdPMetadata?: unknown;
    };
  };

  if (!samlModule.SPMetadata && samlModule.default?.SPMetadata) {
    samlModule.SPMetadata = samlModule.default.SPMetadata;
  }

  if (!samlModule.IdPMetadata && samlModule.default?.IdPMetadata) {
    samlModule.IdPMetadata = samlModule.default.IdPMetadata;
  }
};

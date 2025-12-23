import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const { signIn, signUp, useSession, $ERROR_CODES } = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

type ErrorTypes = Partial<
  Record<
    keyof typeof $ERROR_CODES,
    {
      "pt-br": string;
    }
  >
>;

const errorCodes = {
  USER_NOT_FOUND: {
    "pt-br": "Usuário não encontrado",
  },
  FAILED_TO_CREATE_USER: {
    "pt-br": "Falha ao criar usuário",
  },
  FAILED_TO_CREATE_SESSION: {
    "pt-br": "Falha ao criar sessão",
  },
  FAILED_TO_UPDATE_USER: {
    "pt-br": "Falha ao atualizar usuário",
  },
  FAILED_TO_GET_SESSION: {
    "pt-br": "Falha ao obter sessão",
  },
  INVALID_PASSWORD: {
    "pt-br": "Senha inválida",
  },
  INVALID_EMAIL: {
    "pt-br": "E-mail inválido",
  },
  INVALID_EMAIL_OR_PASSWORD: {
    "pt-br": "E-mail ou senha inválidos",
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    "pt-br": "Conta social já vinculada",
  },
  PROVIDER_NOT_FOUND: {
    "pt-br": "Provedor não encontrado",
  },
  INVALID_TOKEN: {
    "pt-br": "Token inválido",
  },
  ID_TOKEN_NOT_SUPPORTED: {
    "pt-br": "id_token não suportado",
  },
  FAILED_TO_GET_USER_INFO: {
    "pt-br": "Falha ao obter informações do usuário",
  },
  USER_EMAIL_NOT_FOUND: {
    "pt-br": "E-mail do usuário não encontrado",
  },
  EMAIL_NOT_VERIFIED: {
    "pt-br": "E-mail não verificado",
  },
  PASSWORD_TOO_SHORT: {
    "pt-br": "Senha muito curta",
  },
  PASSWORD_TOO_LONG: {
    "pt-br": "Senha muito longa",
  },
  USER_ALREADY_EXISTS: {
    "pt-br": "Usuário já existe",
  },
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
    "pt-br": "Usuário já existe. Use outro e-mail.",
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    "pt-br": "O e-mail não pode ser atualizado",
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    "pt-br": "Conta de credenciais não encontrada",
  },
  SESSION_EXPIRED: {
    "pt-br": "Sessão expirada. Reautentique para continuar.",
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    "pt-br": "Não é possível desvincular sua última conta",
  },
  ACCOUNT_NOT_FOUND: {
    "pt-br": "Conta não encontrada",
  },
  USER_ALREADY_HAS_PASSWORD: {
    "pt-br": "Usuário já possui senha. Informe-a para excluir a conta.",
  },
} satisfies ErrorTypes;

export const getErrorMessage = (code: string, lang = "pt-br" as "pt-br") => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes][lang];
  }
  return "";
};

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const { signIn, signUp, useSession, $ERROR_CODES } = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

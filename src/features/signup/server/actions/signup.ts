"use server"
import { checkUsernameDb } from "@/features/signup/server/db/signup";

export async function checkUsername(username: string) {
  if (!username || username.length < 3) return { available: false };

  const existingUser = await checkUsernameDb(username);

  return {
    available: !existingUser,
  };
}

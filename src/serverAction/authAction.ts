'use server';

import { auth, signIn } from '@/app/auth';

export async function SignInFarcaster({
  message,
  signature,
  nonce,
  redirect,
}: {
  message: string;
  signature: string;
  nonce: string;
  redirect: boolean;
}) {
  return await signIn('credentials', {
    message,
    signature,
    nonce,
    redirect,
  });
}

export async function getSession() {
  return await auth();
}

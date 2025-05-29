'use server';

import { auth, signIn } from '@/app/auth';
import { sendFrameNotification } from '@/lib/notification-client';

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

export async function sendNotification({
  fid,
  title,
  body,
}: {
  fid: number;
  title: string;
  body: string;
}) {
  return await sendFrameNotification({
    fid,
    title,
    body,
  });
}

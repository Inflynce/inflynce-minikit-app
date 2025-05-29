import { createAppClient, viemConnector } from '@farcaster/auth-client';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

const appClient = createAppClient({
  relay: 'https://relay.farcaster.xyz',
  ethereum: viemConnector(),
});

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');

export async function POST(req: Request) {
  const body = await req.json();
  const { message, signature, nonce } = body;

  const domain = new URL(process.env.NEXT_PUBLIC_URL || '').hostname;

  const result = await appClient.verifySignInMessage({
    message,
    signature,
    nonce,
    domain,
  });

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid Farcaster signature' }, { status: 401 });
  }

  const token = await new SignJWT({
    fid: result.fid,
    address: result.data?.address,
    roles: ['user'],
    defaultRole: 'user',
    'https://hasura.io/jwt/claims': {
      'X-Hasura-Allowed-Roles': JSON.stringify(['user', 'anonymous']),
      'X-Hasura-Role': 'user',
      'X-Hasura-User-Id': result.fid.toString(),
    },
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(result.fid.toString())
    .setIssuedAt()
    .setExpirationTime('3h')
    .sign(JWT_SECRET);

  return NextResponse.json({ token });
}

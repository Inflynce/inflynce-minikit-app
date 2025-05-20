import { Redis } from '@upstash/redis';

if (!process.env.REDIS_URL || !process.env.REDIS_TOKEN) {
  console.warn(
    'REDIS_URL or REDIS_TOKEN environment variable is not defined, please add to enable background notifications and webhooks.'
  );
}

console.log('REDIS_URL', process.env.REDIS_URL);
console.log('REDIS_TOKEN', process.env.REDIS_TOKEN);

export const redis =
  process.env.REDIS_URL && process.env.REDIS_TOKEN
    ? new Redis({
        url: process.env.REDIS_URL,
        token: process.env.REDIS_TOKEN,
      })
    : null;

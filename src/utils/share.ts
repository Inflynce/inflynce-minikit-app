import { sdk } from '@farcaster/frame-sdk';

const shareYesterdayEarn = async (fid: string) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_URL}/earnings/${fid}`;
  const shareText = `Check out my yesterday's earnings on @inflynce!`;
  await sdk.actions.composeCast({
    text: shareText,
    embeds: [shareUrl],
  });
};

export { shareYesterdayEarn };

import { ImageResponse } from 'next/og';

const BASE_URL = process.env.NEXT_PUBLIC_URL;
export const alt = 'Inflynce Early Inflyncer NFT';
export const size = {
  width: 600,
  height: 400,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { fid: string } }) {
  const imageUrl = `${BASE_URL}/Early_Inflyncer_NFT.png`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#fdf0dd',
          width: '100%',
          height: '100%',
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
        }}
      >
        <img src={imageUrl} alt="Early Inflyncer NFT" style={{ width: '100%', height: '100%' }} />
      </div>
    ),
    {
      ...size,
    }
  );
}

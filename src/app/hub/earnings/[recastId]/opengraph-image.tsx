import { ImageResponse } from 'next/og';
import { formatPoints } from '@/utils/formatters';
import { getYesterday } from '@/utils/dateUtils';
import { UUID } from 'crypto';

const BASE_URL = process.env.NEXT_PUBLIC_URL;
export const alt = 'Inflynce Profile';
export const size = {
  width: 600,
  height: 400,
};

export const contentType = 'image/png';

// Direct fetch function for server-side data fetching
async function fetchRecast(recastId: string) {
  try {
    const response = await fetch(process.env.GRAPHQL_URL ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetRecastByRecastId($recastId: uuid!) {
            boost_recast_records(
              where: { id: { _eq: $recastId } }
            ) {
              user {
                displayName
                fid
                pfpUrl
                username
              }
              earnedAmount
            }
          }
        `,
        variables: {
          recastId: recastId,
        },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.boost_recast_records[0];
  } catch (error) {
    console.error('Error fetching mindshare data:', error);
    return null;
  }
}

export default async function Image({ params }: { params: { recastId: string } }) {
  // Default fid value in case params.fid is undefined
  const recastId = params?.recastId || '0';

  // Fetch the font from a public URL
  let fontData;
  try {
    // Make sure your font is hosted somewhere publicly accessible
    const fontUrl = `${BASE_URL}/fonts/Jersey_20/Jersey20-Regular.ttf`;
    const fontResponse = await fetch(fontUrl);
    if (!fontResponse.ok) throw new Error('Failed to fetch font');
    const fontArrayBuffer = await fontResponse.arrayBuffer();
    fontData = Buffer.from(fontArrayBuffer);
  } catch (error) {
    console.error('Error loading font:', error);
    // Continue without the custom font
  }

  // Try to fetch data, but use fallback values if it fails
  const recast = await fetchRecast(recastId);
  console.log('recast', recast);

  if (!recast) {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            background: '#1e1e1e',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Earnings not found
        </div>
      ),
      {
        ...size,
      }
    );
  }

  const username = recast?.user?.username || `user_${recast?.user?.fid}`;
  const displayName = recast?.user?.displayName || 'Inflynce User';
  const pfpUrl = recast?.user?.pfpUrl || 'https://placekitten.com/200/200';

  // Logo URL - replace with your actual logo URL
  const logoUrl = `${BASE_URL}/cast_logo.png`;

  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#1e1e1e',
          width: '100%',
          height: '100%',
          position: 'relative',
          padding: '20px',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: '30px',
            gap: '10px',
            width: '100%',
          }}
        >
          <img
            src={logoUrl}
            width={24}
            height={24}
            alt="Inflynce Logo"
            style={{ objectFit: 'fill' }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              background: 'linear-gradient(90deg, #ff6b00, #ff9d00)',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Inflynce Hub
          </div>
        </div>
        {/* Content */}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
            gap: '20px',
          }}
        >
          <img
            src={pfpUrl}
            width={64}
            height={64}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
            }}
            alt={displayName}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 28,
                color: '#eee',
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              {displayName}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 14,
                color: '#666',
              }}
            >
              @{username}
            </div>
          </div>
        </div>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: '700',
            margin: '0 0 10px 0',
            color: '#FF6B00',
          }}
        >
          I shared and I earned:
        </h1>

        <div
          style={{
            margin: '8px 0',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <span style={{ fontSize: '56px', color: '#FF6B00', fontWeight: '700' }}>
            {recast?.earnedAmount}
          </span>
          <span
            style={{
              fontSize: '14px',
              color: '#666',
              alignSelf: 'flex-end',
              marginBottom: '12px',
            }}
          >
            USDC
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            color: '#666',
            fontSize: '12px',
            marginTop: '12px',
          }}
        >
          {currentDate}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Jersey',
          // @ts-ignore
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}

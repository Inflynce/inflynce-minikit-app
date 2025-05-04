import { ImageResponse } from 'next/og';
import { formatPoints } from '@/utils/formatters';

const BASE_URL = process.env.NEXT_PUBLIC_URL;
export const alt = 'Inflynce Profile';
export const size = {
  width: 600,
  height: 400,
};

export const contentType = 'image/png';

// Direct fetch function for server-side data fetching
async function fetchRankData(fid: string) {
  try {
    const response = await fetch(process.env.GRAPHQL_URL ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetRankByFid($fid: String!) {
            user_rank_view(
              where: {fid: {_eq: $fid}}
            ) {
              fid
              rank
              totalPoints
              user {
                username
                displayName
                pfpUrl
              }
            }
          }
        `,
        variables: {
          fid: fid || '0',
        },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.user_rank_view[0];
  } catch (error) {
    console.error('Error fetching mindshare data:', error);
    return null;
  }
}

export default async function Image({ params }: { params: { fid: string } }) {
  // Default fid value in case params.fid is undefined
  const fid = params?.fid || '0';
  console.log(fid);

  // Try to fetch data, but use fallback values if it fails
  const rankData = await fetchRankData(fid);
  console.log('rankData', rankData);

  // Use fallback values if data fetching failed
  const username = rankData?.user?.username || `user_${fid}`;
  const displayName = rankData?.user?.displayName || 'Inflynce User';
  const pfpUrl = rankData?.user?.pfpUrl || 'https://placekitten.com/200/200';
  const points = rankData?.totalPoints ?? 0;
  const formattedPoints = formatPoints(points);

  // Logo URL - replace with your actual logo URL
  const logoUrl = `${BASE_URL}/logo.png`;

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
          background: '#fdf0dd',
          width: '100%',
          height: '100%',
          position: 'relative',
          padding: '40px',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo and title in one centered row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: '30px',
            gap: '15px',
            width: '100%',
          }}
        >
          <img src={logoUrl} width={28} height={28} alt="Inflynce Logo" />
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Inflynce Rank
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <img
            src={pfpUrl}
            width={100}
            height={100}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #fff',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
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
                color: '#333',
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              {displayName}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                color: '#666',
              }}
            >
              @{username}
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '20px',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: '12px',
            }}
          >
            <span>Rank:</span>
            <span style={{ display: 'flex', fontWeight: 'bold', color: '#ff6b00' }}>
              #{rankData?.rank}
            </span>
          </div>

          <div
            style={{
              fontSize: 24,
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: '12px',
            }}
          >
            <span>Inflynce Points:</span>
            <span style={{ display: 'flex', fontWeight: 'bold', color: '#ff6b00' }}>
              {formattedPoints} IP
            </span>
          </div>
        </div>

        {/* Date centered at the bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '15px',
            left: '0',
            right: '0',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#666',
          }}
        >
          {currentDate}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

import { ImageResponse } from 'next/og';

const BASE_URL = process.env.NEXT_PUBLIC_URL;
export const alt = 'Inflynce Profile';
export const size = {
  width: 600,
  height: 400,
};

export const contentType = 'image/png';

// Direct fetch function for server-side data fetching
async function fetchMindshareData(fid: string) {
  try {
    const response = await fetch(process.env.GRAPHQL_URL ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetMindshareByFid($fid: String!) {
            getMindshareByFid(input: {fid: $fid}) {
              currentMindshare
              fid
              userInfo {
                displayName
                fid
                username
                pfpUrl
              }
            }
          }
        `,
        variables: {
          fid: fid || '0',
        },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.getMindshareByFid;
  } catch (error) {
    console.error('Error fetching mindshare data:', error);
    return null;
  }
}

// Add this function to fetch points data
async function fetchPointsData(fid: string) {
  try {
    const response = await fetch(process.env.GRAPHQL_URL ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetPointsByFid($fid: String!) {
            user_points_by_pk(fid: $fid) {
              totalPoints
            }
          }
        `,
        variables: {
          fid: fid || '0',
        },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    const result = await response.json();
    return result.data?.user_points_by_pk;
  } catch (error) {
    console.error('Error fetching points data:', error);
    return null;
  }
}

// Format points function (same as in PointsChip)
function formatPoints(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  } else {
    return value.toString();
  }
}

export default async function Image({ params }: { params: { fid: string } }) {
  // Default fid value in case params.fid is undefined
  const fid = params?.fid || '0';

  // Try to fetch data, but use fallback values if it fails
  let mindshareData, pointsData;
  try {
    [mindshareData, pointsData] = await Promise.all([
      fetchMindshareData(fid),
      fetchPointsData(fid),
    ]);
  } catch (error) {
    console.error('Error fetching data for OpenGraph image:', error);
    // Continue with null values, we'll use fallbacks below
  }

  // Use fallback values if data fetching failed
  const username = mindshareData?.userInfo?.username || `user_${fid}`;
  const displayName = mindshareData?.userInfo?.displayName || 'Inflynce User';
  const mindshareScore = mindshareData?.currentMindshare || 0;
  const pfpUrl = mindshareData?.userInfo?.pfpUrl || 'https://placekitten.com/200/200';
  const points = pointsData?.totalPoints ?? 0;
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
            Inflynce Profile
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
            <span>Mindshare Score:</span>
            <span style={{ display: 'flex', fontWeight: 'bold', color: '#ff6b00' }}>
              {(mindshareScore * 100).toFixed(2)}%
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

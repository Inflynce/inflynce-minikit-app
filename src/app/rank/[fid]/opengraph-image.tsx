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
      next: { revalidate: 3600 }, // Cache for 1 hour
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
  const rankData = await fetchRankData(fid);
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
          background: '#1e1e1e',
          width: '100%',
          height: '100%',
          position: 'relative',
          padding: '20px',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {/* Logo and title in one centered row */}
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
            Inflynce Rank
          </div>
        </div>

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
            marginBottom: '20px',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: '#666',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              padding: '8px',
              borderRadius: '12px',
              flex: 1,
              textAlign: 'center',
              minWidth: 0, // Allow content to shrink if needed
            }}
          >
            <span>Inflynce IP</span>
            <div
              style={{
                margin: '8px 0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '56px', color: '#FF6B00' }}>{formattedPoints}</span>
              <span
                style={{
                  fontSize: '14px',
                  color: '#666',
                  alignSelf: 'flex-end',
                  marginBottom: '12px',
                }}
              >
                IP
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: 24,
              color: '#666',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              padding: '8px',
              borderRadius: '12px',
              flex: 1,
            }}
          >
            <span>Rank</span>
            <div
              style={{
                margin: '8px 0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  color: '#666',
                  alignSelf: 'flex-end',
                  marginBottom: '12px',
                }}
              >
                #
              </span>
              <span style={{ fontSize: '56px', color: '#FF6B00' }}>{rankData?.rank}</span>
            </div>
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
      fonts: [
        {
          name: 'Jersey',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}

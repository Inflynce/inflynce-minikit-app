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
async function fetchBoost(boostId: string) {
  try {
    const response = await fetch(process.env.GRAPHQL_URL ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetBoostByBoostId($boostId: uuid!) {
            mindshare_boosts(
              where: { id: { _eq: $boostId } }
            ) {
              user {
                displayName
                fid
                pfpUrl
                username
              }
              mindshareFilterDuration
              minMindshare
              createdAt
              campaignBudget
            }
          }
        `,
        variables: {
          boostId: boostId,
        },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.mindshare_boosts[0];
  } catch (error) {
    console.error('Error fetching mindshare data:', error);
    return null;
  }
}

export default async function Image({ params }: { params: { boostId: string } }) {
  // Default fid value in case params.fid is undefined
  const boostId = params?.boostId || '0';

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
  const boost = await fetchBoost(boostId);
  console.log('boost', boost);

  if (!boost) {
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
          Boost not found
        </div>
      ),
      {
        ...size,
      }
    );
  }

  const username = boost?.user?.username || `user_${boost?.user?.fid}`;
  const displayName = boost?.user?.displayName || 'Inflynce User';
  const pfpUrl = boost?.user?.pfpUrl || 'https://placekitten.com/200/200';

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
            margin: '0 0 40px 0',
            color: '#FF6B00',
          }}
        >
          My cast is now live with rewards.
        </h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
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
            }}
          >
            <span>Mindshare Duration</span>
            <div
              style={{
                margin: '8px 0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <span style={{ fontSize: '40px', color: '#FF6B00' }}>
                {boost?.mindshareFilterDuration}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: '#666',
                  alignSelf: 'flex-end',
                  marginBottom: '8px',
                }}
              >
                Days
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
              textAlign: 'center',
              minWidth: 0, // Allow content to shrink if needed
            }}
          >
            <span>Mindshare</span>
            <div
              style={{
                margin: '8px 0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '40px', color: '#FF6B00' }}>
                {`>= ${boost?.minMindshare}`}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: '#666',
                  alignSelf: 'flex-end',
                  marginBottom: '8px',
                }}
              >
                %
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
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
            }}
          >
            <span>Budget</span>
            <div
              style={{
                margin: '8px 0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <span style={{ fontSize: '40px', color: '#FF6B00' }}>
                {`$${boost?.campaignBudget}`}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: '#666',
                  alignSelf: 'flex-end',
                  marginBottom: '8px',
                }}
              >
                USDC
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
            <span>Minimum Earnings</span>
            <div
              style={{
                margin: '8px 0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <span style={{ fontSize: '40px', color: '#FF6B00' }}>
                {`${(boost?.minMindshare * 0.5).toFixed(6).replace(/\.?0+$/, '')}`}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: '#666',
                  alignSelf: 'flex-end',
                  marginBottom: '8px',
                }}
              >
                USDC
              </span>
            </div>
          </div>
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

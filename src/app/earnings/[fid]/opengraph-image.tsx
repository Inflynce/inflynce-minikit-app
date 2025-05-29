import { ImageResponse } from 'next/og';
import { formatPoints } from '@/utils/formatters';
import { getYesterday } from '@/utils/dateUtils';

const BASE_URL = process.env.NEXT_PUBLIC_URL;
export const alt = 'Inflynce Profile';
export const size = {
  width: 600,
  height: 400,
};

export const contentType = 'image/png';

// Direct fetch function for server-side data fetching
async function fetchYesterdayEarnings(fid: string) {
  const yesterday = getYesterday();
  try {
    const response = await fetch(process.env.GRAPHQL_URL ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetPointTransactionByFidAndDirectionAndDate(
            $fid: String!
            $direction: String!
            $date: date!
          ) {
            point_transactions(
              where: { fid: { _eq: $fid }, direction: { _eq: $direction }, date: { _eq: $date } }
              order_by: { createdAt: desc }
            ) {
              date
              points
              user {
                displayName
                username
                pfpUrl
                proUser {
                  isPro
                }
              }
            }
          }
        `,
        variables: {
          fid: fid || '0',
          direction: 'earn',
          date: yesterday,
        },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.point_transactions;
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
  const yesterdayEarnings = await fetchYesterdayEarnings(fid);
  console.log('yesterdayEarnings', yesterdayEarnings);
  // Calculate total points earned yesterday
  const totalPoints =
    yesterdayEarnings?.reduce((sum: number, tx: any) => sum + (tx.points || 0), 0) || 0;
  const formattedPoints = formatPoints(totalPoints);

  const username = yesterdayEarnings[0]?.user?.username || `user_${fid}`;
  const displayName = yesterdayEarnings[0]?.user?.displayName || 'Inflynce User';
  const pfpUrl = yesterdayEarnings[0]?.user?.pfpUrl || 'https://placekitten.com/200/200';

  // Logo URL - replace with your actual logo URL
  const logoUrl = `${BASE_URL}/cast_logo.png`;
  const badgeUrl = `${BASE_URL}/pro_user.svg`;
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
            Inflynce
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
          <div style={{ position: 'relative', display: 'flex' }}>
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
            {yesterdayEarnings[0]?.user?.proUser?.isPro && (
              <img
                src={badgeUrl}
                width={28}
                height={28}
                style={{
                  position: 'absolute',
                  bottom: -6,
                  right: -6,
                  zIndex: 10,
                }}
                alt="Pro User"
              />
            )}
          </div>

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
          Yesterday's Earnings
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
            {formattedPoints}
          </span>
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

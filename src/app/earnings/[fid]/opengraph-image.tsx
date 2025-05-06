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
          justifyContent: 'center',
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
              color: '#CCCCCC',
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
                color: '#fff',
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
                color: '#CCCCCC',
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
              color: '#CCCCCC',
              alignSelf: 'flex-end',
              marginBottom: '12px',
            }}
          >
            points
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            color: '#CCCCCC',
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
    }
  );
}

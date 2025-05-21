import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';
import { getYesterday } from '@/utils/dateUtils';

const BASE_URL = process.env.NEXT_PUBLIC_URL;
export const alt = 'Inflynce Profile';
export const size = {
  width: 600,
  height: 400,
};

export const contentType = 'image/png';

// Direct fetch function for server-side data fetching
async function fetchProfileData(fid: string) {
  const yesterday = getYesterday();
  try {
    const response = await fetch(process.env.GRAPHQL_URL ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetMindshareByFid($fid: String!, $date: date!, $direction: String!) {
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
            user_points_by_pk(fid: $fid) {
              totalPoints
            }
             user_rank_view(
              where: {fid: {_eq: $fid}}
            ) {
              rank
            }
            point_transactions(
              where: { fid: { _eq: $fid }, direction: { _eq: $direction }, date: { _eq: $date } }
              order_by: { createdAt: desc }
            ) {
              date
              points
            }
            early_inflyncer_nft_mind_records(where: { fid: { _eq: $fid } }) {
              tokenId
            }
          }
        `,
        variables: {
          fid: fid || '0',
          date: yesterday,
          direction: 'earn',
        },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error('Error fetching mindshare data:', error);
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
  const fontPath = path.join(process.cwd(), 'public/fonts/Jersey_20/Jersey20-Regular.ttf');
  const fontData = fs.readFileSync(fontPath);

  // For better image quality, use an absolute URL if possible
  // This works if your app is deployed and the public URL is accessible
  const logoUrl = `${BASE_URL}/cast_logo.png`;

  // As a fallback, we can still use the file system approach
  // but with improved quality settings
  const imagePath = path.join(process.cwd(), 'public/cast_logo.png');
  const logoImageData = fs.readFileSync(imagePath);
  const logoDataUrl = `data:image/png;base64,${logoImageData.toString('base64')}`;

  const earlyInflyncerImage = path.join(process.cwd(), 'public/Early_Inflyncer_NFT.png');
  const earlyInflyncerImageData = fs.readFileSync(earlyInflyncerImage);
  const earlyInflyncerImageDataUrl = `data:image/png;base64,${earlyInflyncerImageData.toString('base64')}`;

  // Try to fetch data, but use fallback values if it fails
  let mindshareData = null;
  let pointsData = null;
  let rankData = [];
  let pointTransactions = [];
  let earlyInflyncerNFTMindRecord = [];

  try {
    const data = await fetchProfileData(fid);
    if (data) {
      console.log(data);
      mindshareData = data.getMindshareByFid;
      pointsData = data.user_points_by_pk;
      rankData = data.user_rank_view || [];
      pointTransactions = data.point_transactions || [];
      earlyInflyncerNFTMindRecord = data.early_inflyncer_nft_mind_records || [];
    }
  } catch (error) {
    console.error('Error fetching data for OpenGraph image:', error);
    // Continue with null values, we'll use fallbacks below
  }

  // Use fallback values if data fetching failed
  const username = mindshareData?.userInfo?.username || `user_${fid}`;
  const displayName = mindshareData?.userInfo?.displayName || 'Inflynce User';
  const mindshareScore = mindshareData?.currentMindshare || 0;
  const pfpUrl = mindshareData?.userInfo?.pfpUrl;
  const totalPoints = pointsData?.totalPoints ?? 0;
  console.log(totalPoints);
  const formattedTotalPoints = formatPoints(totalPoints);
  const rank = rankData[0]?.rank ?? '?';

  // Aggregate all point transactions from yesterday instead of just taking the first one
  const lastEarnedPoints = pointTransactions.reduce(
    (total: number, transaction: any) => total + (transaction?.points ?? 0),
    0
  );
  const formattedLastEarnedPoints = formatPoints(lastEarnedPoints);

  console.log(earlyInflyncerNFTMindRecord);
  console.log(totalPoints);

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
          padding: '10px',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
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
            marginBottom: '20px',
            gap: '10px',
            width: '100%',
          }}
        >
          <img
            src={logoDataUrl}
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
            Inflynce Profile
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            gap: '20px',
            padding: '10px',
            width: '100%',
          }}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}
          >
            <img
              src={pfpUrl}
              width={72}
              height={72}
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

          {earlyInflyncerNFTMindRecord.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <span style={{ fontSize: 24, color: '#666' }}>Early Inflyncer</span>
              <img
                src={earlyInflyncerImageDataUrl}
                width={36}
                height={36}
                alt="Early Inflyncer NFT"
                style={{ borderRadius: '4px' }}
              />
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            marginBottom: '20px',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '10px',
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
              padding: '5px',
              borderRadius: '12px',
            }}
          >
            <span>Mindshare</span>
            <div
              style={{
                margin: '8px 0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <span style={{ fontSize: '56px', color: '#FF6B00' }}>
                {(mindshareScore * 100).toFixed(2)}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: '#666',
                  alignSelf: 'flex-end',
                  marginBottom: '12px',
                }}
              >
                %
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
              padding: '10px 20px',
              borderRadius: '12px',
            }}
          >
            <span>Inflynce Points</span>
            <div
              style={{
                margin: '8px 0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <span style={{ fontSize: '56px', color: '#FF6B00' }}>{formattedTotalPoints}</span>
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
              padding: '10px 20px',
              borderRadius: '12px',
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
              <span style={{ fontSize: '56px', color: '#FF6B00' }}>{rank}</span>
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
              padding: '10px 20px',
              borderRadius: '12px',
            }}
          >
            <span>Last Earned</span>
            <div
              style={{
                margin: '8px 0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <span style={{ fontSize: '56px', color: '#FF6B00' }}>
                {formattedLastEarnedPoints}
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

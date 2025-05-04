import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Inflynce Leaderboard';
export const size = {
  width: 1200,
  height: 630,
};

const BASE_URL = process.env.NEXT_PUBLIC_URL;
export const contentType = 'image/png';

async function fetchTopUsers() {
  try {
    const response = await fetch(process.env.GRAPHQL_URL ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetTopUsers {
            user_rank_view(
              order_by: {rank: asc}
              limit: 10
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
      }),
      cache: 'no-store',
    });

    const result = await response.json();
    return result.data?.user_rank_view || [];
  } catch (error) {
    console.error('Error fetching top users:', error);
    return [];
  }
}

export default async function Image() {
  // Fetch top 10 users
  const topUsers = await fetchTopUsers();
  console.log(topUsers);
  // Split users into two columns
  const leftColumnUsers = topUsers.slice(0, 5);
  const rightColumnUsers = topUsers.slice(5, 10);

  // Get current date and time
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: undefined,
  });

  const logoUrl = `${BASE_URL}/logo_200x200.png`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: '#fdf0dd',
          color: 'black',
          fontFamily: 'sans-serif',
          padding: '10px 40px',
          position: 'relative',
        }}
      >
        <h1
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 42,
            marginBottom: '30px',
          }}
        >
          <img src={logoUrl} width={48} height={48} alt="Inflynce Logo" />
          Inflynce Leaderboard
        </h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '90%',
            gap: '20px',
          }}
        >
          {/* Left Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '42%',
              background: 'rgba(0,0,0,0.05)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            {leftColumnUsers.map((user, index) => (
              <div
                key={user.fid}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  borderBottom:
                    index < leftColumnUsers.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginRight: '20px',
                    width: '30px',
                  }}
                >
                  #{user.rank}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <img
                    src={user.user.pfpUrl}
                    width={40}
                    height={40}
                    style={{ borderRadius: '50%', marginRight: '12px' }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      maxWidth: '150px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        fontSize: 18,
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {user.user.displayName}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.6)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      @{user.user.username}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  {user.totalPoints.toFixed(1)} IP
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '42%',
              background: 'rgba(0,0,0,0.05)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            {rightColumnUsers.map((user, index) => (
              <div
                key={user.fid}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  borderBottom:
                    index < rightColumnUsers.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginRight: '20px',
                    width: '30px',
                  }}
                >
                  #{user.rank}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <img
                    src={user.user.pfpUrl}
                    width={40}
                    height={40}
                    style={{ borderRadius: '50%', marginRight: '12px' }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      maxWidth: '150px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {user.user.displayName || user.user.username}
                    </div>
                    {user.user.displayName && (
                      <div
                        style={{
                          display: 'flex',
                          fontSize: 14,
                          color: 'rgba(0,0,0,0.6)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        @{user.user.username}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  {user.totalPoints.toFixed(1)} IP
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            paddingTop: '20px',
            textAlign: 'center',
            fontSize: '16px',
            color: 'rgba(0,0,0,0.6)',
          }}
        >
          {formattedDate} • {formattedTime}
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}

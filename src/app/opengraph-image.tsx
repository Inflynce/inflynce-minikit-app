import { ImageResponse } from 'next/og';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'https://miniapp.inflynce.com';
export const alt = 'Inflynce Mindshare';
export const size = {
  width: 600,
  height: 400,
};

export const contentType = 'image/png';

export default async function Image() {
  try {
    // Fetch mindshare data
    const response = await fetch(process.env.GRAPHQL_URL ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetTopMindshare {
            getTopMindshare(input: {duration: "7", field: "mindshare", limit: 12, skip: 0, desc: true}) {
              currentMindshare
              last7dMindshare
              rank
              fid
              userInfo {
                displayName
                pfpUrl
                username
              }
            }
          }
        `,
      }),
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    const data = await response.json();
    const topUsers = data?.data?.getTopMindshare || [];

    // Calculate total mindshare for percentage
    const totalMindshare = topUsers.reduce((acc, user) => acc + user.currentMindshare, 0);

    // Prepare data for display
    const gridUsers = topUsers.map((user) => {
      return {
        ...user,
        displayPercentage: (user.currentMindshare * 100).toFixed(1),
      };
    });

    // Ensure we have exactly 12 items for the 3x4 grid
    while (gridUsers.length < 12) {
      gridUsers.push(null);
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#fdf0dd',
            width: '600px',
            height: '400px',
            padding: '0px',
            color: 'white',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* 3x4 Grid layout */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              gap: '4px',
              padding: '1px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '8px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {[0, 1, 2].map((rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  gap: '4px',
                }}
              >
                {gridUsers.slice(rowIndex * 4, (rowIndex + 1) * 4).map((user, index) => {
                  // Calculate background color based on mindshare change
                  const getBackgroundColor = (user) => {
                    if (!user) return 'transparent';

                    // Calculate percentage change
                    const percentChange =
                      user.currentMindshare > 0
                        ? (user.last7dMindshare - user.currentMindshare) / user.currentMindshare
                        : 0;

                    // Dark theme with burgundy/maroon and teal/green colors
                    if (percentChange > 0) {
                      // Burgundy/maroon for decreases
                      if (percentChange > 0.1) return '#7D2E46'; // Deep burgundy for significant decrease
                      if (percentChange > 0.05) return '#8D3F57'; // Medium burgundy for moderate decrease
                      return '#9D4F67'; // Light burgundy for slight decrease
                    } else {
                      // Teal/green for increases
                      if (percentChange < -0.1) return '#1D6A64'; // Deep teal for significant increase
                      if (percentChange < -0.05) return '#2D7A74'; // Medium teal for moderate increase
                      return '#3D8A84'; // Light teal for slight increase
                    }
                  };

                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        background: getBackgroundColor(user),
                        borderRadius: '4px',
                        padding: '4px',
                        boxShadow: user ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
                        border: user ? '1px solid rgba(255,255,255,0.1)' : 'none',
                      }}
                    >
                      {user && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            width: '100%',
                            padding: '2px',
                          }}
                        >
                          <img
                            src={user.userInfo.pfpUrl}
                            alt={user.userInfo.displayName}
                            width={40}
                            height={40}
                            style={{
                              display: 'flex',
                              borderRadius: '50%',
                              marginBottom: '4px',
                              border: '1px solid white',
                            }}
                          />

                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              textAlign: 'left',
                              marginLeft: '4px',
                              width: '90px',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: 'white',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '100%',
                              }}
                            >
                              {user.userInfo.displayName || user.userInfo.username}
                            </div>

                            <div
                              style={{
                                display: 'flex',
                                fontSize: '12px',
                                color: 'rgba(255, 255, 255, 0.8)',
                                marginBottom: '2px',
                              }}
                            >
                              @{user.userInfo.username}
                            </div>
                          </div>
                        </div>
                      )}
                      <div
                        style={{
                          display: 'flex',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: 'white',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '50%',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            background: 'rgba(0, 0, 0, 0.2)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                          }}
                        >
                          {user.displayPercentage}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {/* Centered Logo Overlay - Middle Third Only */}
          <div
            style={{
              position: 'absolute',
              top: '33%', // Start at 1/3 from the top
              left: 0,
              right: 0,
              height: '33%', // Take up 1/3 of the height
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 200,
              borderRadius: '8px',
            }}
          >
            <img src={`${BASE_URL}/logo.png`} alt="Inflynce Logo" width={48} height={48} />
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                lineHeight: '48px',
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                marginLeft: '12px',
              }}
            >
              Inflynce
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('Error generating Mindshare OpenGraph image:', error);

    // Fallback image if there's an error
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fdf0dd',
            width: '100%',
            height: '100%',
            padding: '20px',
            color: 'white',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}
        >
          <img
            src={`${BASE_URL}/logo_200x200.png`}
            alt="Inflynce Logo"
            width={80}
            height={80}
            style={{ marginBottom: '12px' }}
          />
          <h1 style={{ display: 'flex', fontSize: '24px', margin: '0 0 8px 0', color: '#151E2E' }}>
            Inflynce Mindshare
          </h1>
          <p style={{ display: 'flex', fontSize: '16px', opacity: 0.8, color: '#151E2E' }}>
            Visualizing influence on Farcaster
          </p>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}

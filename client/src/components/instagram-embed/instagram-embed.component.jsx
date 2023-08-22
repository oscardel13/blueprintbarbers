import React from 'react';

const InstagramEmbed = ({ permalink }) => {
  return (
    <div>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: '0',
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.5), 0 1px 10px 0 rgba(0, 0, 0, 0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: '0',
          width: '99.375%',
          WebkitWidth: 'calc(100% - 2px)',
          width: 'calc(100% - 2px)',
        }}
      >
        <div style={{ padding: '16px' }}>
          {/* Profile image and username */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: '#F4F4F4',
                borderRadius: '50%',
                flex: '0 0 40px',
                height: '40px',
                marginRight: '14px',
                width: '40px',
              }}
            ></div>
            <div style={{ flex: 1 }}>
              {/* Username */}
              <div
                style={{
                  backgroundColor: '#F4F4F4',
                  borderRadius: '4px',
                  flex: '0 0 14px',
                  height: '14px',
                  marginBottom: '6px',
                  width: '100px',
                }}
              ></div>
              {/* Timestamp */}
              <div
                style={{
                  backgroundColor: '#F4F4F4',
                  borderRadius: '4px',
                  flex: '0 0 14px',
                  width: '60px',
                }}
              ></div>
            </div>
          </div>
          {/* Post content */}
          <div style={{ padding: '19% 0' }}></div>
          {/* Like and comment icons */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Like icon */}
            <div>
              <div
                style={{
                  backgroundColor: '#F4F4F4',
                  borderRadius: '50%',
                  height: '12.5px',
                  width: '12.5px',
                  transform: 'translateX(0px) translateY(7px)',
                }}
              ></div>
              <div
                style={{
                  backgroundColor: '#F4F4F4',
                  height: '12.5px',
                  transform: 'rotate(-45deg) translateX(3px) translateY(1px)',
                  width: '12.5px',
                  flex: '0 0 14px',
                  marginRight: '14px',
                  marginLeft: '2px',
                }}
              ></div>
              <div
                style={{
                  backgroundColor: '#F4F4F4',
                  borderRadius: '50%',
                  height: '12.5px',
                  width: '12.5px',
                  transform: 'translateX(9px) translateY(-18px)',
                }}
              ></div>
            </div>
            {/* Comment icon */}
            <div style={{ marginLeft: '8px' }}>
              <div
                style={{
                  backgroundColor: '#F4F4F4',
                  borderRadius: '50%',
                  flex: '0 0 20px',
                  height: '20px',
                  width: '20px',
                }}
              ></div>
              <div
                style={{
                  width: '0',
                  height: '0',
                  borderTop: '2px solid transparent',
                  borderLeft: '6px solid #f4f4f4',
                  borderBottom: '2px solid transparent',
                  transform: 'translateX(16px) translateY(-4px) rotate(30deg)',
                }}
              ></div>
            </div>
            {/* Share icon */}
            <div style={{ marginLeft: 'auto' }}>
              <div
                style={{
                  width: '0px',
                  borderTop: '8px solid #F4F4F4',
                  borderRight: '8px solid transparent',
                  transform: 'translateY(16px)',
                }}
              ></div>
              <div
                style={{
                  backgroundColor: '#F4F4F4',
                  flex: '0 0 12px',
                  height: '12px',
                  width: '16px',
                  transform: 'translateY(-4px)',
                }}
              ></div>
              <div
                style={{
                  width: '0',
                  height: '0',
                  borderTop: '8px solid #F4F4F4',
                  borderLeft: '8px solid transparent',
                  transform: 'translateY(-4px) translateX(8px)',
                }}
              ></div>
            </div>
          </div>
          {/* Username and caption */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <div
                style={{
                  backgroundColor: '#F4F4F4',
                  borderRadius: '4px',
                  flex: '0 0 14px',
                  marginBottom: '6px',
                  width: '224px',
                }}
              ></div>
              <div
                style={{
                  backgroundColor: '#F4F4F4',
                  borderRadius: '4px',
                  flex: '0 0 14px',
                  width: '144px',
                }}
              ></div>
            </div>
          </div>
        </div>
      </blockquote>
      <script async src="//www.instagram.com/embed.js"></script>
    </div>
  );
};

export default InstagramEmbed;

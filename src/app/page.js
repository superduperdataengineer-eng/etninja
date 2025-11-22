//code 4 works great.Plain.Simple.
'use client';

import { adList } from './components/adList';
import { blogList } from './components/blogList';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [scrollX, setScrollX] = useState(0);
  const [direction, setDirection] = useState(-1); // -1 = left, 1 = right

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => {
        const newPos = prev + direction * 2; // adjust speed here
        const maxOffset = 0; // leftmost
        const minOffset = -1000; // rightmost, adjust based on total banner width

        // Reverse direction if reaching edges
        if (newPos <= minOffset) setDirection(1);
        else if (newPos >= maxOffset) setDirection(-1);

        return newPos;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    // <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Ads Banner */}
      <div
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          borderRadius: '8px',
          backgroundColor: '#f6f6f6', // same as page background
          padding: '4px 0',
          marginBottom: '2rem',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            transform: `translateX(${scrollX}px)`,
            transition: 'transform 0.03s linear',
          }}
        >
          {adList.map((ad) => (
            <a
              key={ad.id}
              href={ad.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 10px',
                minWidth: '80px',
                height: '40px',
                backgroundColor: 'transparent',
                textDecoration: 'none',
                color: '#333',
                padding: '0px',
              }}
            >
              <img
                src={ad.imageUrl}
                alt={ad.name}
                style={{ maxHeight: '30px', objectFit: 'contain' }}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Main Blogs */}
      <main
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '1rem',
          justifyItems: 'center',
          maxWidth: '600px',
          width: '100%',
          margin: '0 auto', // centers grid horizontally
          paddingBottom: '2rem', // optional spacing before footer
        }}
      >
        {blogList.map((blog) => (
          <div
            key={blog.id}
            style={{
              width: '120px',
              height: '120px',
              backgroundColor: 'rgba(255, 223, 0, 0.6)', // transparent thick yellow
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
              padding: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
          >
            <h4 style={{ fontSize: '12px', margin: '0', flexGrow: 1 }}>{blog.title}</h4>
            <Link href={`/blogs/blog${blog.id}`}>
              <button
                style={{
                  padding: '4px 6px',
                  fontSize: '10px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#ffb005ff',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                Try Now
              </button>
            </Link>
          </div>
        ))}
      </main>
            {/* Main Picture Below Blogs */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
        <img
          src="/logos/ETNINJALOGO.png"
          alt="ET Ninja Logo"
          style={{
            width: '100%',
            maxWidth: '400px',   // adjust size here
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        />
      </div>

    </div>
  );
}


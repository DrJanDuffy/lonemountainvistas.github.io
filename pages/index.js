import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <main>
        <h1>Lone Mountain Vistas</h1>
        <p className="tagline">Luxury Real Estate in Las Vegas</p>
        <div className="contact-info">
          <p>📞 (555) 123-4567</p>
          <p>📧 info@lonemountainvistas.com</p>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 20px;
          background: linear-gradient(to bottom, #f7f9fc, #e3e8ef);
        }
        main {
          max-width: 800px;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #0A2540;
        }
        .tagline {
          font-size: 1.5rem;
          color: #3A8DDE;
          margin-bottom: 2rem;
        }
        .contact-info {
          margin-top: 2rem;
          font-size: 1.2rem;
          color: #666;
        }
        .contact-info p {
          margin: 0.5rem 0;
        }
      `}</style>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
      `}</style>
    </div>
  );
} 
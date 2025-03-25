export default function Contact() {
  return (
    <div className="container">
      <h1>Contact Us</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/properties">Properties</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <main>
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>We're here to help you find your perfect home.</p>
            <div className="contact-details">
              <p>📞 Phone: (555) 123-4567</p>
              <p>📧 Email: info@lonemountainvistas.com</p>
              <p>📍 Address: 123 Mountain View Dr, Las Vegas, NV</p>
            </div>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </main>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        nav ul {
          display: flex;
          list-style: none;
          padding: 0;
          gap: 20px;
        }
        nav a {
          text-decoration: none;
          color: #333;
        }
        nav a:hover {
          color: #0070f3;
        }
        .contact-content {
          margin-top: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .contact-info {
          padding-right: 40px;
        }
        .contact-details {
          margin-top: 20px;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        label {
          font-weight: 500;
        }
        input, textarea {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        textarea {
          height: 120px;
        }
        button {
          background: #0070f3;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        button:hover {
          background: #0051a2;
        }
      `}</style>
    </div>
  );
} 
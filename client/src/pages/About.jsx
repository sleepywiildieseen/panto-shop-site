import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      
      <section className="section">
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          
          
          <div style={{ borderRadius: 24, overflow: 'hidden', height: 400 }}>
            <img 
              src="/images/about-experience.jpg" 
              alt="Showroom" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <div>
            <p style={{ color: 'var(--accent)', letterSpacing: 2, fontSize: 13, marginBottom: 12 }}>EXPERIENCES</p>
            <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 20 }}>We Provide You The Best Experience</h1>
            <p style={{ color: 'var(--muted)', marginBottom: 24 }}>You don't have to worry about the result because all of these interiors are made by people who are professionals in their fields with an elegant and luxurious style and with premium quality materials.</p>
            <Link to="/catalog" style={{ color: 'var(--accent)' }}>More info →</Link>
          </div>
        </div>
      </section>

      
      <section className="section">
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--accent)', letterSpacing: 2, fontSize: 13, marginBottom: 12 }}>MATERIALS</p>
            <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 20 }}>Very Serious Materials For Making Furniture</h1>
            <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Because Panto was very serious about designing furniture for our environment, using a very expensive and famous capital for it.</p>
            <Link to="/catalog" style={{ color: 'var(--accent)' }}>More info →</Link>
          </div>
          
          
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', height: 260 }}>
              <img 
                src="/images/about-materials1.jpg" 
                alt="Materials 1" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', height: 260, marginTop: 40 }}>
              <img 
                src="/images/about-materials2.jpg" 
                alt="Materials 2" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
        </div>
      </section>

      
      <section className="section">
        <h2 className="section-title-center">Our Client Reviews</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', marginTop: 40 }}>
          {[
            { text: 'The services provided are amazing and the furniture is top quality. I will definitely order again.', name: 'Anna Ivanova' },
            { text: 'Great quality and fast delivery. Highly recommend Panto to anyone looking for modern furniture.', name: 'Roman Petrov' },
            { text: 'Elegant design, comfortable chairs, and excellent customer service. Will order again.', name: 'Maria Sokolova' },
          ].map((r, i) => (
            <div key={i} className="card" style={{ padding: 32 }}>
              <div style={{ fontSize: 24, marginBottom: 12, color: 'var(--accent)' }}>★★★★★</div>
              <p style={{ color: 'var(--muted)', marginBottom: 20 }}>"{r.text}"</p>
              <strong>{r.name}</strong>
            </div>
          ))}
        </div>
      </section>

      
      <section className="section" id="contact">
        <h2>Contact Us</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 12 }}>Email: hello@panto.com</p>
        <p style={{ color: 'var(--muted)', marginBottom: 12 }}>Phone: +7 (800) 000-00-00</p>
        <p style={{ color: 'var(--muted)' }}>Address: Moscow, Tverskaya st., 1</p>
      </section>
    </>
  );
}
export default function TOSPage() {
  return (
    <main style={{ background: '#0a0a0a', color: '#f5f0e8', minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Terms of Service</h1>
        <p style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '40px', fontSize: '1rem' }}>
          Last updated: {new Date().toISOString().split('T')[0]}
        </p>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ff6b35' }}>1. Agreement to Terms</h2>
          <p>
            By accessing and using wastedape.org and all related services, products, and applications ("Services"), you agree to be bound by these Terms of Service. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ff6b35' }}>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on WastedApe Tech's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul style={{ color: 'rgba(245,240,232,0.8)' }}>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on the site</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the site</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ff6b35' }}>3. Disclaimer</h2>
          <p>
            The materials on WastedApe Tech's website are provided on an 'as is' basis. WastedApe Tech makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p>
            All AI-generated content and tools are provided as-is. While we strive for accuracy, AI outputs should be reviewed by qualified professionals before implementation in critical operations, especially in industrial, marine, or healthcare contexts.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ff6b35' }}>4. Limitations</h2>
          <p>
            In no event shall WastedApe Tech or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WastedApe Tech's website, even if WastedApe Tech or a WastedApe Tech authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ff6b35' }}>5. Accuracy of Materials</h2>
          <p>
            The materials appearing on WastedApe Tech's website could include technical, typographical, or photographic errors. WastedApe Tech does not warrant that any of the materials on our website are accurate, complete, or current. WastedApe Tech may make changes to the materials contained on its website at any time without notice.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ff6b35' }}>6. Links</h2>
          <p>
            WastedApe Tech has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by WastedApe Tech of the site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ff6b35' }}>7. Modifications</h2>
          <p>
            WastedApe Tech may revise these Terms of Service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ff6b35' }}>8. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ff6b35' }}>9. User Responsibilities</h2>
          <p>
            Users are responsible for:
          </p>
          <ul style={{ color: 'rgba(245,240,232,0.8)' }}>
            <li>Maintaining confidentiality of login credentials</li>
            <li>Ensuring compliance with all applicable laws when using our Services</li>
            <li>Reviewing AI-generated output for accuracy before relying on it</li>
            <li>Obtaining professional advice for critical business decisions</li>
            <li>Respecting intellectual property rights of others</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ff6b35' }}>10. AI-Generated Content</h2>
          <p>
            WastedApe Tech services utilize artificial intelligence to generate content and recommendations. While our models are trained on quality data:
          </p>
          <ul style={{ color: 'rgba(245,240,232,0.8)' }}>
            <li>AI outputs may contain errors or inaccuracies</li>
            <li>Always verify critical information with professional resources</li>
            <li>Do not rely solely on AI-generated diagnostics for safety-critical decisions</li>
            <li>Consult qualified professionals (mechanics, engineers, etc.) for important matters</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#ff6b35' }}>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> contact@wastedape.org<br />
            <strong>Website:</strong> wastedape.org
          </p>
        </section>

        <div style={{
          borderTop: '1px solid rgba(245,240,232,0.1)',
          paddingTop: '40px',
          marginTop: '60px',
          color: 'rgba(245,240,232,0.5)',
          fontSize: '0.9rem',
        }}>
          <p>© {new Date().getFullYear()} WastedApe Tech. All rights reserved.</p>
        </div>
      </div>
    </main>
  )
}
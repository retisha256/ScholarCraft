import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read our privacy policy to understand how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-20 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-poppins text-slate-900 dark:text-white mb-3">
          Privacy Policy
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-10">Last updated: January 1, 2024</p>

        <div className="prose-custom space-y-8 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">1. Introduction</h2>
            <p className="leading-relaxed">
              ScholarCraft (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. By using our services, you agree to this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">2. Information We Collect</h2>
            <p className="leading-relaxed mb-3">We collect information that you directly provide to us, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal identification information (name, email, phone number)</li>
              <li>Academic information (institution, academic level, project details)</li>
              <li>Files and documents you upload for project support</li>
              <li>Communication records from your interactions with our team</li>
              <li>Payment information (processed securely via third-party providers)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">3. How We Use Your Information</h2>
            <p className="leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and personalize our academic support services</li>
              <li>Communicate with you about your projects and inquiries</li>
              <li>Process payments and manage your account</li>
              <li>Send you service updates and academic resources (with your consent)</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">4. Confidentiality</h2>
            <p className="leading-relaxed">
              We take confidentiality extremely seriously. All client projects, communications, and personal information are treated with strict confidentiality. Our team members sign non-disclosure agreements and are bound by strict confidentiality obligations. We will never share your project details or personal information with unauthorized third parties.
            </p>
          </section>

          <section id="cookies">
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">5. Cookie Policy</h2>
            <p className="leading-relaxed mb-3">
              We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device. We use:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Preference cookies:</strong> Remember your settings like dark mode</li>
            </ul>
            <p className="mt-3 leading-relaxed">You can control cookies through your browser settings or the cookie consent banner on our site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">6. Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is stored securely using Supabase&apos;s enterprise-grade infrastructure with encryption at rest and in transit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">7. Your Rights</h2>
            <p className="leading-relaxed mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Withdraw consent for data processing</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">8. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:{' '}
              <a href="mailto:privacy@scholarcraft.com" className="text-blue-600 hover:underline">
                privacy@scholarcraft.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

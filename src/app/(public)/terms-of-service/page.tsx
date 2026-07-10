import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read our terms of service for using AcademicPro academic support services.',
}

export default function TermsOfServicePage() {
  return (
    <div className="pt-32 pb-20 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-poppins text-slate-900 dark:text-white mb-3">
          Terms of Service
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-10">Last updated: January 1, 2024</p>

        <div className="prose-custom space-y-8 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing or using AcademicPro&apos;s website and services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">2. Description of Services</h2>
            <p className="leading-relaxed">
              AcademicPro provides academic support services including research guidance, dissertation support, essay assistance, editing, statistical analysis, and related academic consulting. Our services are intended to support your learning and academic development, not to replace original work where academic integrity policies apply.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">3. Academic Integrity</h2>
            <p className="leading-relaxed">
              Clients are responsible for ensuring their use of our services complies with their institution&apos;s academic integrity policies. Our work is provided as a model, guidance, and reference tool. We provide support for legitimate academic development purposes such as editing, coaching, tutoring, feedback, and consultation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">4. Payment Terms</h2>
            <p className="leading-relaxed mb-3">
              Payment terms are agreed upon before work commences:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A deposit may be required for larger projects</li>
              <li>The remaining balance is due upon project completion</li>
              <li>Accepted payment methods include bank transfer, credit/debit card, and PayPal</li>
              <li>All prices are quoted in USD unless otherwise specified</li>
            </ul>
          </section>

          <section id="refunds">
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">5. Refund Policy</h2>
            <p className="leading-relaxed mb-3">We offer refunds or credits in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>If we fail to deliver within the agreed deadline, you may request a full refund</li>
              <li>If the delivered work does not meet the agreed specifications after revisions, a partial refund may be issued</li>
              <li>Deposits are non-refundable once work has commenced</li>
              <li>Refund requests must be submitted within 7 days of delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">6. Confidentiality</h2>
            <p className="leading-relaxed">
              Both parties agree to maintain strict confidentiality about the nature of our working relationship and the content of any projects. AcademicPro will not share client information or project details with any third parties without explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">7. Intellectual Property</h2>
            <p className="leading-relaxed">
              Upon full payment, clients receive full ownership of the delivered work product. AcademicPro retains the right to use anonymized, non-identifying elements for training and service improvement purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">8. Limitation of Liability</h2>
            <p className="leading-relaxed">
              AcademicPro&apos;s liability is limited to the amount paid for the specific service in question. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services. We make no guarantees about specific academic outcomes, grades, or results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">9. Contact</h2>
            <p className="leading-relaxed">
              For questions about these Terms, contact us at{' '}
              <a href="mailto:legal@academicpro.com" className="text-blue-600 hover:underline">
                legal@academicpro.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

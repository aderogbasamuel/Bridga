import PageLayout from "../../components/PageLayout";
function PrivacyPolicyPage() {
    return ( 
        <PageLayout title="Privacy Policy" subTitle="">
    <div className="px-6 sm:px-12 py-12 mx-auto text-gray-800">

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
          <p>
            At <span className="font-medium">Escrow</span>, your
            privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your information when you use our website
            and services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Personal information you provide (such as name, email, phone
              number, and payment details).
            </li>
            <li>
              Non-personal information such as browser type, device, and usage
              statistics.
            </li>
            <li>
              Information collected through cookies and similar tracking
              technologies.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            How We Use Your Information
          </h2>
          <p>We may use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and improve our products and services.</li>
            <li>Process transactions securely.</li>
            <li>Send important updates and promotional content.</li>
            <li>Ensure compliance with legal requirements.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Sharing of Information</h2>
          <p>
            We do not sell or rent your personal data to third parties. We may
            share information with trusted partners or service providers who
            help us operate our business, but only as necessary and under strict
            confidentiality agreements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
          <p>
            We use industry-standard measures to protect your information
            against unauthorized access, alteration, disclosure, or destruction.
            However, please note that no method of transmission over the
            internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data.
            If you wish to exercise these rights, please contact us at{" "}
            <span className="font-medium">support@escrow.com</span>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Changes to this Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at{" "}
            <span className="font-medium">support@escrow.com</span>.
          </p>
        </section>
      </div>
    </div>


        </PageLayout>
     );
}

export default PrivacyPolicyPage;
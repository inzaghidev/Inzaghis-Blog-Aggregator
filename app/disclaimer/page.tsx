import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer & Terms of Service",
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
          Disclaimer & Terms of Service
        </h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Please read these terms carefully before using this website.
        </p>
      </header>

      <div className="space-y-5">
        <section className="paper rounded-2xl p-6">
          <h2 className="text-lg font-bold">1. Acceptance of Terms</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            By accessing or using Inzaghi's Blog Aggregator, you agree to be
            bound by these Terms of Service. If you do not agree with any part
            of these terms, please do not use this website.
          </p>
        </section>

        <section className="paper rounded-2xl p-6">
          <h2 className="text-lg font-bold">2. Informational Purpose Only</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            The content on this website is provided for general informational
            and educational purposes only. It does not constitute professional
            advice, whether legal, financial, medical, or otherwise. Always
            consult a qualified professional before acting on any information
            found here.
          </p>
        </section>

        <section className="paper rounded-2xl p-6">
          <h2 className="text-lg font-bold">3. No Guarantee of Accuracy</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            While we strive to keep the information on this website accurate and
            up to date, we make no representations or warranties of any kind,
            express or implied, about the completeness, accuracy, reliability,
            suitability, or availability of the content. Any reliance you place
            on such information is strictly at your own risk.
          </p>
        </section>

        <section className="paper rounded-2xl p-6">
          <h2 className="text-lg font-bold">4. Third-Party Content & Links</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            This website aggregates content from third-party blogs and may link
            to external websites. We have no control over the nature, content,
            and availability of those sites. The inclusion of any link or
            embedded content does not imply a recommendation or endorsement.
          </p>
        </section>

        <section className="paper rounded-2xl p-6">
          <h2 className="text-lg font-bold">5. Intellectual Property</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            The design, layout, and branding of this website belong to their
            respective owners. Articles remain the property of their original
            authors and are displayed for informational purposes. If you believe
            any content infringes your rights, please contact us through the
            GitHub repository.
          </p>
        </section>

        <section className="paper rounded-2xl p-6">
          <h2 className="text-lg font-bold">6. Limitation of Liability</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            In no event shall the operators of this website be liable for any
            loss or damage, including without limitation, indirect or
            consequential loss or damage, arising from the use of, or reliance
            on, any information provided on this website.
          </p>
        </section>

        <section className="paper rounded-2xl p-6">
          <h2 className="text-lg font-bold">7. Changes to These Terms</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            We reserve the right to modify these terms at any time. Continued
            use of the website after changes are posted constitutes acceptance
            of the revised terms.
          </p>
        </section>
      </div>
    </main>
  );
}

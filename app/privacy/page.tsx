import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          This policy explains how Inzaghi's Blog Aggregator handles your
          information.
        </p>
      </header>

      <div className="space-y-5">
        <section className="paper rounded-2xl p-6">
          <h2 className="text-lg font-bold">1. Information We Collect</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            We aggregate publicly available blog posts from Inzaghi's Blog
            Legacy, Teknoblog, and Miniblog. We do not require an account, and
            we do not collect personal data such as your name, email address, or
            payment details to read or browse content.
          </p>
        </section>

        <section className="paper rounded-2xl p-6">
          <h2 className="text-lg font-bold">2. Automated Data</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Like most websites, our hosting provider may automatically log
            basic, non-identifying information (for example, the pages you visit
            and your IP address) to keep the service running securely. This data
            is not used to identify you personally.
          </p>
        </section>

        <section className="paper rounded-2xl p-6">
          <h2 className="text-lg font-bold">3. Cookies & Local Storage</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            We use your browser's local storage to remember your theme
            preference (light or dark mode). We do not use advertising or
            tracking cookies.
          </p>
        </section>

        <section className="paper rounded-2xl p-6">
          <h2 className="text-lg font-bold">4. Third-Party Content</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Articles may embed content from third-party services such as
            YouTube. These services have their own privacy policies, and
            interacting with embedded content is subject to their terms.
          </p>
        </section>

        <section className="paper rounded-2xl p-6">
          <h2 className="text-lg font-bold">5. Your Choices</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            You may clear your theme preference at any time by clearing your
            browser's local storage. For any questions about this policy, please
            contact us through the GitHub repository.
          </p>
        </section>

        <section className="paper rounded-2xl p-6">
          <h2 className="text-lg font-bold">6. Changes to This Policy</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with a revised effective date.
          </p>
        </section>
      </div>
    </main>
  );
}

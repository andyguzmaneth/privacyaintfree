import { ComparisonTable } from "./components/comparison-table";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <header className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-black dark:text-zinc-50 md:text-5xl">
            privacyaintfree.xyz
          </h1>
          <p className="mx-auto max-w-2xl mb-2 text-lg text-zinc-600 dark:text-zinc-400 md:text-xl">
            .. but it should be as close as possible.
          </p>
          <div className="mb-12"></div>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 md:text-xl">
            In order to reach adoption, we need cheap, fast, great UX privacy to be on par with transparent transfers.
          </p>
        </header>

        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-semibold text-black dark:text-zinc-50 md:text-3xl">
            Cost Comparison: Private vs Transparent Transfers
          </h2>
          <p className="mb-8 text-base text-zinc-600 dark:text-zinc-400">
            Here's a comparison of how much it costs for simple private transfers of ETH and ERC-20 tokens versus a standard transparent transfer.
          </p>

          <ComparisonTable />
        </section>

        <footer className="mt-20 border-t border-zinc-200 pt-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <p>Privacy shouldn't cost a premium.</p>
        </footer>
      </main>
    </div>
  );
}

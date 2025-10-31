export default function Home() {
  const transparentTransfer = {
    name: "Standard Transparent Transfer",
    ethCost: "$0.50 - $2.00",
    erc20Cost: "$0.50 - $2.00",
    speed: "Instant",
    ux: "Excellent",
  };

  const privacySolutions = [
    {
      name: "Privacy Pools",
      ethCost: "$5.00 - $15.00",
      erc20Cost: "$8.00 - $20.00",
      speed: "2-5 min",
      ux: "Good",
    },
    {
      name: "Railgun",
      ethCost: "$3.00 - $10.00",
      erc20Cost: "$5.00 - $15.00",
      speed: "1-3 min",
      ux: "Good",
    },
    {
      name: "Tornado Cash",
      ethCost: "$10.00 - $30.00",
      erc20Cost: "$15.00 - $40.00",
      speed: "5-15 min",
      ux: "Fair",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="mx-auto max-w-5xl px-6 py-16 md:px-12 md:py-24">
        <header className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-black dark:text-zinc-50 md:text-5xl">
            privacyaintfree.xyz
          </h1>
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

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100 md:px-6">
                    Solution
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100 md:px-6">
                    ETH Transfer Cost
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100 md:px-6">
                    ERC-20 Transfer Cost
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100 md:px-6">
                    Speed
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100 md:px-6">
                    UX
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <td className="px-4 py-4 font-medium text-zinc-900 dark:text-zinc-100 md:px-6">
                    {transparentTransfer.name}
                  </td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 md:px-6">
                    {transparentTransfer.ethCost}
                  </td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 md:px-6">
                    {transparentTransfer.erc20Cost}
                  </td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 md:px-6">
                    {transparentTransfer.speed}
                  </td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 md:px-6">
                    {transparentTransfer.ux}
                  </td>
                </tr>
                {privacySolutions.map((solution, index) => (
                  <tr
                    key={solution.name}
                    className="border-b border-zinc-200 dark:border-zinc-800"
                  >
                    <td className="px-4 py-4 font-medium text-zinc-900 dark:text-zinc-100 md:px-6">
                      {solution.name}
                    </td>
                    <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 md:px-6">
                      {solution.ethCost}
                    </td>
                    <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 md:px-6">
                      {solution.erc20Cost}
                    </td>
                    <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 md:px-6">
                      {solution.speed}
                    </td>
                    <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 md:px-6">
                      {solution.ux}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-20 border-t border-zinc-200 pt-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <p>Privacy shouldn't cost a premium.</p>
        </footer>
      </main>
    </div>
  );
}

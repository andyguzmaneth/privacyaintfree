"use client";

import { useState } from "react";
import solutionsData from "../../data/solutions.json";

type CostUnit = "USD" | "ETH" | "GAS";

interface CostData {
  usd: string;
  eth: string;
  gas: string;
}

interface Solution {
  name: string;
  type: string;
  privacyLevel: string;
  ethTransfer: CostData;
  erc20Transfer: CostData;
  speed: string;
  ux: string;
}

function formatCost(cost: CostData, unit: CostUnit): string {
  switch (unit) {
    case "USD":
      return cost.usd;
    case "ETH":
      return cost.eth;
    case "GAS":
      return cost.gas;
  }
}

export function ComparisonTable() {
  const [costUnit, setCostUnit] = useState<CostUnit>("USD");

  const baseline: Solution = solutionsData.baseline;
  const privacySolutions: Solution[] = solutionsData.solutions;

  const costUnits: CostUnit[] = ["USD", "ETH", "GAS"];

  return (
    <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-4 border-b border-zinc-200 p-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {costUnits.map((unit) => (
            <button
              key={unit}
              onClick={() => setCostUnit(unit)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                costUnit === unit
                  ? "bg-pink-600 text-white dark:bg-pink-500"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 md:px-6">
                Solution
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 md:px-6">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 md:px-6">
                Privacy Level
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 md:px-6">
                ETH Transfer Cost
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 md:px-6">
                ERC-20 Transfer Cost
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 md:px-6">
                Speed
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 md:px-6">
                UX
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200 bg-blue-50/50 dark:border-zinc-800 dark:bg-blue-950/20">
              <td className="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-100 md:px-6">
                {baseline.name}
              </td>
              <td className="px-4 py-4 text-zinc-700 dark:text-zinc-300 md:px-6">
                {baseline.type}
              </td>
              <td className="px-4 py-4 text-zinc-700 dark:text-zinc-300 md:px-6">
                {baseline.privacyLevel}
              </td>
              <td className="px-4 py-4 text-zinc-700 dark:text-zinc-300 md:px-6">
                {formatCost(baseline.ethTransfer, costUnit)}
              </td>
              <td className="px-4 py-4 text-zinc-700 dark:text-zinc-300 md:px-6">
                {formatCost(baseline.erc20Transfer, costUnit)}
              </td>
              <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 md:px-6">
                {baseline.speed}
              </td>
              <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 md:px-6">
                {baseline.ux}
              </td>
            </tr>
            {privacySolutions.map((solution) => (
              <tr
                key={solution.name}
                className="border-b border-zinc-200 dark:border-zinc-800"
              >
                <td className="px-4 py-4 font-medium text-zinc-900 dark:text-zinc-100 md:px-6">
                  {solution.name}
                </td>
                <td className="px-4 py-4 text-zinc-700 dark:text-zinc-300 md:px-6">
                  {solution.type}
                </td>
                <td className="px-4 py-4 text-zinc-700 dark:text-zinc-300 md:px-6">
                  {solution.privacyLevel}
                </td>
                <td className="px-4 py-4 text-zinc-700 dark:text-zinc-300 md:px-6">
                  {formatCost(solution.ethTransfer, costUnit)}
                </td>
                <td className="px-4 py-4 text-zinc-700 dark:text-zinc-300 md:px-6">
                  {formatCost(solution.erc20Transfer, costUnit)}
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
    </div>
  );
}

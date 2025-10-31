"use client";

import { useState, useMemo } from "react";
import solutionsData from "../../data/solutions.json";

type CostUnit = "USD" | "ETH" | "GAS";
type SortColumn = "name" | "type" | "privacyLevel" | "ethTransfer" | "erc20Transfer" | "speed" | "ux";
type SortDirection = "asc" | "desc" | null;

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

function parseCostValue(value: string): number {
  if (value === "N/A" || value.includes("N/A")) {
    return Infinity;
  }
  // Extract first number from range like "$0.50 - $2.00" or "0.0002 - 0.0008 ETH"
  const match = value.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : Infinity;
}

function compareValues(a: string, b: string): number {
  const numA = parseCostValue(a);
  const numB = parseCostValue(b);
  
  if (numA === Infinity && numB === Infinity) return 0;
  if (numA === Infinity) return 1;
  if (numB === Infinity) return -1;
  
  return numA - numB;
}

function getSortValue(solution: Solution, column: SortColumn, costUnit: CostUnit): string | number {
  switch (column) {
    case "name":
      return solution.name;
    case "type":
      return solution.type;
    case "privacyLevel":
      return solution.privacyLevel;
    case "ethTransfer":
      return formatCost(solution.ethTransfer, costUnit);
    case "erc20Transfer":
      return formatCost(solution.erc20Transfer, costUnit);
    case "speed":
      return solution.speed;
    case "ux":
      return solution.ux;
  }
}

export function ComparisonTable() {
  const [costUnit, setCostUnit] = useState<CostUnit>("USD");
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const baseline: Solution = solutionsData.baseline;
  const allSolutions: Solution[] = solutionsData.solutions;

  const costUnits: CostUnit[] = ["USD", "ETH", "GAS"];

  const sortedSolutions = useMemo(() => {
    if (!sortColumn || !sortDirection) {
      return allSolutions;
    }

    const sorted = [...allSolutions].sort((a, b) => {
      const aVal = getSortValue(a, sortColumn, costUnit);
      const bVal = getSortValue(b, sortColumn, costUnit);

      if (typeof aVal === "string" && typeof bVal === "string") {
        // For cost columns, parse and compare numerically
        if (sortColumn === "ethTransfer" || sortColumn === "erc20Transfer") {
          const comparison = compareValues(aVal, bVal);
          return sortDirection === "asc" ? comparison : -comparison;
        }
        // For text columns, do string comparison
        const comparison = aVal.localeCompare(bVal);
        return sortDirection === "asc" ? comparison : -comparison;
      }

      return 0;
    });

    return sorted;
  }, [allSolutions, sortColumn, sortDirection, costUnit]);

  function handleSort(column: SortColumn) {
    if (sortColumn === column) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  function SortIndicator({ column }: { column: SortColumn }) {
    if (sortColumn !== column) {
      return (
        <span className="ml-1 inline-block text-zinc-400 opacity-0 group-hover:opacity-50">
          ↕
        </span>
      );
    }
    if (sortDirection === "asc") {
      return <span className="ml-1 text-zinc-600 dark:text-zinc-400">↑</span>;
    }
    if (sortDirection === "desc") {
      return <span className="ml-1 text-zinc-600 dark:text-zinc-400">↓</span>;
    }
    return null;
  }

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
              <th
                onClick={() => handleSort("name")}
                className="group cursor-pointer px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 md:px-6"
              >
                <div className="flex items-center">
                  Solution
                  <SortIndicator column="name" />
                </div>
              </th>
              <th
                onClick={() => handleSort("type")}
                className="group cursor-pointer px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 md:px-6"
              >
                <div className="flex items-center">
                  Type
                  <SortIndicator column="type" />
                </div>
              </th>
              <th
                onClick={() => handleSort("privacyLevel")}
                className="group cursor-pointer px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 md:px-6"
              >
                <div className="flex items-center">
                  Privacy Level
                  <SortIndicator column="privacyLevel" />
                </div>
              </th>
              <th
                onClick={() => handleSort("ethTransfer")}
                className="group cursor-pointer px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 md:px-6"
              >
                <div className="flex items-center">
                  ETH Transfer Cost
                  <SortIndicator column="ethTransfer" />
                </div>
              </th>
              <th
                onClick={() => handleSort("erc20Transfer")}
                className="group cursor-pointer px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 md:px-6"
              >
                <div className="flex items-center">
                  ERC-20 Transfer Cost
                  <SortIndicator column="erc20Transfer" />
                </div>
              </th>
              <th
                onClick={() => handleSort("speed")}
                className="group cursor-pointer px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 md:px-6"
              >
                <div className="flex items-center">
                  Speed
                  <SortIndicator column="speed" />
                </div>
              </th>
              <th
                onClick={() => handleSort("ux")}
                className="group cursor-pointer px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 md:px-6"
              >
                <div className="flex items-center">
                  UX
                  <SortIndicator column="ux" />
                </div>
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
            {sortedSolutions.map((solution) => (
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

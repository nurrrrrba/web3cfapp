'use client';

import { getContract } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { useParams } from "next/navigation";
import { useReadContract } from "thirdweb/react";
import { client } from "@/app/client";

export default function CampaignPage() {
  const { contractAddress } = useParams();

  const contract = getContract({
    client: client,
    chain: polygonAmoy,
    address: contractAddress as string,
  });

  const { data: name } = useReadContract({
    contract,
    method: "function name() view returns (string)",
    params: [],
  });

  const { data: description } = useReadContract({
    contract,
    method: "function description() view returns (string)",
    params: [],
  });

  const { data: goal } = useReadContract({
    contract,
    method: "function goal() view returns (uint256)",
    params: [],
  });

  const { data: balance } = useReadContract({
    contract,
    method: "function getContractBalance() view returns (uint256)",
    params: [],
  });

  const { data: owner } = useReadContract({
    contract,
    method: "function owner() view returns (address)",
    params: [],
  });

  const { data: deadline } = useReadContract({
    contract,
    method: "function deadline() view returns (uint256)",
    params: [],
  });

  const totalBalance = balance?.toString() ?? "0";
  const totalGoal = goal?.toString() ?? "1";
  let percentage = (parseInt(totalBalance) / parseInt(totalGoal)) * 100;
  if (percentage > 100) percentage = 100;

  const formatDate = (timestamp: string | undefined) => {
    if (!timestamp) return "N/A";
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-2">{name ?? "Loading..."}</h1>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-6 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-6 rounded-full text-right px-2 text-white text-sm"
            style={{ width: `${percentage}%` }}
          >
            {parseInt(totalBalance)} / {parseInt(totalGoal)} wei
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {percentage.toFixed(2)}% funded
        </p>
      </div>

      <p className="mb-2"><strong>Owner:</strong> {owner ?? "Loading..."}</p>
      <p className="mb-2"><strong>Deadline:</strong> {formatDate(deadline?.toString())}</p>
    </div>
  );
}

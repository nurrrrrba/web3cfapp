'use client';

import { getContract } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { client } from "../client";
import { CROWDFUNDING_FACTORY } from "../constants/contracts";
import { useReadContract } from "thirdweb/react";
import CampaignCard from "../components/CampaignCard";

export default function CampaignsPage() {
  const contract = getContract({
    client: client,
    chain: polygonAmoy,
    address: CROWDFUNDING_FACTORY,
  });

  const { data: campaigns, isPending } = useReadContract({
    contract,
    method:
      "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
    params: [],
  });

  return (
    <main className="p-4 pb-10 min-h-screen container max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">All Campaigns</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {!isPending && campaigns && campaigns.length > 0 ? (
          campaigns.map(campaign => (
            <CampaignCard
              key={campaign.campaignAddress}
              campaignAddress={campaign.campaignAddress}
            />
          ))
        ) : isPending ? (
          <p className="text-center col-span-full">Loading campaigns...</p>
        ) : (
          <p className="text-center col-span-full">No campaigns found.</p>
        )}
      </div>
    </main>
  );
}

"use client";

import Image from "next/image";
import { ConnectButton, useReadContract } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { getContract } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { CROWDFUNDING_FACTORY } from "./constants/contracts";
import CampaignCard from "./components/CampaignCard";

export default function Home() {
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

  console.log(campaigns);

  return (
    <main className="p-4 pb-10 min-h-screen container max-w-screen-lg mx-auto">
      {/* Заголовок слева */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold">Campaigns:</h1>
      </div>

      {/* Сетка карточек */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {!isPending && campaigns && (
          campaigns.length > 0 ? (
            campaigns.map(campaign => (
              <div key={campaign.campaignAddress} className="h-64">
                <CampaignCard campaignAddress={campaign.campaignAddress} />
              </div>
            ))
          ) : (
            <p>No Campaigns Found</p>
          )
        )}
      </div>
    </main>
  );
}
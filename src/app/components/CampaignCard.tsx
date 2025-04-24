'use client'
import { getContract } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { client } from "../client";
import { useReadContract } from "thirdweb/react";

type CampaignCardProps = {
    campaignAddress: string;
};

export default function CampaignCard({campaignAddress}:CampaignCardProps) {
    const contract = getContract({
        client: client,
        chain: polygonAmoy,
        address: campaignAddress,
    });

    const { data: campaignName } = useReadContract({
        contract,
        method: "function name() view returns (string)",
        params: [],
      });

    const { data: campaignDescription } = useReadContract({
        contract,
        method: "function description() view returns (string)",
        params: [],
    });

    const { data: goal, isPending: isPendingGoal } = useReadContract({
        contract,
        method: "function goal() view returns (uint256)",
        params: [],
    });

    const { data: balance, isPending: isPendingBalance } = useReadContract({
        contract,
        method:
          "function getContractBalance() view returns (uint256)",
        params: [],
    });

    const totalBalance = balance?.toString();
    const totalGoal = goal?.toString();
    let balancePercentage = (parseInt(totalBalance as string) / parseInt(totalGoal as string)) * 100;

    if (balancePercentage >= 100){
        balancePercentage = 100;
    }

    return (
        <div className="flex flex-col justify-between max-w-sm p-6 bg-white border border-stale-200 rounded-lg shadow"> 
            <div>
                {!isPendingBalance && !isPendingGoal && (
                    <div className = "mb-4">
                        <div className="relative w-full h-6 ng-gray-200 rounded-full dark:bg-gray-700">
                            <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right" style={{ width: `${balancePercentage?.toString()}`}}>
                                <p className="text-white dark:text-white text-xs p-1">{balance?.toString()}/{goal?.toString()}</p>
                            </div>
                            <p className="absolute top-0 right-0 text-while dark:text-white text-xs p-1">
                                {balancePercentage >= 100 ? "" : `${balancePercentage?.toString()}%`} 
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
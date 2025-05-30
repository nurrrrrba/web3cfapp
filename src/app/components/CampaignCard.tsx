'use client'
import { getContract } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { client } from "../client";
import { useReadContract } from "thirdweb/react";
import Link from "next/link";

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
                        <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                            <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right" style={{ width: `${balancePercentage}%` }}>
                                <p className="text-gray-900 dark:text-white text-xs p-1">{balance?.toString()}/{goal?.toString()}</p>
                            </div>
                            <p className="absolute top-0 right-0 text-gray-900 dark:text-white text-xs p-1">
                                {balancePercentage >= 100 ? "" : `${balancePercentage?.toString()}%`} 
                            </p>
                        </div>
                    </div>
                )}
                <h5 className="mb-2 text-2xl font-bold tracking-tight">{campaignName}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{campaignDescription}</p>
            </div>
                <Link href={`/campaign/${campaignAddress}`} passHref={true}>
                    <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                        View Task
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </p>
                </Link>
        </div>
    );
}
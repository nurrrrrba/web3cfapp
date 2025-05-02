'use client';
import { getContract } from "thirdweb";
import { client } from "@/app/client";
import { polygonAmoy } from "thirdweb/chains";
import { useParams } from "next/navigation";
import { useReadContract } from "thirdweb/react";

export default function CapaignPage(){
    const { campaignAddress } = useParams();
    
    const contract = getContract({
        client: client,
        chain: polygonAmoy,
        address: campaignAddress as string,
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

    const { data: deadline, isPending: isPendingDeadline } = useReadContract({
        contract,
        method: "function deadline() view returns (uint256)",
        params: [],
    });

    const deadlineDate = new Date(parseInt(deadline?.toString() as string) * 1000); 
    const deadlineDatePassed = deadlineDate < new Date();

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

    const { data: tiers, isPending: isLoadingTears } = useReadContract({
        contract: contract,
        method:
          "function tiers(uint256) view returns (string name, uint256 amount, uint256 backers)",
        params: [],
    });

} 
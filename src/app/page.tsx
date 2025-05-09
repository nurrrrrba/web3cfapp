'use client';

import Image from "next/image";
import Link from "next/link";
import thirdwebIcon from "@public/thirdweb.svg";

export default function Home() {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-center p-8">
  
        {/* Logo */}
        <Image
          src={thirdwebIcon}
          alt="Thirdweb Logo"
          width={120}
          height={120}
          className="mb-6"
        />
  
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Decentralized Crowdsourcing
        </h1>
  
        {/* Subtitle */}
        <p className="text-xl text-gray-700 max-w-xl mb-6">
          Create, promote, and support ideas directly on the blockchain. 
          No middlemen. No limits.
        </p>
  
        {/* Call to Action */}
        <Link
          href="/campaigns"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Get started
        </Link>
      </main>
    );
  }

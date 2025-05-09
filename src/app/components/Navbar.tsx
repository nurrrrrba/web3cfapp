'use client';

import Image from "next/image";
import Link from "next/link";
import { ConnectButton, useActiveAccount, lightTheme } from "thirdweb/react";
import { client } from "../client";

export default function Navbar() {
  const account = useActiveAccount();

  return (
    <nav className="bg-slate-100 border-b-2 border-b-slate-300">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between w-full">

          {/* Левая группа: лого + ссылки */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0"
            >
              <Image
                src="/thirdweb.svg"
                alt="Crowdsourcing Logo"
                width={96}
                height={96}
                priority
                className="drop-shadow-[0_0_24px_rgba(167,38,169,0.66)] w-auto h-auto"
              />
            </Link>

            {/* Навигационные ссылки */}
            <div className="hidden sm:flex space-x-4">
              <Link
                href="/campaigns"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Campaigns
              </Link>
              {account && (
                <Link
                  href={`/dashboard/${account.address}`}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Правая группа: кнопка подключения */}
          <div className="flex items-center">
            <ConnectButton
              client={client}
              theme={lightTheme()}
              detailsButton={{ style: { maxHeight: "50px" } }}
            />
          </div>

        </div>
      </div>
    </nav>
  );
}

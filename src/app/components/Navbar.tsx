'use client';
import Image from 'next/image';
import thirdwebIcon from '@public/next.svg';
import Link from 'next/link';
import { ConnectButton, lightTheme, useActiveAccount } from 'thirdweb/react';
import { client } from '../client';

const Navbar = () => {
    const account = useActiveAccount();
    return (
        <nav className="bg-slate-100 border-b-2 border-b-slate-300">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between w-full">
                
                {/* Левая группа: лого + ссылки */}
                <div className="flex items-center space-x-6">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                    <Image
                        src={thirdwebIcon}
                        alt="Your Company"
                        width={96}
                        height={96}
                        style={{
                        filter: "drop-shadow(0px 0px 24px #a726a9a8)",
                        }}
                    />
                    </div>

                    {/* Навигационные ссылки */}
                    <div className="hidden sm:block">
                    <div className="flex space-x-4 hover:text-bold">
                        <Link href="/campaigns">
                        <p className="rounded-md px-3 py-2 text-sm font-medium text-slate-700">
                            Compaigns
                        </p>
                        </Link>
                        {account && (
                        <Link href={`/dashboard/${account.address}`}>
                            <p className="rounded-md px-3 py-2 text-sm font-medium text-slate-700">
                            Dashboard
                            </p>
                        </Link>
                        )}
                    </div>
                    </div>
                </div>

                {/* Правая группа: кнопка подключения */}
                <div className="flex items-center">
                    <ConnectButton
                    client={client}
                    theme={lightTheme()}
                    detailsButton={{
                        style: {
                        maxHeight: "50px",
                        },
                    }}
                    />
                </div>

                </div>
            </div>
        </nav>

    )
};

export default Navbar;
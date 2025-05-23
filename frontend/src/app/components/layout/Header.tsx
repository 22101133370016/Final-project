import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-green-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Tobacco Farmer MS
        </Link>
        <nav>
          <ul className="flex space-x-4">
      
            <li>
              <Link href="/farmer/signup" className="hover:underline">
                Farmer Signup
              </Link>
            </li>
            <li>
              <Link href="/buyer/signup" className="hover:underline">
                Farmer-Admin Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
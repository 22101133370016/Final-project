'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const AdminSigninForm = dynamic(() => import('./AdminSigninForm'), { ssr: false });

export default function AdminSignin() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <AdminSigninForm />
      </main>
      <Footer />
    </div>
  );
}

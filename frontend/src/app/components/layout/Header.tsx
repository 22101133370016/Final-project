// components/layout/Header.tsx
import Link from 'next/link';
import { Phone, HelpCircle, LayoutDashboard } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-green-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Tobacco Farmer MS
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="#" className="flex items-center space-x-1 hover:text-green-200">
            <Phone size={18} />
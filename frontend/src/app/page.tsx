"use client";

import { useState } from 'react';
import { User, UserPlus, Users, Package, BookOpen, DollarSign, Phone, HelpCircle, LayoutDashboard } from 'lucide-react';

export default function TobaccoManagementSystem() {
  const [showFarmerOptions, setShowFarmerOptions] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-green-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Tobacco Farmer MS</div>
          <div className="flex items-center space-x-6">
            <a href="#" className="flex items-center space-x-1 hover:text-green-200">
              <Phone size={18} />
              <span>CONTACT SUPPORT</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-green-200">
              <LayoutDashboard size={18} />
              <span>PORTALS</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-green-200">
              <HelpCircle size={18} />
              <span>FAQs</span>
            </a>
          </div>
        </div>
      </header>
      
      {/* Main Portal Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-800">Access Portals</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Farmer Portal */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
              <div className="bg-green-700 text-white p-6">
                <Users className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold">Farmer Portal</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">Access your farming data, receive updates and manage your tobacco production.</p>
                <button 
                  onClick={() => setShowFarmerOptions(!showFarmerOptions)} 
                  className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                >
                  Enter Portal
                </button>
                
                {showFarmerOptions && (
                  <div className="mt-4 space-y-2">
                    <a href="#" className="block bg-green-100 text-green-800 p-3 rounded flex items-center space-x-2 hover:bg-green-200">
                      <UserPlus size={18} />
                      <span>Signup as Farmer</span>
                    </a>
                    <a href="#" className="block bg-green-100 text-green-800 p-3 rounded flex items-center space-x-2 hover:bg-green-200">
                      <User size={18} />
                      <span>Signup as Farmer-Admin</span>
                    </a>
                    <a href="#" className="block bg-green-100 text-green-800 p-3 rounded flex items-center space-x-2 hover:bg-green-200">
                      <LayoutDashboard size={18} />
                      <span>Login</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {/* Admin Portal */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
              <div className="bg-blue-700 text-white p-6">
                <User className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold">Admin Portal</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">Manage farmers, track production, and oversee the entire tobacco farming system.</p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                  Enter Portal
                </button>
              </div>
            </div>
            
            {/* Distributor Portal */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
              <div className="bg-purple-700 text-white p-6">
                <Package className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold">Distributor Portal</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">Manage distribution, track inventory and coordinate with farmers and admin.</p>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition">
                  Enter Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Information Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-800">Tobacco Farming Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Inputs Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4 text-green-700">
                <Package size={24} className="mr-2" />
                <h3 className="text-xl font-bold">Inputs Distribution</h3>
              </div>
              <p className="text-gray-600">Access information about seeds, fertilizers, and other farming inputs available for distribution.</p>
              <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
                Learn More
              </button>
            </div>
            
            {/* Education */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4 text-green-700">
                <BookOpen size={24} className="mr-2" />
                <h3 className="text-xl font-bold">Education Center</h3>
              </div>
              <p className="text-gray-600">Learn best practices, techniques, and latest research in tobacco farming.</p>
              <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
                Access Materials
              </button>
            </div>
            
            {/* Price Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4 text-green-700">
                <DollarSign size={24} className="mr-2" />
                <h3 className="text-xl font-bold">Season Prices</h3>
              </div>
              <p className="text-gray-600">View current season's tobacco prices based on quality grades and market conditions.</p>
              <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
                Check Prices
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-green-900 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Tobacco Farmer Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

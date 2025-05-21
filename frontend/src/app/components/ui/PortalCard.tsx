// components/ui/PortalCard.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Users, Package, ChevronDown, ChevronUp } from 'lucide-react';

interface PortalOption {
  label: string;
  href: string;
}

interface PortalCardProps {
  title: string;
  description: string;
  type: 'farmer' | 'admin' | 'distributor';
  options: PortalOption[];
  showOptions?: boolean;
  toggleOptions?: () => void;
}

export default function PortalCard({ 
  title, 
  description, 
  type, 
  options,
  showOptions = false,
  toggleOptions
}: PortalCardProps) {
  const [localShowOptions, setLocalShowOptions] = useState(false);
  
  // Use either the provided toggle function or a local one
  const handleToggleOptions = toggleOptions || (() => setLocalShowOptions(!localShowOptions));
  const isShowingOptions = showOptions || localShowOptions;
  
  // Determine background color based on type
  const getBgColor = () => {
    switch(type) {
      case 'farmer': return 'bg-green-700';
      case 'admin': return 'bg-blue-700';
      case 'distributor': return 'bg-purple-700';
      default: return 'bg-gray-700';
    }
  };
  
  // Determine button color based on type
  const getButtonColor = () => {
    switch(type) {
      case 'farmer': return 'bg-green-600 hover:bg-green-700';
      case 'admin': return 'bg-blue-600 hover:bg-blue-700';
      case 'distributor': return 'bg-purple-600 hover:bg-purple-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };
  
  // Get icon based on type
  const getIcon = () => {
    switch(type) {
      case 'farmer': return <Users className="w-12 h-12 mb-4" />;
      case 'admin': return <User className="w-12 h-12 mb-4" />;
      case 'distributor': return <Package className="w-12 h-12 mb-4" />;
      default: return null;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
      <div className={`text-white p-6 ${getBgColor()}`}>
        {getIcon()}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-6">{description}</p>
        <button 
          onClick={handleToggleOptions}
          className={`w-full ${getButtonColor()} text-white py-2 px-4 rounded transition flex items-center justify-center`}
        >
          <span>Enter Portal</span>
          {isShowingOptions ? 
            <ChevronUp className="ml-2 w-5 h-5" /> : 
            <ChevronDown className="ml-2 w-5 h-5" />
          }
        </button>
        
        {isShowingOptions && (
          <div className="mt-4 space-y-2">
            {options.map((option, index) => (
              <Link 
                href={option.href} 
                key={index}
                className={`block text-${type === 'farmer' ? 'green' : type === 'admin' ? 'blue' : 'purple'}-800 p-3 rounded flex items-center space-x-2 hover:bg-${type === 'farmer' ? 'green' : type === 'admin' ? 'blue' : 'purple'}-100 bg-opacity-50`}
              >
                <span>{option.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
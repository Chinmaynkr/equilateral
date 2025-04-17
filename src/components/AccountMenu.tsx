import React, { useState } from 'react';
import { 
  User, Settings, LogOut, Bell, CreditCard, 
  ChevronDown, Shield, HelpCircle, UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AccountMenuProps {
  userName?: string;
  userEmail?: string;
  avatarUrl?: string;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ 
  userName = "John Doe", 
  userEmail = "john.doe@example.com",
  avatarUrl = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadNotifications] = useState(3);

  return (
    <div className="relative">
      <div 
        className="flex items-center space-x-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={userName} 
              className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium border-2 border-gray-200 dark:border-gray-700">
              {userName.charAt(0)}
            </div>
          )}
          {unreadNotifications > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              {unreadNotifications}
            </div>
          )}
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt={userName} 
                  className="w-10 h-10 rounded-full mr-3"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium mr-3">
                  {userName.charAt(0)}
                </div>
              )}
              <div>
                <div className="font-medium">{userName}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</div>
              </div>
            </div>
          </div>

          <div className="py-2">
            <button 
              className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
              <span>Profile</span>
            </button>
            
            <button 
              className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <CreditCard className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
              <span>Billing</span>
            </button>
            
            <button 
              className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <Bell className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
              <span>Notifications</span>
              {unreadNotifications > 0 && (
                <div className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadNotifications}
                </div>
              )}
            </button>
            
            <button 
              className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <Shield className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
              <span>Security</span>
            </button>
            
            <button 
              className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
              <span>Settings</span>
            </button>
            
            <button 
              className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <HelpCircle className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
              <span>Help & Support</span>
            </button>
          </div>

          <div className="p-2 border-t border-gray-200 dark:border-gray-800">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-1/2 flex items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Invite
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-1/2 flex items-center justify-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border-red-200 dark:border-red-900 hover:border-red-300 dark:hover:border-red-800"
                onClick={() => setIsOpen(false)}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AccountMenu;

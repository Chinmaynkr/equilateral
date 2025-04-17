import React from 'react';
import { Shield, Bell, AlertTriangle, CreditCard, Wallet, ArrowDownToLine, ArrowUpFromLine, Settings, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AccountTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Account</h2>
      
      {/* Account Details Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Account Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Account Name</div>
              <div className="font-medium">Equilateral Trading Account</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Balance</div>
              <div className="text-xl font-bold">₹12,45,680.50</div>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Security Settings
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800/30">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Freeze Account
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Account Type</div>
              <div className="font-medium">Trading</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Currency</div>
              <div className="font-medium">INR</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Account Status</div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                Active
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-3">
              <ArrowDownToLine className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="font-medium">Deposit Funds</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mx-auto mb-3">
              <ArrowUpFromLine className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="font-medium">Withdraw</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mx-auto mb-3">
              <Settings className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="font-medium">Account Settings</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mx-auto mb-3">
              <BarChart2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="font-medium">Preferences</div>
          </div>
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-4">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="font-medium">HDFC Credit Card</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">**** **** **** 4582</div>
              </div>
            </div>
            <div className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2.5 py-0.5 rounded-full">
              Default
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-4">
                <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="font-medium">ICICI Bank Account</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">ICICI Bank ****6745</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Set as Default
            </Button>
          </div>
          
          <Button variant="outline" size="sm" className="w-full">
            + Add Payment Method
          </Button>
        </div>
      </div>
      
      {/* Transaction History */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                <ArrowDownToLine className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="font-medium">Deposit</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">17 Apr, 2025</div>
              </div>
            </div>
            <div className="text-green-600 dark:text-green-400 font-medium">+₹5,00,000</div>
          </div>
          
          <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="font-medium">Stock Purchase - RELIANCE</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">15 Apr, 2025</div>
              </div>
            </div>
            <div className="text-red-600 dark:text-red-400 font-medium">-₹2,45,075</div>
          </div>
          
          <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3">
                <Wallet className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="font-medium">Dividend - HDFCBANK</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">12 Apr, 2025</div>
              </div>
            </div>
            <div className="text-green-600 dark:text-green-400 font-medium">+₹12,550</div>
          </div>
          
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mr-3">
                <ArrowUpFromLine className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="font-medium">Withdrawal</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">10 Apr, 2025</div>
              </div>
            </div>
            <div className="text-red-600 dark:text-red-400 font-medium">-₹1,00,000</div>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="w-full mt-4">
          View All Transactions
        </Button>
      </div>
    </div>
  );
};

export default AccountTab;

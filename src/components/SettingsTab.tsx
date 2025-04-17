import React, { useState } from 'react';
import { 
  Moon, Sun, Bell, Lock, Eye, EyeOff, Smartphone, 
  Globe, Palette, RefreshCw, Save, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const SettingsTab: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    newsAlerts: true,
    earningsAlerts: true,
    marketOpen: false,
    marketClose: true
  });
  const [displaySettings, setDisplaySettings] = useState({
    compactMode: false,
    showVolume: true,
    showMarketCap: true,
    decimalPlaces: 2
  });
  const [savedSettings, setSavedSettings] = useState(false);

  const handleSaveSettings = () => {
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2000);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      {/* Appearance Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Palette className="h-5 w-5 mr-2 text-purple-500 dark:text-purple-400" />
          Appearance
        </h3>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Theme</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Choose between light and dark mode</div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={theme === 'light' ? "default" : "outline"} 
                size="sm"
                onClick={() => setTheme('light')}
                className="flex items-center"
              >
                <Sun className="h-4 w-4 mr-1" />
                Light
              </Button>
              <Button 
                variant={theme === 'dark' ? "default" : "outline"} 
                size="sm"
                onClick={() => setTheme('dark')}
                className="flex items-center"
              >
                <Moon className="h-4 w-4 mr-1" />
                Dark
              </Button>
              <Button 
                variant={theme === 'system' ? "default" : "outline"} 
                size="sm"
                onClick={() => setTheme('system')}
                className="flex items-center"
              >
                <Globe className="h-4 w-4 mr-1" />
                System
              </Button>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Compact Mode</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Display more information in less space</div>
              </div>
              <div>
                <button 
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${displaySettings.compactMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                  onClick={() => setDisplaySettings({...displaySettings, compactMode: !displaySettings.compactMode})}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${displaySettings.compactMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Decimal Places</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Number of decimal places to show for prices</div>
              </div>
              <div className="flex space-x-2">
                {[2, 3, 4].map((num) => (
                  <Button 
                    key={num}
                    variant={displaySettings.decimalPlaces === num ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setDisplaySettings({...displaySettings, decimalPlaces: num})}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-amber-500 dark:text-amber-400" />
          Notifications
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Price Alerts</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Get notified when stocks hit your price targets</div>
            </div>
            <div>
              <button 
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${notifications.priceAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                onClick={() => setNotifications({...notifications, priceAlerts: !notifications.priceAlerts})}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.priceAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">News Alerts</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Get notified about breaking news for your watchlist</div>
            </div>
            <div>
              <button 
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${notifications.newsAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                onClick={() => setNotifications({...notifications, newsAlerts: !notifications.newsAlerts})}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.newsAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Earnings Alerts</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Get notified about upcoming earnings reports</div>
            </div>
            <div>
              <button 
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${notifications.earningsAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                onClick={() => setNotifications({...notifications, earningsAlerts: !notifications.earningsAlerts})}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.earningsAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Market Open</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Get notified when markets open</div>
            </div>
            <div>
              <button 
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${notifications.marketOpen ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                onClick={() => setNotifications({...notifications, marketOpen: !notifications.marketOpen})}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.marketOpen ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Market Close</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Get notified when markets close</div>
            </div>
            <div>
              <button 
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${notifications.marketClose ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                onClick={() => setNotifications({...notifications, marketClose: !notifications.marketClose})}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.marketClose ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Lock className="h-5 w-5 mr-2 text-green-500 dark:text-green-400" />
          Security
        </h3>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</div>
            </div>
            <Button variant="outline" size="sm">
              <Smartphone className="h-4 w-4 mr-1" />
              Setup 2FA
            </Button>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Session Timeout</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Automatically log out after period of inactivity</div>
              </div>
              <div className="flex space-x-2">
                <select className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1 text-sm">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Hide Account Balance</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Show/hide your account balance</div>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Toggle Visibility
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Data Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <RefreshCw className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
          Data & Privacy
        </h3>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Data Refresh Rate</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">How often to refresh market data</div>
            </div>
            <div className="flex space-x-2">
              <select className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1 text-sm">
                <option value="realtime">Real-time</option>
                <option value="5">5 seconds</option>
                <option value="10">10 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
              </select>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Usage Analytics</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Share anonymous usage data to help improve the platform</div>
              </div>
              <div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button variant="outline">
          Reset to Defaults
        </Button>
        <Button onClick={handleSaveSettings} className="flex items-center">
          {savedSettings ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Saved!
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-1" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SettingsTab;

import React, { useState } from 'react';
import { Stock } from '@/types/portfolio';
import { 
  Plus, Star, StarOff, MoreHorizontal, Bell, Trash2, 
  ChevronUp, ChevronDown, AlertCircle, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WatchlistTabProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
}

const WatchlistTab: React.FC<WatchlistTabProps> = ({ stocks, onSelectStock }) => {
  const [watchlistStocks, setWatchlistStocks] = useState<Stock[]>(stocks.slice(0, 5));
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [alertsVisible, setAlertsVisible] = useState(false);

  // Price alerts mock data
  const priceAlerts = [
    { id: 'alert-1', symbol: 'RELIANCE', condition: 'above', price: 2850.00, currentPrice: 2789.35 },
    { id: 'alert-2', symbol: 'INFY', condition: 'below', price: 1400.00, currentPrice: 1389.75 },
    { id: 'alert-3', symbol: 'HDFCBANK', condition: 'above', price: 1700.00, currentPrice: 1675.50 },
    { id: 'alert-4', symbol: 'TCS', condition: 'below', price: 3600.00, currentPrice: 3578.25 },
    { id: 'alert-5', symbol: 'BAJFINANCE', condition: 'above', price: 7900.00, currentPrice: 7845.75 },
  ];

  const removeFromWatchlist = (symbol: string) => {
    setWatchlistStocks(watchlistStocks.filter(stock => stock.symbol !== symbol));
  };

  const addToWatchlist = (stock: Stock) => {
    if (!watchlistStocks.find(s => s.symbol === stock.symbol)) {
      setWatchlistStocks([...watchlistStocks, stock]);
    }
    setShowAddStockModal(false);
  };

  const filteredStocks = stocks.filter(stock => 
    !watchlistStocks.find(s => s.symbol === stock.symbol) && 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Watchlist</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setAlertsVisible(!alertsVisible)}
            className={alertsVisible ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800" : ""}
          >
            <Bell className="h-4 w-4 mr-1" />
            Alerts
          </Button>
          <Button 
            onClick={() => setShowAddStockModal(true)}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Symbol
          </Button>
        </div>
      </div>

      {/* Watchlist Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Price</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change %</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {watchlistStocks.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-400 mr-2" />
                      <span className="font-medium">{stock.symbol}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{stock.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">₹{stock.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <span className={stock.changeToday >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                      {stock.changeToday >= 0 ? '+' : ''}{(stock.ltp * stock.changeToday / 100).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end">
                      {stock.changeToday >= 0 ? 
                        <ChevronUp className="h-3 w-3 text-green-600 dark:text-green-400 mr-1" /> : 
                        <ChevronDown className="h-3 w-3 text-red-600 dark:text-red-400 mr-1" />
                      }
                      <span className={stock.changeToday >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                        {stock.changeToday >= 0 ? '+' : ''}{stock.changeToday.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="Set Alert"
                      >
                        <Bell className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </button>
                      <button 
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="Remove from Watchlist"
                        onClick={() => removeFromWatchlist(stock.symbol)}
                      >
                        <Trash2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {watchlistStocks.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center">
                      <StarOff className="h-8 w-8 mb-2 text-gray-400 dark:text-gray-600" />
                      <p>Your watchlist is empty</p>
                      <p className="text-sm mt-1">Click "Add Symbol" to start tracking stocks</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Alerts Section */}
      {alertsVisible && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Price Alerts</h3>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Alert
            </Button>
          </div>
          
          <div className="space-y-2">
            {priceAlerts.map((alert) => (
              <div key={alert.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                <div>
                  <div className="font-medium">{alert.symbol} {alert.condition === 'above' ? 'Above' : 'Below'} ₹{alert.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Current: ₹{alert.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Trash2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            ))}

            {priceAlerts.length === 0 && (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p>No price alerts set</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Stock Modal */}
      {showAddStockModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add to Watchlist</h3>
              <button 
                onClick={() => setShowAddStockModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Trash2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search symbols..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              {filteredStocks.length > 0 ? (
                <div className="space-y-1">
                  {filteredStocks.map((stock) => (
                    <div 
                      key={stock.symbol}
                      className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                      onClick={() => addToWatchlist(stock)}
                    >
                      <div>
                        <div className="text-sm font-medium">₹{stock.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'No matching symbols found' : 'Start typing to search for symbols'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistTab;

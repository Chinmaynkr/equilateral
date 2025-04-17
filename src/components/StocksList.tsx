
import { Stock } from "../types/portfolio";
import StockCard from "./StockCard";
import { AnimatePresence, motion } from "framer-motion";

interface StocksListProps {
  stocks: Stock[];
}

const StocksList = ({ stocks }: StocksListProps) => {
  if (stocks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No stocks found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {stocks.map((stock) => (
          <motion.div
            key={stock.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <StockCard stock={stock} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default StocksList;

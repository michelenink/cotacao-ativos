import { create } from "zustand";

type QuoteHistory = {
  [symbol: string]: {
    timestamps: string[];
    prices: number[];
  };
};

interface QuoteStore {
  history: QuoteHistory;
  updateHistory: (symbol: string, price: number) => void;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
  history: {},
  updateHistory: (symbol, price) =>
    set((state) => {
      const now = new Date().toLocaleTimeString();
      const prev = state.history[symbol] || { timestamps: [], prices: [] };
      return {
        history: {
          ...state.history,
          [symbol]: {
            timestamps: [...prev.timestamps, now].slice(-10),
            prices: [...prev.prices, price].slice(-10),
          },
        },
      };
    }),
}));

export interface FinanceData {
  currencies: {
    [key: string]: {
      name: string;
      buy: number;
      sell: number;
      variation: number;
    };
  };
  stocks: {
    [key: string]: {
      name: string;
      location: string;
      points: number;
      variation: number;
    };
  };
}

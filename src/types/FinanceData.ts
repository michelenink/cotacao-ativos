export interface FinanceData {
  by: string;
  valid_key: boolean;
  results: {
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
    available_sources: string[];
    bitcoin: {
      blockchain_info: {
        name: string;
        format: string[];
        last: number;
        buy: number;
        sell: number;
        variation: number;
      };
      bitstamp: {
        name: string;
        format: string[];
        last: number;
        buy: number;
        sell: number;
        variation: number;
      };
      foxbit: {
        name: string;
        format: string[];
        last: number;
        variation: number;
      };
      mercadobitcoin: {
        name: string;
        format: string[];
        last: number;
        buy: number;
        sell: number;
        variation: number;
      };
    };
    taxes: Array<{
      date: string;
      cdi: number;
      selic: number;
      daily_factor: number;
      selic_daily: number;
      cdi_daily: number;
    }>;
  };
  execution_time: number;
  from_cache: boolean;
}

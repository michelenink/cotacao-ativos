import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectedQuoteChart from "~/components/Quotes/SelectedQuoteChart";
import Button from "~/components/Shared/Button/Button";
import { getFinanceData } from "~/services/api";
import { useQuoteStore } from "~/store/quotes";
import { FinanceData } from "~/types/FinanceData";
import { clearSession, isSessionValid } from "~/utils/session";
import styles from "./Dashboard.module.scss";

interface Quote {
  name: string;
  buy: number;
  sell: number;
  variation: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const updateHistory = useQuoteStore((state) => state.updateHistory);

  const logout = () => {
    clearSession();
    navigate("/login");
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await getFinanceData();
      const data = response as FinanceData;

      const currencies = data.currencies;
      const stocks = data.stocks;

      const currencyItems: Quote[] = Object.keys(currencies).map((key) => {
        const item = currencies[key];
        return {
          name: item.name,
          buy: item.buy,
          sell: item.sell,
          variation: item.variation,
        };
      });

      const stockItems: Quote[] = Object.keys(stocks).map((key) => {
        const item = stocks[key];
        return {
          name: item.name,
          buy: item.points,
          sell: item.points,
          variation: item.variation,
        };
      });

      const combined: Quote[] = [...currencyItems, ...stockItems];
      const selected: Quote[] = combined.slice(0, 10);

      setQuotes(selected);
      selected.forEach((item) => updateHistory(item.name, item.buy));
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar cotações:", error);
    }
  }, [updateHistory]);

  useEffect(() => {
    fetchData();
    const interval = setTimeout(() => fetchData(), 10000);
    return () => clearTimeout(interval);
  }, [fetchData]);

  useEffect(() => {
    const sessionCheck = setInterval(() => {
      if (!isSessionValid()) {
        clearSession();
        navigate("/login");
      }
    }, 5000);
    return () => clearInterval(sessionCheck);
  }, [navigate]);

  if (loading)
    return <p className='text-center mt-10'>Carregando cotações...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cotações</h1>
        <Button onClick={logout} variant='secondary'>
          Sair
        </Button>
      </div>

      <div className={styles.quoteGrid}>
        {quotes.map((item, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("quoteSelected", { detail: item.name })
              )
            }
          >
            <h2 className={styles.cardTitle}>{item.name}</h2>
            <p>Compra: R$ {item.buy?.toFixed(2)}</p>
            <p>Venda: R$ {item.sell?.toFixed(2)}</p>
            <p
              className={
                item.variation > 0 ? styles.pricePositive : styles.priceNegative
              }
            >
              Variação: {item.variation?.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>

      <div className={styles.chartWrapper}>
        <SelectedQuoteChart />
      </div>
    </div>
  );
};

export default Dashboard;

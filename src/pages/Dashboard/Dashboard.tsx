import { useCallback, useEffect, useRef, useState } from "react";
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
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const updateHistory = useQuoteStore((state) => state.updateHistory);

  const logout = () => {
    clearSession();
    navigate("/login");
  };

  const mapCurrencies = (currencies: FinanceData["currencies"]): Quote[] =>
    Object.entries(currencies)
      .filter(([key, value]) => key !== "source" && value?.name)
      .map(([_, item]) => ({
        name: item.name,
        buy: item.buy,
        sell: item.sell,
        variation: item.variation,
      }));

  const mapStocks = (stocks: FinanceData["stocks"]): Quote[] =>
    Object.entries(stocks).map(([_, item]) => ({
      name: item.name,
      buy: item.points,
      sell: item.points,
      variation: item.variation,
    }));

  const fetchData = useCallback(async () => {
    try {
      const response = await getFinanceData();
      const data = response as FinanceData;

      const currencies = mapCurrencies(data.currencies);
      const stocks = mapStocks(data.stocks);

      const ibovIndex = stocks.findIndex(
        (item) => item.name === "BM&F BOVESPA"
      );
      const ibovespa = ibovIndex !== -1 ? stocks.splice(ibovIndex, 1)[0] : null;

      const combined = [
        ...(ibovespa ? [ibovespa] : []),
        ...currencies,
        ...stocks,
      ];

      const selected = combined.slice(0, 10);
      setQuotes(selected);
      selected.forEach((q) => updateHistory(q.name, q.buy));
    } catch (error) {
      console.error("Erro ao buscar cotações:", error);
    } finally {
      setLoading(false);
    }
  }, [updateHistory]);

  useEffect(() => {
    fetchData();
    const timeout = setTimeout(fetchData, 10000);
    return () => clearTimeout(timeout);
  }, [fetchData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSessionValid()) {
        clearSession();
        navigate("/login");
      }
    }, 5000);
    return () => clearInterval(interval);
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
            className={`${styles.card} ${
              item.name === "BM&F BOVESPA" ? styles.ibovCard : ""
            }`}
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("quoteSelected", { detail: item.name })
              );
              chartRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <h2 className={styles.cardTitle}>{item.name}</h2>

            {item.name === "BM&F BOVESPA" ? (
              <p>
                Índice:{" "}
                {item.buy.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            ) : (
              <>
                <p>Compra: R$ {item.buy?.toFixed(2) ?? "--"}</p>
                <p>Venda: R$ {item.sell?.toFixed(2) ?? "--"}</p>
              </>
            )}

            <p
              className={
                item.variation > 0 ? styles.pricePositive : styles.priceNegative
              }
            >
              Variação:{" "}
              {item.variation != null ? `${item.variation.toFixed(2)}%` : "--"}
            </p>
          </div>
        ))}
      </div>

      <div ref={chartRef} className={styles.chartWrapper}>
        <SelectedQuoteChart />
      </div>
    </div>
  );
};

export default Dashboard;

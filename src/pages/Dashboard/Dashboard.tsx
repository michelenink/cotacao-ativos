import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Card from "~/components/Card/Card";
import SelectedQuoteChart from "~/components/Quotes/SelectedQuoteChart";
import Button from "~/components/Shared/Button/Button";
import { getFinanceData } from "~/services/api";
import { useQuoteStore } from "~/store/quotes";
import { FinanceData } from "~/types/FinanceData";
import { clearSession, isSessionValid } from "~/utils/session";
import styles from "./Dashboard.module.scss";

interface Tax {
  date: string;
  cdi: number;
  selic: number;
  daily_factor: number;
  selic_daily: number;
  cdi_daily: number;
}

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
  const [taxes, setTaxes] = useState<Tax | null>(null);
  const [loading, setLoading] = useState(true);
  const updateHistory = useQuoteStore((state) => state.updateHistory);
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  const logout = () => {
    clearSession();
    navigate("/login");
  };

  const mapCurrencies = (
    currencies: FinanceData["results"]["currencies"]
  ): Quote[] => {
    if (!currencies) return [];
    return Object.entries(currencies)
      .filter(([key, value]) => key !== "source" && value?.name)
      .map(([, item]) => ({
        name: item.name,
        buy: item.buy ?? 0,
        sell: item.sell ?? 0,
        variation: item.variation ?? 0,
      }));
  };

  const mapStocks = (stocks: FinanceData["results"]["stocks"]): Quote[] => {
    if (!stocks) return [];
    return Object.values(stocks).map((item) => ({
      name: item.name,
      buy: item.points ?? 0,
      sell: item.points ?? 0,
      variation: item.variation ?? 0,
    }));
  };

  const mapTaxes = (taxes: FinanceData["results"]["taxes"]): Tax | null => {
    if (!taxes || taxes.length === 0) return null;
    return taxes[taxes.length - 1];
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await getFinanceData();
      const data = response as FinanceData;

      if (!data?.results?.currencies || !data?.results?.stocks) {
        console.error("Dados de cotações não encontrados.");
        return;
      }

      const currencies = mapCurrencies(data.results.currencies);
      const stocks = mapStocks(data.results.stocks);
      const taxes = mapTaxes(data.results.taxes);

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
      setTaxes(taxes);
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

  const scrollToChart = () => {
    if (chartRef.current) {
      chartRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCardClick = (quoteName: string) => {
    if (quoteName === "Taxas") {
      toast.info("Não há gráfico disponível para o índice de Taxas");
      return;
    }

    setSelectedQuote(quoteName);

    window.dispatchEvent(
      new CustomEvent("quoteSelected", { detail: quoteName })
    );

    scrollToChart();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cotações</h1>
        <Button onClick={logout} variant='secondary'>
          Sair
        </Button>
      </div>

      <div className={styles.cardContainer}>
        <div className='flex space-x-4 mb-6'>
          <Card
            title='BM&F BOVESPA'
            value={quotes[0]?.buy}
            variation={quotes[0]?.variation}
            onClick={() => handleCardClick("BM&F BOVESPA")}
          />
          <Card
            title='Taxas'
            value={taxes?.cdi ?? 0}
            variation={taxes?.selic ?? 0}
            cdi={taxes?.cdi}
            selic={taxes?.selic}
            onClick={() => handleCardClick("Taxas")}
          />
        </div>
      </div>

      <div className={styles.quoteGrid}>
        {quotes.slice(1).map((item, index) => (
          <Card
            key={index}
            title={item.name}
            value={item.buy}
            variation={item.variation}
            buy={item.buy}
            sell={item.sell}
            isCurrency
            onClick={() => handleCardClick(item.name)}
          />
        ))}
      </div>

      <div ref={chartRef} className={styles.chartWrapper}>
        {selectedQuote && <SelectedQuoteChart selectedQuote={selectedQuote} />}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useQuoteStore } from "~/store/quotes";
import styles from "./SelectedQuoteChart.module.scss";

interface ChartData {
  timestamps: string[];
  prices: number[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const SelectedQuoteChart = ({
  selectedQuote,
}: {
  selectedQuote: string | null;
}) => {
  const history = useQuoteStore((state) => state.history);
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    if (selectedQuote && history[selectedQuote]) {
      setData(history[selectedQuote]);
    }
  }, [selectedQuote, history]);

  useEffect(() => {
    return () => {
      const chartCanvas = document.getElementById(
        "chartCanvas"
      ) as HTMLCanvasElement;
      if (chartCanvas) {
        const chartInstance = ChartJS.getChart(chartCanvas);
        if (chartInstance) {
          chartInstance.destroy();
        }
      }
    };
  }, [selectedQuote]);

  if (!data)
    return (
      <p className={styles.noData}>Selecione uma cotação para ver o gráfico</p>
    );

  return (
    <div className={styles.chartWrapper}>
      <h2 className={styles.chartTitle}>Histórico: {selectedQuote}</h2>
      <div className={styles.chartCanvasWrapper}>
        <Line
          id='chartCanvas'
          key={selectedQuote}
          data={{
            labels: data.timestamps,
            datasets: [
              {
                label: "Preço de compra (R$)",
                data: data.prices,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default SelectedQuoteChart;

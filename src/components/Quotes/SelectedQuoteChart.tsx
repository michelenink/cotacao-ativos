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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const SelectedQuoteChart = () => {
  const history = useQuoteStore((state) => state.history);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const handleQuoteSelected = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setSelected(customEvent.detail);
    };

    window.addEventListener("quoteSelected", handleQuoteSelected);
    return () => {
      window.removeEventListener("quoteSelected", handleQuoteSelected);
    };
  }, []);

  if (!selected || !history[selected])
    return (
      <p className='text-center'>Selecione uma cotação para ver o gráfico</p>
    );

  const data = history[selected];
  return (
    <div className='bg-white p-4 rounded shadow-md'>
      <h2 className='text-lg font-semibold mb-2'>Histórico: {selected}</h2>
      <Line
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
  );
};

export default SelectedQuoteChart;

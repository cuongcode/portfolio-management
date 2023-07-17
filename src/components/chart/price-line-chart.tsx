import { ChevronDownIcon } from '@heroicons/react/outline';
import type { ChartItem, ChartTypeRegistry } from 'chart.js/auto';
import { Chart } from 'chart.js/auto';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { useCheckClickOutside } from '@/custom-hooks/use-check-click-outside';
import { STATIC_PRICE_DATA } from '@/utils/static-price-data';

export const PriceLineChart = () => {
  const data = STATIC_PRICE_DATA.prices;
  const times = data.map((item: any) => dayjs(item[0]).format('DD MMM'));
  const prices = data.map((item: any) => item[1]);

  useEffect(() => {
    let chart: Chart<keyof ChartTypeRegistry, any[], any>;
    const ctx = document.getElementById('myChart') as ChartItem;
    if (ctx) {
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: times,
          datasets: [
            {
              label: 'prices',
              data: prices,
              borderWidth: 2,
              borderColor: 'rgb(47, 114, 227)',
              pointStyle: false,
              tension: 0.5,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
          },
          maintainAspectRatio: false,
        },
      });
    }

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="m-auto flex w-full flex-col">
      <CoinOptionDropdown />
      <div className="">
        <canvas id="myChart" />
      </div>
    </div>
  );
};

const CoinOptionDropdown = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const outsideRef = useCheckClickOutside(() => setIsDropdown(false));

  return (
    <button
      ref={outsideRef}
      type="button"
      onClick={() => setIsDropdown(true)}
      className="relative flex h-7 w-fit items-center gap-1 place-self-end rounded-md border-2 px-2 text-xs"
    >
      <div className="font-semibold">Bitcoin</div>
      <ChevronDownIcon className="w-3" />
      {isDropdown ? (
        <div className="absolute -right-1 top-7 flex w-28 flex-col rounded-lg border-2 bg-white p-1">
          <div className="hover:rounded-sm hover:bg-[#d1e1fb]">Ethereum</div>
          <div className="hover:rounded-sm hover:bg-[#d1e1fb]">Cardano</div>
          <div className="hover:rounded-sm hover:bg-[#d1e1fb]">BNB</div>
        </div>
      ) : null}
    </button>
  );
};

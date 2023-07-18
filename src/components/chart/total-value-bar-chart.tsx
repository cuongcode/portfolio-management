import type { ChartItem, ChartTypeRegistry } from 'chart.js/auto';
import { Chart } from 'chart.js/auto';
import { useEffect } from 'react';

import { TOTAL_VALUE_STATIC_DATA } from '@/utils/static-total-value-data';

export const TotalValueColumnChart = () => {
  const times = TOTAL_VALUE_STATIC_DATA.map((item: any) => item.time);
  const totalValues = TOTAL_VALUE_STATIC_DATA.map(
    (item: any) => item.totalValue
  );
  useEffect(() => {
    let chart: Chart<keyof ChartTypeRegistry, any[], any>;
    const ctx = document.getElementById('TotalValueColumnChart') as ChartItem;
    if (ctx) {
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: times,
          datasets: [
            {
              label: 'Total Value Overtime',
              data: totalValues,
              backgroundColor: ['rgba(209, 225, 251,0.5)'],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
        },
      });
    }

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="">
      <canvas id="TotalValueColumnChart" />
    </div>
  );
};

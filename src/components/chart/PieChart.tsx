import type { ChartItem, ChartTypeRegistry } from 'chart.js/auto';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selector } from '@/redux';
import { selectHoldingsValueList } from '@/redux/Data/DataRedux';
import type { Coin } from '@/types/Coin';

Chart.register(ChartDataLabels);

export const PieChart = () => {
  const { currentData } = useSelector(selector.data);

  const HoldingsValueList = selectHoldingsValueList(currentData);

  const [listlabels, setListLabels] = useState<any[]>([]);

  useEffect(() => {
    const a = currentData.map((item: Coin) => item.symbol.toUpperCase());
    const normalArray = Object.keys(a).map((key: any) => a[key]);
    setListLabels(normalArray);
  }, [currentData]);

  useEffect(() => {
    let chart: Chart<keyof ChartTypeRegistry, any[], any>;
    const ctx = document.getElementById('PieChart') as ChartItem;
    if (ctx) {
      chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: listlabels,
          datasets: [
            {
              label: '$',
              data: HoldingsValueList,
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            datalabels: {
              formatter: (value) => {
                function totalSum(total: number, datapoint: number) {
                  return total + datapoint;
                }
                const totalValue = HoldingsValueList.reduce(totalSum, 0);
                const percentageValue = ((value / totalValue) * 100).toFixed(1);
                return `${percentageValue}%`;
              },
            },
            legend: {
              position: 'right',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 15,
              },
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    }

    return () => {
      chart.destroy();
    };
  }, [listlabels, HoldingsValueList]);

  return (
    <div className="">
      <canvas id="PieChart" />
    </div>
  );
};

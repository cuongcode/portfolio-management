import { DeleteCoinButton } from './delete-coin-button';
import { OpenTransactionsButton } from './open-transactions-button';

export const CoinTable = ({
  data,
  avgNetCostList,
  holdingsValueList,
  holdingsList,
  PNL_List,
}: {
  data: any;
  avgNetCostList: any;
  holdingsValueList: any;
  holdingsList: any;
  PNL_List: any;
}) => {
  return (
    <table className="table-fixed text-left">
      <thead>
        <tr className="border-t">
          <th>#</th>
          <th>Coin</th>
          <th>Price</th>
          <th>Avg Price</th>
          <th>Holdings</th>
          <th>PNL</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((coin: any, index: any) => (
          <tr key={coin.id} className="border-t ">
            <td>{index}</td>
            <td className="">
              <span className="mr-1 font-bold">{coin.name}</span>
              <span className="text-xs font-light">
                {coin.symbol.toLocaleUpperCase()}
              </span>
            </td>
            <td>{coin.price}</td>
            <td>${avgNetCostList[index]}</td>
            <td>
              ${holdingsValueList[index]} (10%) {holdingsList[index]}
              {coin.symbol.toLocaleUpperCase()}
            </td>
            <td>${PNL_List[index]} 4%</td>
            <td className="flex flex-col items-center gap-1 py-1">
              <OpenTransactionsButton coin={coin} />
              <DeleteCoinButton deletedCoin={coin} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

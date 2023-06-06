import { ButtonLeftSideModal } from './button-left-side-modal';
import { AddTransactionForm } from './form-add-transaction';

export const CoinsTable = ({
  coins,
  coinDelete,
}: {
  coins: any;
  coinDelete: (token: any) => void;
}) => {
  return (
    <>
      {/* table */}
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
          {coins.map((item, index) => (
            <tr key={item.name} className="border-t">
              <td>{index}</td>
              <td>{item.symbol}</td>
              <td>{item.price}</td>
              <td>24,120.81</td>
              <td>$1000 (10%) 0.1BTC</td>
              <td>$20.00 4%</td>
              <td className="flex flex-col items-center">
                {/* <button>+</button> */}
                <ButtonLeftSideModal
                  text="+"
                  style=""
                  modalContent={<AddTransactionForm />}
                />
                <button
                  type="button"
                  className="w-fit"
                  onClick={() => coinDelete(item)}
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

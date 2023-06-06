import { ButtonCenterModal } from './button-center-modal';
import { ButtonLeftSideModal } from './button-left-side-modal';
import { AddNewCoinForm } from './form-add-new-coin';
import { AddTransactionForm } from './form-add-transaction';
import { Token } from './token';

export const Board = ({
  tokens,
  onTokenDelete,
}: {
  tokens: [];
  onTokenDelete: (token: any) => { void: any };
}) => {
  return (
    <div className="flex min-h-screen flex-col rounded-md border-[1px] border-gray-400 p-4">
      <div className="mb-10 flex justify-between">
        <div className="flex items-center">
          <h3 className="mr-2 font-bold">My Portfolio</h3>
          {/* add icon here to modify portfolio eg: rename, delete, ... */}
          <div className=" cursor-pointer ">+</div>
        </div>
        <ButtonCenterModal
          style="rounded-md bg-green-500 px-4 py-2 text-white "
          text="Add New Coin"
          modalContent={<AddNewCoinForm />}
        />
      </div>

      {/* show total cards */}
      <div className="mb-10 flex">
        <div className=" mr-6 p-4 shadow-md">
          <div>$5000.00</div>
          <div>Total Balance</div>
        </div>
        <div className=" mr-6 p-4 shadow-md">
          <div>$1000.00</div>
          <div>Total Profit Loss</div>
        </div>
      </div>

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
          <tr className="border-t">
            <td>1</td>
            <td>Bitcoin</td>
            <td>27,331.22</td>
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
              <button type="button" className="w-fit">
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* testing */}
      <ul>
        {tokens.map((token) => {
          return (
            <li key={token?.symbol}>
              <Token token={token} tokenDelete={onTokenDelete} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

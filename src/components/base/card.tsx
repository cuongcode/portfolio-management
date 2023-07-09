export const Card = ({
  title,
  number,
  showColor,
}: {
  title: string;
  number: number | undefined;
  showColor: boolean;
}) => {
  return (
    <div className=" mr-6 p-4 shadow-md">
      {showColor && number ? (
        <div className={`${number > 0 ? 'text-green-500' : 'text-red-500'}`}>
          ${number?.toFixed(3)}
        </div>
      ) : (
        <div>${number?.toFixed(3)}</div>
      )}
      <div>{title}</div>
    </div>
  );
};

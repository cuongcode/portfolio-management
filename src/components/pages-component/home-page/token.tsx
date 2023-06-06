export function Token({
  token,
  tokenDelete,
}: {
  token: any;
  tokenDelete: (token: any) => void;
}) {
  const handleDelete = () => {
    tokenDelete(token);
  };

  return (
    <div>
      {token.symbol}: {token.price}|
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

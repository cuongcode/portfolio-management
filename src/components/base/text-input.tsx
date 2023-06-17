interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: string;
}
export const TextInput = ({ title, error, ...rest }: TextInputProps) => {
  return (
    <div className="mb-4 flex flex-col">
      <div className="font-bold">{title}</div>
      <input
        className="rounded-md border-2 p-2"
        type="number"
        placeholder="1"
        {...rest}
      />
      <div className="text-red-500">{error}</div>
    </div>
  );
};

// ADVANCDE FORM : useCallback , useMemo

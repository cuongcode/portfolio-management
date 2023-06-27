export const Header = ({
  title,
  description,
}: {
  title: any;
  description: any;
}) => {
  return (
    <header className="border-b border-gray-300 pb-4">
      <div className="pb-8 pt-16">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <h2 className="text-xl">{description}</h2>
      </div>
    </header>
  );
};

import Link from 'next/link';

export const FooterHeader = ({
  logo,
  description,
}: {
  logo: any;
  description: any;
}) => {
  return (
    <div className="flex flex-col text-left text-sm">
      <Link className="hover:no-underline" href="/">
        <img className="w-32" alt={logo?.alt} src={logo?.path} />
      </Link>
      <div>{description}</div>
    </div>
  );
};

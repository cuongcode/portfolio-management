import Link from 'next/link';

export const FooterHeader = ({
  logo,
  description,
}: {
  logo: any;
  description: any;
}) => {
  return (
    <div className="flex flex-col items-center text-left text-sm">
      <Link className="logo-footer mb-2" href="/">
        <img className="w-40" alt={logo?.alt} src={logo?.path} />
      </Link>
      <hr
        className="mx-auto inline-block"
        style={{
          width: '170px',
          backgroundColor: '#8bc53f',
          height: '2px',
        }}
      />
      <div className="mt-3">{description}</div>
    </div>
  );
};

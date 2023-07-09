export const FooterLinkBoard = ({
  footerLinkSections,
}: {
  footerLinkSections: any;
}) => {
  return (
    <>
      {footerLinkSections.map((item: any) => (
        <FooterLinkSection key={item.title} linkSection={item} />
      ))}
    </>
  );
};
export const FooterLinkSection = ({ linkSection }: { linkSection: any }) => {
  return (
    <div className="w-full  px-4 md:w-1/2 lg:w-1/4">
      <h2 className="mb-3 text-sm font-medium uppercase text-gray-900">
        {linkSection.title}
      </h2>
      <hr
        className="mx-auto inline-block"
        style={{
          width: '60px',
          backgroundColor: '#8bc53f',
          height: '2px',
        }}
      />
      <nav className="mb-10 list-none">
        {linkSection.links.map((item: any) => (
          <FooterLink key={item} link={item} />
        ))}
      </nav>
    </div>
  );
};

export const FooterLink = ({ link }: { link: any }) => {
  return (
    <li className="mt-3">
      <div className="cursor-pointer text-gray-500 hover:text-gray-900">
        {link}
      </div>
    </li>
  );
};

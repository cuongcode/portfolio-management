import { useState } from 'react';

import { ExportDataForm } from './export-data-form';
import { ModalCenter } from './modal-center';

export const ExportDataButton = ({ data }: { data: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-green-500 px-4 py-2 text-white"
      >
        Export Data
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        <ExportDataForm data={data} />
      </ModalCenter>
    </div>
  );
};

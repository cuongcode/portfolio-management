import { useState } from 'react';

import { ImportDataForm } from './form-import-data';
import { ModalCenter } from './modal-center';

export const ImportDataButton = ({ onImportData }: { onImportData: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-green-500 px-4 py-2 text-white"
      >
        Import Data
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        <ImportDataForm
          onImportData={onImportData}
          onClose={() => setIsOpen(false)}
        />
      </ModalCenter>
    </div>
  );
};

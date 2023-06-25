import { ModalCenter } from '@/components/pages-component/home-page';
import { LoginForm } from '@/components/pages-component/home-page/form-login';

export const ModalLogin = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <ModalCenter open={open} onClose={onClose}>
      <LoginForm onClose={onClose} />
    </ModalCenter>
  );
};

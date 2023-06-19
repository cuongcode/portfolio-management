import { useContext, useState } from 'react';

import { TextInput } from '@/components/base';
import { DataContext } from '@/utils/data-context';

export const LoginForm = () => {
  const { onRegister } = useContext(DataContext);

  const [formData, setFormData] = useState<any>({});

  const _onChange = (e: any) => {
    console.log('🚀 ~ file: form-login.tsx:16 ~ LoginForm ~ e:', e);
    const { value, name } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const _onLogin = () => {
    //
  };
  const _onRegister = () => {
    onRegister(formData);
  };

  return (
    <div className="flex flex-col">
      <TextInput
        title="User Name"
        type="text"
        name="username"
        placeholder="Paste your data here"
        value={formData.username}
        onChange={_onChange}
      />
      <TextInput
        title="Password"
        type="text"
        name="password"
        placeholder="Paste your data here"
        value={formData.password}
        onChange={_onChange}
      />
      <button
        type="button"
        className="rounded-md
            bg-green-500
            px-4 py-2
            text-white
          "
        onClick={_onLogin}
      >
        Login
      </button>
      <button
        type="button"
        className="rounded-md
            bg-green-500
            px-4 py-2
            text-white
          "
        onClick={_onRegister}
      >
        Register
      </button>
    </div>
  );
};

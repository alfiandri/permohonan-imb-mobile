import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../../helper/redux/actions/loginAction';
import { isEmpty, POST, Toast } from '../../../helper/utils';
import { CustomError } from '../../../helper/utils/handleResponse';

export default () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const register = async ({
    nama = '',
    email = '',
    nik = '',
    nohp = '',
    password = '',
  }) => {
    setLoading(true);
    try {
      const res = await POST({
        url: 'auth/register',
        body: {nama, email, nik, no_hp: nohp, password},
      });
      const result = res.data;

      if (result.result === 'success') {
        const {token = null, tipe = null} = result?.data?.meta;
        dispatch(setLogin({token, tipe}));
      } else {
        throw new CustomError({
          message: result.title,
          user_message: result.title,
        });
      }
    } catch (error) {
      console.log('[Register] is error ', error);
      if (isEmpty(error.user_message)) {
        error.user_message = 'Maaf, terjadi kesalahan saat melakukan Register';
      }
      Toast('Gagal melalukan login', error.user_message);
    }
    setLoading(false);
  };

  const check = ({a = '', name = 'input', isPassword = false}) => {
    if (isEmpty(a)) {
      return `Masukkan ${name} kamu`;
    } else if (a.length < 3) {
      return `Masukkan ${name} min.3 karakter`;
    } else {
      return null;
    }
  };

  return {
    loading,
    register,
    check,
  };
};

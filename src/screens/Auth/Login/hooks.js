import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../../helper/redux/actions/loginAction';
import { isEmpty, POST, Toast } from '../../../helper/utils';
import { CustomError } from '../../../helper/utils/handleResponse';

export default () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async ({email = '', password = ''}) => {
    setLoading(true);
    try {
      const res = await POST({url: 'auth/login', body: {email, password}});
      console.log(res)
      const result = res.data;

      if (result.result === 'success') {
        const {token = null, role = null} = result?.data?.meta;
        dispatch(setLogin({role, token}));
      } else {
        throw new CustomError({
          message: result.title,
          user_message: result.title,
        });
      }
    } catch (error) {
      console.log('[Login] is error ', error);
      if (isEmpty(error.user_message)) {
        error.user_message = 'Maaf, terjadi kesalahan saat melakukan login';
      }
      Toast('Gagal melalukan login', error.user_message);
    }
    setLoading(false);
  };

  const check = ({a = '', isPassword = false}) => {
    if (isEmpty(a)) {
      return `Masukkan ${isPassword ? 'password' : 'email'} kamu`;
    } else if (a.length < 3) {
      return `Masukkan ${isPassword ? 'password' : 'email'} min.3 karakter`;
    } else {
      return null;
    }
  };

  return {
    loading,
    login,
    check,
  };
};

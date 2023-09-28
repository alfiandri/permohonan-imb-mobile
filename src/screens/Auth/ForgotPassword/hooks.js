import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setLogin} from '../../../helper/redux/actions/loginAction';
import {isEmpty, POST, Toast} from '../../../helper/utils';
import {CustomError} from '../../../helper/utils/handleResponse';

export default () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const forgot = async ({email = '', nik = '', password = ''}) => {
    setLoading(true);
    try {
      const res = await POST({
        url: 'auth/forgot',
        body: {email, nik, password},
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
      console.log('[ForgotPassword] is error ', error);
      if (isEmpty(error.user_message)) {
        error.user_message =
          'Maaf, terjadi kesalahan saat melakukan Forgot Password';
      }
      Toast('Gagal melalukan forgot password', error.user_message);
    }
    setLoading(false);
  };
  return {
    loading,
    forgot,
  };
};

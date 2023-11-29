import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { axiosWithAccessToken } from '../Axios';
import { userAtom } from '../atoms/user';
import { getCookie } from '../components/layout/auth/auth.utils';

const useGetUserData = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    const getUserData = async () => {
      const res = await axiosWithAccessToken.get('api/members');
      setUser(res.data.data);
    };

    (async () => {
      if (user === null && accessToken) {
        await getUserData();
      }
    })();
  }, [user]);
};

export default useGetUserData;

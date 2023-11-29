import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { axiosWithAccessToken } from '../Axios';
import { userAtom } from '../atoms/user';

const useGetUserData = () => {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const getUserData = async () => {
      const res = await axiosWithAccessToken.get('api/members');
      setUser(res.data.data);
    };

    (async () => {
      if (user === null) {
        await getUserData();
      }
    })();
  }, [user]);
};

export default useGetUserData;

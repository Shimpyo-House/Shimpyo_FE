import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userData } from '../atoms/user';

const Mypage = () => {
  const [user, setUser] = useRecoilState(userData);
  console.log(user);
  useEffect(() => {
    const getUserData = async () => {
      setTimeout(() => {
        setUser({
          name: '최우혁',
          photoUrl: '',
          id: 12,
          email: 'abc@gmail.com',
        });
      }, 500);
    };

    (async () => {
      if (user === null) {
        await getUserData();
      }
    })();
  }, [user]);

  return <div>Mypage</div>;
};

export default Mypage;

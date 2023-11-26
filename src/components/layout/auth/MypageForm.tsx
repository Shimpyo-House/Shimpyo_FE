/* eslint-disable react/jsx-props-no-spreading */

import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Button, InputLabel, TextField } from '@mui/material';
import { userData } from '../../../atoms/user';
import { ErrorContainer, ErrorStyle } from './SigninForm';

type PasswordConfirmForm = {
  password: string;
  passwordConfirm: string;
};

type UserPatchForm = {
  photoUrl?: string;
  name?: string;
};

/* USER_DATA는 내 정보 보기, CHK_PASSWORD는 회원정보 변경 전 비밀번호 일치 확인, "PATCH_DATA는 회원정보 변경 */
type MyPageStateType = 'USER_DATA' | 'CHK_PASSWORD' | 'PATCH_DATA';

const ButtonContent = {
  USER_DATA: {
    content: '정보 수정',
    handlerOnClick: () => {},
  },
  CHK_PASSWORD: {
    content: '비밀번호 확인',
    handlerOnClick: () => {},
  },
  PATCH_DATA: {
    content: '수정 완료',
    handlerOnClick: () => {},
  },
};

const MypageForm = () => {
  const [user, setUser] = useRecoilState(userData);
  const [myPage, setMyPageState] = useState<MyPageStateType>('USER_DATA');
  setMyPageState('USER_DATA');
  /* password 확인 form */
  const {
    register: registerPasswordConfirm,
    // handleSubmit: handleSubmitPasswordConfirm,
    formState: { errors: errorsPasswordConfirm },
  } = useForm<PasswordConfirmForm>();

  /* userData 변경 form */
  const {
    register: registerUserPatch,
    // handleSubmit: handleSubmitUserPatch,
    formState: { errors: errorsUserPatch },
  } = useForm<UserPatchForm>();

  /* userData 전역 상태가 비어있을 경우 새 정보 받아오기 */
  useEffect(() => {
    const getUserData = async () => {
      setTimeout(() => {
        setUser({
          name: '최우혁',
          photoUrl:
            'https://firebasestorage.googleapis.com/v0/b/employee-management-c0a21.appspot.com/o/bigimage%2F%EA%B0%80%EB%A0%8C.jpg?alt=media&token=f5dd05f5-1036-44d3-9787-6abe2a42cc90',
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

  console.log('MyPage : 현재 접속 유저', user);

  return (
    <div css={MyPageFormContainer}>
      <div css={ImageContainer}>
        <img
          src={user?.photoUrl || '/rabbit.jpg'}
          alt={user?.name}
          css={userPhotoUrlStyle}
        />
      </div>
      <div css={FormContainer}>
        <form>
          <InputLabel>이메일</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="이메일을 입력해주세요"
            type="email"
            value={user?.email}
            disabled
          />
          <div css={ErrorContainer}>{null}</div>

          <InputLabel>이름</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="이름을 입력해주세요"
            type="text"
            value={user?.name}
            {...registerUserPatch('name', {
              required: true,
            })}
            disabled={myPage !== 'PATCH_DATA'}
          />
          <div css={ErrorContainer}>
            {errorsUserPatch?.name ? (
              <p css={ErrorStyle}>{errorsUserPatch.name?.message}</p>
            ) : null}
          </div>

          {myPage === 'CHK_PASSWORD' && (
            <>
              <InputLabel>비밀번호</InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="이메일을 입력해주세요"
                type="email"
                {...registerPasswordConfirm('password', {
                  required: true,
                })}
                disabled={myPage !== 'CHK_PASSWORD'}
              />
              <div css={ErrorContainer}>
                {errorsPasswordConfirm?.password ? (
                  <p css={ErrorStyle}>
                    {errorsPasswordConfirm.password?.message}
                  </p>
                ) : null}
              </div>

              <InputLabel>비밀번호 확인</InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="이메일을 입력해주세요"
                type="email"
                {...registerPasswordConfirm('passwordConfirm', {
                  required: true,
                })}
                disabled={myPage !== 'CHK_PASSWORD'}
              />
              <div css={ErrorContainer}>
                {errorsPasswordConfirm?.passwordConfirm ? (
                  <p css={ErrorStyle}>
                    {errorsPasswordConfirm.passwordConfirm?.message}
                  </p>
                ) : null}
              </div>
            </>
          )}
          <Button onClick={ButtonContent[myPage].handlerOnClick} type="submit">
            {ButtonContent[myPage].content}
          </Button>
        </form>
      </div>
    </div>
  );
};
const MyPageFormContainer = css`
  display: flex;

  flex-direction: row;
`;

const ImageContainer = css`
  width: 31.25rem;
  height: 31.25rem;
`;

const FormContainer = css`
  width: 100%;
`;

const userPhotoUrlStyle = css`
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center center;
`;

export default MypageForm;

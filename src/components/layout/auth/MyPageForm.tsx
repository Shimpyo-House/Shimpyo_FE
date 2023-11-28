/* eslint-disable react/jsx-props-no-spreading */

import { useRecoilState } from 'recoil';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Button, InputLabel, TextField } from '@mui/material';
import { userData } from '../../../atoms/user';
import { ErrorContainer, ErrorStyle } from './SigninForm';
import { escapeRegExp } from './auth.utils';
import { axiosWithAccessToken } from '../../../Axios';
import { RequestMembers } from '../../../types';
import { WRONG_PASSWORD_MESSAGE } from './auth.constant';

type UserPatchForm = {
  password?: string;
  passwordConfirm?: string;
};

/* USER_DATA는 내 정보 보기, CHK_PASSWORD는 회원정보 변경 전 비밀번호 일치 확인, "PATCH_DATA는 회원정보 변경 */
type MyPageStateType = 'USER_DATA' | 'CHK_PASSWORD' | 'PATCH_DATA';

export const getImageUrl = async (file: File) => {
  /* 서버에 파일 업로드 */
  const formData = new FormData();

  formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
  formData.append('timestamp', String(Date.now() / 1000 || 0));
  formData.append('file', file);

  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  const { data } = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/image/upload`,
    formData,
    config,
  );

  return data.url;
};

const MyPageForm = () => {
  const [user, setUser] = useRecoilState(userData);
  const [myPage, setMyPage] = useState<MyPageStateType>('CHK_PASSWORD');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [userImageUrl, setUserImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserPatchForm>();

  const onSubmitUserPatch: SubmitHandler<UserPatchForm> = useCallback(
    async ({ password, passwordConfirm }) => {
      try {
        /* userData 수정 및 변경 + Cloudinary 파일 업로드 */
        let request: RequestMembers = {};
        if (userImageUrl) {
          if (fileInputRef.current?.files?.length) {
            const imageUrl = await getImageUrl(fileInputRef.current?.files[0]);
            request.photoUrl = imageUrl;
            console.log(imageUrl);
          }
        }

        if (password && passwordConfirm) {
          request = { ...request, password, passwordConfirm };
        }

        const res = await axiosWithAccessToken.patch('/api/members', request);
        console.log(res);
        setUser(res.data);
        setMyPage('USER_DATA');
      } catch (e) {
        console.log(e);
      }
    },
    [],
  );

  const handlerOnChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setPasswordValue(e.target.value);
  };

  const handlerImageButtonClick = () => {
    console.log(fileInputRef);
    if (fileInputRef?.current) fileInputRef.current.click();
  };

  const handlerImageFileChange = async () => {
    /* base64 이미지 업로드 */
    const reader = new FileReader();
    if (fileInputRef.current?.files) {
      const [file] = fileInputRef.current.files;
      reader.onload = (e) => {
        const base64DataUrl = e.target!.result as string;
        setUserImageUrl(base64DataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  /* 상태에 따른 Button 내용 및 핸들러 */
  const ContentAndHandlerByState = useMemo(() => {
    return {
      USER_DATA: {
        buttonContent: '정보 수정',
        handlerOnClick: () => {
          setMyPage('CHK_PASSWORD');
        },
      },
      CHK_PASSWORD: {
        buttonContent: '비밀번호 확인',
        handlerOnClick: async () => {
          /* 비밀번호 확인 후 맞을 경우 진행 */
          try {
            const res = await axiosWithAccessToken.post('api/members', {
              password: passwordValue,
            });
            console.log(res);
            setMyPage('PATCH_DATA');
          } catch (e: any) {
            console.log(e);
            if (e.response?.data.message === WRONG_PASSWORD_MESSAGE) {
              alert('비밀번호를 확인해주세요');
            }
          }
        },
      },
      PATCH_DATA: {
        buttonContent: '수정 완료',
        handlerOnClick: () => {},
      },
    };
  }, [user, passwordValue]);

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
          src={userImageUrl || user?.photoUrl || '/rabbit.jpg'}
          alt={user?.name}
          css={userPhotoUrlStyle}
        />
        {myPage === 'PATCH_DATA' && (
          <Button onClick={handlerImageButtonClick} variant="text">
            이미지 변경
          </Button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          css={css`
            display: none;
          `}
          accept="image/*"
          onChange={handlerImageFileChange}
        />
      </div>
      <div css={FormContainer}>
        <form onSubmit={handleSubmit(onSubmitUserPatch)}>
          <InputLabel>이메일</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            type="email"
            value={user?.email}
            disabled
          />
          <div css={ErrorContainer}>{null}</div>

          <InputLabel>이름</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            type="text"
            value={user?.name}
            disabled
          />
          <div css={ErrorContainer}>{null}</div>

          {myPage === 'CHK_PASSWORD' && (
            <>
              <InputLabel>비밀번호</InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                value={passwordValue}
                onInput={handlerOnChangeInput}
                placeholder="비밀번호를 입력해주세요"
                type="password"
              />
              <div css={ErrorContainer}>{null}</div>
            </>
          )}

          {myPage === 'PATCH_DATA' && (
            <>
              <InputLabel>변경할 비밀번호</InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="변경할 비밀번호를 입력해주세요"
                type="password"
                {...register('password', {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$#^()!%*?&])[A-Za-z\d@$!#^()%*?&]{8,30}$/,
                    message: '특수문자, 문자, 숫자를 1개씩 넣어주세요(8~30자)',
                  },
                })}
              />
              <div css={ErrorContainer}>
                {errors?.password ? (
                  <p css={ErrorStyle}>{errors.password?.message}</p>
                ) : null}
              </div>

              <InputLabel>비밀번호 확인</InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="비밀번호를 다시 입력해주세요"
                type="password"
                {...register('passwordConfirm', {
                  required: true,
                  pattern: {
                    value: new RegExp(
                      escapeRegExp(watch('password') || '') || '',
                    ),
                    message: 'password와 다릅니다',
                  },
                })}
              />
              <div css={ErrorContainer}>
                {errors?.passwordConfirm ? (
                  <p css={ErrorStyle}>{errors.passwordConfirm?.message}</p>
                ) : null}
              </div>
            </>
          )}
          <Button
            onClick={ContentAndHandlerByState[myPage].handlerOnClick}
            type={`${myPage === 'PATCH_DATA' ? 'submit' : 'button'}`}
            variant="contained"
            fullWidth
          >
            {ContentAndHandlerByState[myPage].buttonContent}
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

export default MyPageForm;

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/indent */

import { useRecoilState, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Button, InputLabel, TextField } from '@mui/material';
import { userAtom } from '../../../atoms/user';
import { ErrorStyle } from './SigninForm';
import { escapeRegExp } from './auth.utils';
import { axiosWithAccessToken } from '../../../Axios';
import { RequestMembers } from '../../../types';
import { WRONG_PASSWORD_MESSAGE } from './auth.constant';
import useGetUserData from '../../../hooks/useGetUserData';
import { loadingAtom } from '../../../atoms/loading';
import userImg from '/user_default.svg';

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
  const [user, setUser] = useRecoilState(userAtom);
  const setLoading = useSetRecoilState(loadingAtom);
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
        setLoading({ isLoading: true, message: '유저를 변경중입니다.' });
        /* userData 수정 및 변경 + Cloudinary 파일 업로드 */
        let request: RequestMembers = {};
        if (userImageUrl) {
          if (fileInputRef.current?.files?.length) {
            const imageUrl = await getImageUrl(fileInputRef.current?.files[0]);
            request.photoUrl = imageUrl;
          }
        }

        if (password && passwordConfirm) {
          request = { ...request, password, passwordConfirm };
        }

        const res = await axiosWithAccessToken.patch('/api/members', request);
        console.log(request, res);
        setUser(res.data.data);
        setMyPage('USER_DATA');
      } catch (e) {
        console.log(e);
      } finally {
        setLoading({ isLoading: false, message: '' });
      }
    },
    [fileInputRef.current?.files],
  );

  const handlerOnChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setPasswordValue(e.target.value);
  };

  const handlerImageButtonClick = () => {
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
        handlerOnSubmit: (event: React.FormEvent) => {
          event.preventDefault();
          setMyPage('CHK_PASSWORD');
        },
      },
      CHK_PASSWORD: {
        buttonContent: '비밀번호 확인',
        handlerOnSubmit: async (event: React.FormEvent) => {
          event.preventDefault();
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
        handlerOnSubmit: () => {},
      },
    };
  }, [user, passwordValue]);

  /* userData 전역 상태가 비어있을 경우 새 정보 받아오기 */
  useGetUserData();

  return (
    <div css={MyPageFormContainer}>
      <div css={ImageContainer}>
        <img
          src={userImageUrl || user?.photoUrl || userImg}
          alt={user?.name}
          css={userPhotoUrlStyle}
        />
        {myPage === 'PATCH_DATA' && (
          <Button fullWidth onClick={handlerImageButtonClick} variant="text">
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
        <form
          onSubmit={
            myPage === 'PATCH_DATA'
              ? handleSubmit(onSubmitUserPatch)
              : (event) => {
                  ContentAndHandlerByState[myPage].handlerOnSubmit(event);
                }
          }
        >
          <div css={InputContainer}>
            <InputLabel css={InputLabelStyle}>이메일</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              type="email"
              value={user?.email}
              disabled
              css={TextFieldStyle}
            />
          </div>
          <div css={ErrorContainer}>{null}</div>

          <div css={InputContainer}>
            <InputLabel css={InputLabelStyle}>이름</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              type="text"
              value={user?.name}
              disabled
              css={TextFieldStyle}
            />
          </div>
          <div css={ErrorContainer}>{null}</div>

          {myPage === 'CHK_PASSWORD' && (
            <>
              <div css={InputContainer}>
                <InputLabel css={InputLabelStyle}>비밀번호</InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={passwordValue}
                  onInput={handlerOnChangeInput}
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  css={TextFieldStyle}
                />
              </div>
              <div css={ErrorContainer}>{null}</div>
            </>
          )}

          {myPage === 'PATCH_DATA' && (
            <>
              <div css={InputContainer}>
                <InputLabel css={InputLabelStyle}>
                  변경할
                  <br /> 비밀번호
                </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="변경할 비밀번호를 입력해주세요"
                  type="password"
                  css={TextFieldStyle}
                  {...register('password', {
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$#^()!%*?&])[A-Za-z\d@$!#^()%*?&]{8,30}$/,
                      message:
                        '특수문자, 문자, 숫자를 1개씩 넣어주세요(8~30자)',
                    },
                  })}
                />
              </div>
              <div css={ErrorContainer}>
                {errors?.password ? (
                  <p css={ErrorStyle}>{errors.password?.message}</p>
                ) : null}
              </div>

              <div css={InputContainer}>
                <InputLabel css={InputLabelStyle}>비밀번호 확인</InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="비밀번호를 다시 입력해주세요"
                  type="password"
                  css={TextFieldStyle}
                  {...register('passwordConfirm', {
                    pattern: {
                      value: new RegExp(
                        escapeRegExp(watch('password') || '') || '',
                      ),
                      message: 'password와 다릅니다',
                    },
                  })}
                />
              </div>
              <div css={ErrorContainer}>
                {errors?.passwordConfirm ? (
                  <p css={ErrorStyle}>{errors.passwordConfirm?.message}</p>
                ) : null}
              </div>
            </>
          )}
          <Button type="submit" variant="contained" fullWidth css={ButtonStyle}>
            {ContentAndHandlerByState[myPage].buttonContent}
          </Button>
        </form>
      </div>
    </div>
  );
};
const MyPageFormContainer = css`
  position: relative;

  top: calc(50vh - 75px);
  transform: translateY(-50%);

  display: flex;

  flex-direction: row;
  justify-content: center;
`;

const ImageContainer = css`
  width: 80%;
  height: 100%;

  margin: 1rem 4rem 0.25rem 7rem;
`;

const userPhotoUrlStyle = css`
  width: 26rem;
  height: 30rem;

  object-fit: cover;
  object-position: center center;
`;

const FormContainer = css`
  width: 100%;
  padding: 1rem 0.5rem;
`;

const InputContainer = css`
  display: flex;
  align-items: center;
`;
const InputLabelStyle = css`
  flex: 1 0 7rem;

  margin-right: 0.5rem;

  text-align: center;
  font-weight: bold;
`;

const TextFieldStyle = css`
  flex: 3 1 20rem;
`;

const ErrorContainer = css`
  height: 2.5rem;

  margin: 0 0 0 7rem;
`;

const ButtonStyle = css`
  height: 3.5rem;

  margin: 0 auto;

  font-size: 1.125rem;
`;

export default MyPageForm;

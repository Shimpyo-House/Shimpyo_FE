/* eslint-disable react/jsx-props-no-spreading */

import { useCallback } from 'react';
import { Button, InputLabel, css, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { axiosWithNoToken } from '../../../Axios';
import theme from '../../../style/theme';
import { userAtom } from '../../../atoms/user';
import { setCookie } from './auth.utils';
import { loadingAtom } from '../../../atoms/loading';

export type IFormInput = {
  email: string;
  password: string;
};

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const setUserData = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingAtom);

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async ({ email, password }) => {
      try {
        setLoading({ isLoading: true, message: '로그인 진행중입니다.' });
        const res = await axiosWithNoToken.post('/api/auth/signin', {
          email,
          password,
        });
        console.log('signin ', res);
        const userObj = res.data.data.member;
        const { accessToken, refreshToken, accessTokenExpiresIn } =
          res.data.data.token;
        /* 전역상태 관리 => 유저정보 */
        setUserData(userObj);

        const option = {
          secure: true,
          maxAge: 60 * 24 * 7,
          // httpOnly: true,
        };

        /* 쿠키 => Access, Refresh */
        setCookie('accessToken', accessToken, option);
        setCookie('refreshToken', refreshToken, option);
        setCookie('accessTokenExpiresIn', accessTokenExpiresIn, option);

        navigate('/');
      } catch (e) {
        console.log(e);
      } finally {
        setLoading({ isLoading: false, message: '' });
      }
    },
    [],
  );

  return (
    <div css={FormContainer}>
      <div css={FormInnerContainer}>
        <form css={FormStyle} onSubmit={handleSubmit(onSubmit)}>
          <h1
            css={css`
              text-align: center;
            `}
          >
            로그인
          </h1>
          <div css={InputWithLabelContainer}>
            <InputLabel css={LabelStyle}>이메일</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="이메일을 입력해주세요"
              type="email"
              {...register('email', {
                required: true,
              })}
            />
            <div css={ErrorContainer}>
              {errors?.email ? (
                <p css={ErrorStyle}>{errors.email?.message}</p>
              ) : null}
            </div>
          </div>
          <div css={InputWithLabelContainer}>
            <InputLabel css={LabelStyle}>비밀번호</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="비밀번호를 입력해주세요"
              type="password"
              {...register('password', {
                required: true,
              })}
            />
          </div>

          <div css={ButtonContainer}>
            <Button css={ButtonStyle} variant="contained" type="submit">
              로그인
            </Button>
          </div>
          <Link to="/signup">
            <span css={LinkStyle}>회원이 아닌가요?</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export const FormContainer = css`
  height: 100%;

  margin: 4rem 1rem;
`;

export const FormInnerContainer = css`
  width: 100%;
  height: 100%;

  margin: 1rem 1rem;
`;

export const FormStyle = css`
  display: flex;

  flex-direction: column;
  gap: 2rem;

  width: 40%;
  min-width: 30rem;

  padding: 3rem 0;
`;

export const InputWithLabelContainer = css``;

export const ButtonContainer = css`
  margin-top: 2rem;
  padding: 0 2rem;
`;

const LinkStyle = css`
  padding: 0 2rem;
  color: ${theme.colors.blue600};
`;

export const ErrorStyle = css`
  padding: 10px 0;
  color: ${theme.colors.error};
`;

export const ErrorContainer = css`
  height: 30px;
`;

export const LabelStyle = css`
  font-weight: bold;
  font-size: 1.125rem;
`;

export const ButtonStyle = css`
  width: 100%;
  height: 4rem;

  font-size: 1.125rem;
`;

export default SigninForm;

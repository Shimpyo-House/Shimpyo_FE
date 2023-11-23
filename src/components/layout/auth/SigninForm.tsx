/* eslint-disable react/jsx-props-no-spreading */

import { useCallback } from 'react';
import { Button, InputLabel, css, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { RequestSignin } from '../../../types';
import { axiosWithNoToken } from '../../../Axios';
import theme from '../../../style/theme';

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

  const handlerSignin = useCallback(
    async ({ email, password }: RequestSignin) => {
      const data = await axiosWithNoToken.post('/api/auth/signin', {
        email,
        password,
      });
      console.log('Signin', data);
    },
    [],
  );

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async ({ email, password }) => {
      handlerSignin({ email, password });
      console.log('submit', email, password);
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
            <InputLabel>이메일</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="이메일을 입력해주세요"
              type="email"
              {...register('email', {
                required: true,
              })}
            />
            {errors?.email ? (
              <p className="error">{errors.email?.message}</p>
            ) : null}
          </div>
          <div css={InputWithLabelContainer}>
            <InputLabel>비밀번호</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="비밀번호를 입력해주세요"
              type="password"
              {...(register('password'),
              {
                required: true,
              })}
            />
          </div>
          <div css={ButtonContainer}>
            <Button
              style={{ width: '100%', height: '4rem' }}
              variant="contained"
              type="submit"
            >
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

  margin: 4rem 2rem;
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

export default SigninForm;

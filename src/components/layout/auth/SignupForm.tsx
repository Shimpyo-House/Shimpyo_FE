/* eslint-disable react/jsx-props-no-spreading */

import { Button, css, InputLabel, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { axiosWithNoToken } from '../../../Axios';
import { RequestSignup } from '../../../types';
import {
  ButtonContainer,
  FormContainer,
  FormInnerContainer,
  FormStyle,
  InputWithLabelContainer,
} from './SigninForm';

type IFormInput = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

const SignupFormContainer = css`
  ${FormContainer};
  margin: 0 2rem;
`;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const handlerSignup = async ({
    name,
    email,
    password,
    passwordConfirm,
  }: RequestSignup) => {
    const data = await axiosWithNoToken.post('/api/auth/signup', {
      name,
      email,
      password,
      passwordConfirm,
    });
    console.log('Signup', data);
  };

  const onSubmit: SubmitHandler<IFormInput> = async ({
    name,
    email,
    password,
    passwordConfirm,
  }) => {
    handlerSignup({
      name,
      email,
      password,
      passwordConfirm,
    });
    console.log('submit', email, password);
  };

  return (
    <div css={SignupFormContainer}>
      <div css={FormInnerContainer}>
        <form css={FormStyle} onSubmit={handleSubmit(onSubmit)}>
          <h1
            css={css`
              text-align: center;
            `}
          >
            회원가입
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
            <InputLabel>이름</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="이름을 입력해주세요"
              type="text"
              {...register('name', {
                required: true,
              })}
            />
            {errors?.name ? (
              <p className="error">{errors.name?.message}</p>
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
          <div css={InputWithLabelContainer}>
            <InputLabel>비밀번호 확인</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="비밀번호를 입력해주세요"
              type="password"
              {...(register('passwordConfirm'),
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
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignupForm;

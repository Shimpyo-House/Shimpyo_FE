/* eslint-disable react/jsx-props-no-spreading */

import { Button, css, InputLabel, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { axiosWithNoToken } from '../../../Axios';
import { RequestSignup } from '../../../types';
import {
  ButtonContainer,
  ErrorStyle,
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

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
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
        <form css={SignupFormStyle} onSubmit={handleSubmit(onSubmit)}>
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
            <div css={ErrorContainer}>
              {errors?.email ? (
                <p css={ErrorStyle}>{errors.email?.message}</p>
              ) : null}
            </div>
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
                pattern: {
                  value: /^[A-Za-z가-힣]{2,30}$/,
                  message: '한글, 영어(대,소문자)이 가능합니다(2~30자)',
                },
              })}
            />
            <div css={ErrorContainer}>
              {errors?.name ? (
                <p css={ErrorStyle}>{errors.name?.message}</p>
              ) : null}
            </div>
          </div>
          <div css={InputWithLabelContainer}>
            <InputLabel>비밀번호</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="비밀번호를 입력해주세요"
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
          </div>

          <div css={InputWithLabelContainer}>
            <InputLabel>비밀번호 확인</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="비밀번호를 입력해주세요"
              type="password"
              {...register('passwordConfirm', {
                required: true,
                pattern: {
                  value: new RegExp(escapeRegExp(watch('password')) || ''),
                  message: 'password와 다릅니다',
                },
              })}
            />
            {errors?.passwordConfirm ? (
              <p css={ErrorStyle}>{errors.passwordConfirm?.message}</p>
            ) : null}
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

const escapeRegExp = (string: string) => {
  if (!string) return undefined;
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const SignupFormStyle = css`
  ${FormStyle};
  gap: 1rem;
`;

const SignupFormContainer = css`
  ${FormContainer};
  margin: 0 2rem;
`;

const ErrorContainer = css`
  height: 30px;
`;

export default SignupForm;

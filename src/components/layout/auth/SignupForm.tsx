/* eslint-disable react/jsx-props-no-spreading */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, css, InputLabel, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { axiosWithNoToken } from '../../../Axios';
import {
  ButtonContainer,
  ButtonStyle,
  ErrorContainer,
  ErrorStyle,
  FormContainer,
  FormInnerContainer,
  FormStyle,
  InputWithLabelContainer,
  LabelStyle,
} from './SigninForm';
import { escapeRegExp } from './auth.utils';
import { loadingAtom } from '../../../atoms/loading';

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
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingAtom);

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async ({ name, email, password, passwordConfirm }) => {
      try {
        setLoading({ isLoading: true, message: '회원가입 중입니다' });
        const data = await axiosWithNoToken.post('/api/auth/signup', {
          name,
          email,
          password,
          passwordConfirm,
        });
        console.log(data);
        console.log('submit', name, email, password, passwordConfirm);
        navigate('/signin');
      } catch (e: any) {
        alert(e.response.data.message);
      } finally {
        setLoading({ isLoading: false, message: '' });
      }
    },
    [],
  );

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
            <InputLabel css={LabelStyle}>이름</InputLabel>
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
            <InputLabel css={LabelStyle}>비밀번호</InputLabel>
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
            <InputLabel css={LabelStyle}>비밀번호 확인</InputLabel>
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
            <Button css={ButtonStyle} variant="contained" type="submit">
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SignupFormStyle = css`
  ${FormStyle};
  gap: 1rem;
`;

const SignupFormContainer = css`
  ${FormContainer};
  margin: 0 2rem;
`;

export default SignupForm;

import { css } from '@emotion/react';
import SigninForm from '../components/layout/auth/SigninForm';
import AuthHeader from '../components/common/AuthHeader';
import theme from '../style/theme';

const Signin = () => {
  return (
    <>
      <AuthHeader />
      <div css={SigninContainer}>
        <div css={SigninInnerContainer}>
          <div css={LogoContainer}>
            <h1 css={LogoText}>Shimpyo,</h1>
          </div>
          <div css={FormContainer}>
            <SigninForm />
          </div>
        </div>
      </div>
      <div css={BackgroundStyle} />
    </>
  );
};

export const SigninContainer = css`
  display: block;

  width: 100%;
  height: 100%;
`;
export const SigninInnerContainer = css`
  position: relative;

  top: 50vh;
  transform: translateY(-50%);

  display: flex;

  height: 100%;
  width: 100%;
  max-width: 1080px;

  margin: 5rem auto;

  border-radius: 0.75rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

export const LogoContainer = css`
  position: relative;

  width: 50%;
  height: 100%;
  min-height: 750px;

  background-color: ${theme.colors.blue800};
`;

export const FormContainer = css`
  height: 750px;
  width: 50%;

  background-color: ${theme.colors.white};
`;
export const LogoText = css`
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 10;

  color: ${theme.colors.white};
  font-size: 3rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;

  cursor: pointer;
`;

export const BackgroundStyle = css`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 120%;

  background-color: ${theme.colors.blue100};
  z-index: -50;
`;

export default Signin;

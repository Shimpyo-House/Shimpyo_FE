import SignupForm from '../components/layout/auth/SignupForm';
import AuthHeader from '../components/common/AuthHeader';
import {
  BackgroundStyle,
  FormContainer,
  LogoContainer,
  LogoText,
  SigninContainer,
  SigninInnerContainer,
} from './Signin';

const Signup = () => {
  return (
    <>
      <AuthHeader />
      <div css={SigninContainer}>
        <div css={SigninInnerContainer}>
          <div css={LogoContainer}>
            <h1 css={LogoText}>Shimpyo ,</h1>
          </div>
          <div css={FormContainer}>
            <SignupForm />
          </div>
        </div>
      </div>
      <div css={BackgroundStyle} />
    </>
  );
};

export default Signup;

import { css, keyframes } from '@emotion/react';
import theme from '../../../style/theme';

const ListBackground = () => {
  return (
    <div css={Background}>
      <div css={SecondWave} />
      <div css={ThirdWave} />
      <div css={FirstWave} />
      <div css={Blur} />
    </div>
  );
};

export default ListBackground;

const Background = css`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: ${theme.colors.blue600};
`;

const WaveMove = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const FirstWave = css`
  width: 280vw;
  height: 280vw;

  position: absolute;
  bottom: 20%;
  left: -90%;

  border-radius: 48%;

  background-color: ${theme.colors.blue200};

  animation: ${WaveMove} 17s infinite linear;
`;

const SecondWave = css`
  width: 280vw;
  height: 280vw;

  position: absolute;
  bottom: 16%;
  left: -90%;

  border-radius: 47%;

  background-color: ${theme.colors.blue700};

  animation: ${WaveMove} 12s infinite linear;
`;

const ThirdWave = css`
  width: 280vw;
  height: 280vw;

  position: absolute;
  bottom: 18%;
  left: -90%;

  border-radius: 48%;

  background-color: ${theme.colors.blue800};

  animation: ${WaveMove} 15s infinite linear;
`;

const Blur = css`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(255, 2555, 255, 0.1);
`;

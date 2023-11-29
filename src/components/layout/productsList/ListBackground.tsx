import { css, keyframes } from '@emotion/react';
import theme from '../../../style/theme';

const ListBackground = () => {
  return (
    <div css={Background}>
      <div css={ThirdWave} />
      <div css={SecondWave} />
      <div css={FirstWave} />
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
  top: -430%;
  left: -90%;

  border-radius: 48%;

  background-color: ${theme.colors.blue200};

  animation: ${WaveMove} 17s infinite linear;
`;

const SecondWave = css`
  width: 280vw;
  height: 280vw;

  position: absolute;
  top: -427%;
  left: -90%;

  border-radius: 48%;

  background-color: ${theme.colors.blue700};

  animation: ${WaveMove} 18s infinite linear;
`;

const ThirdWave = css`
  width: 280vw;
  height: 280vw;

  position: absolute;
  top: -424%;
  left: -90%;

  border-radius: 48%;

  background-color: ${theme.colors.blue800};

  animation: ${WaveMove} 12s infinite linear;
`;

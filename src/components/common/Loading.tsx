import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import theme from '../../style/theme';
import { loadingAtom } from '../../atoms/loading';

const Loading = () => {
  const loading = useRecoilValue(loadingAtom);
  return (
    <div>
      {loading.isLoading && (
        <div css={LoadingContainer}>
          <div css={LoadingWrap}>
            <div css={Loader}>
              <li className="ball"> </li>
              <li className="ball"> </li>
              <li className="ball"> </li>
            </div>
            <div css={LoadingMessage}>{loading.message}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;

const LoadingContainer = css`
  position: fixed;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(255, 255, 255, 0.6);

  z-index: 10000;
`;

const LoadingWrap = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 75vh;
`;

const LoadingMessage = css`
  margin-top: 6rem;
  font-size: 1.5rem;
  font-weight: 900;
  color: ${theme.colors.blue700};
`;

const Loader = css`
  width: 12.5rem;
  display: flex;
  justify-content: space-evenly;

  .ball {
    list-style: none;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #fff;
  }

  .ball:nth-child(1) {
    animation: bounce-1 1.4s ease-in-out infinite;
  }

  @keyframes bounce-1 {
    50% {
      transform: translateY(-1rem);
      background-color: ${theme.colors.blue700};
    }
  }

  .ball:nth-child(2) {
    animation: bounce-3 1.4s ease-in-out 0.2s infinite;
  }

  @keyframes bounce-2 {
    50% {
      transform: translateY(-1rem);
      background-color: ${theme.colors.blue700};
    }
  }

  .ball:nth-child(3) {
    animation: bounce-3 1.4s ease-in-out 0.4s infinite;
  }

  @keyframes bounce-3 {
    50% {
      transform: translateY(-1rem);
      background-color: ${theme.colors.blue700};
    }
  }
`;

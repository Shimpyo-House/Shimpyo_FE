import { css } from '@emotion/react';

const FavoriteList = () => {
  return (
    <div css={PageBox}>
      <div />
    </div>
  );
};

export default FavoriteList;

const PageBox = css`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: calc(100vh - 70px);

  background-color: rgba(255, 2555, 255, 0.8);

  padding: 3.125rem 0;
  gap: 3.125rem;
`;

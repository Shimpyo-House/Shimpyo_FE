import { css } from '@emotion/react';
import theme from '../../../style/theme';

const ListBackground = () => {
  return <div css={Background} />;
};

export default ListBackground;

const Background = css`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: ${theme.colors.blue100};
`;

import { css } from '@emotion/react';
import { FaStar } from 'react-icons/fa';

const Star = () => {
  return (
    <div css={StarColor}>
      <FaStar />
    </div>
  );
};

export default Star;

const StarColor = css`
  color: #ffe100;
`;

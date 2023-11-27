import { useState } from 'react';
import { css } from '@emotion/react';

const PeopleSelector = () => {
  const [count, setCount] = useState(2);

  const increment = () => {
    if (count < 30) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 2) {
      setCount(count - 1);
    }
  };

  const countButtonStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const countWrapperStyle = css`
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: #3d91ff;
    padding: 5px;
  `;

  const countControlStyle = css`
    background-color: white;
    color: #3d91ff;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 16px;
    font-weight: bold;

    &:hover {
      background-color: #e3f0ff;
    }
  `;

  const countStyle = css`
    margin: 0 10px;
    font-size: 16px;
    color: white;
  `;

  return (
    <div css={countButtonStyle}>
      <span css={countWrapperStyle}>
        <button type="button" css={countControlStyle} onClick={decrement}>
          -
        </button>
        <span css={countStyle}>{count} 인</span>
        <button type="button" css={countControlStyle} onClick={increment}>
          +
        </button>
      </span>
    </div>
  );
};

export default PeopleSelector;

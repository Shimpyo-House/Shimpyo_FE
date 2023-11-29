import { css } from '@emotion/react';
import { Dispatch, SetStateAction } from 'react';

interface PeopleSelectorProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const PeopleSelector = ({ count, setCount }: PeopleSelectorProps) => {
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
    padding: 5px;
    color: black;
  `;

  const countControlStyle = css`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 20px;
    font-weight: 600;

    &:hover {
      background-color: #e3f0ff;
      font-weight: 900;
    }
  `;

  const countStyle = css`
    margin: 0 10px;
    font-size: 20px;
    color: black;
    font-weight: 600;
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

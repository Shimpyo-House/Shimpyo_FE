import { Dispatch } from 'react';
import { css, keyframes } from '@emotion/react';
import SelecBox from './SelectBox';
import theme from '../../../../style/theme';
import PeopleSelector from '../../../layout/productsDetail/PeopleSelector';

type Propstype = {
  setProductsLocation: Dispatch<React.SetStateAction<string>>;
  count: number;
  setCount: Dispatch<React.SetStateAction<number>>;
};

const SearchOptions = ({ setProductsLocation, count, setCount }: Propstype) => {
  return (
    <div css={OptionsBox}>
      <p css={OptionName}>숙박 옵션</p>
      <SelecBox setProductsLocation={setProductsLocation} />
      <div css={PeopleCount}>
        <p>숙박 인원</p>
        <PeopleSelector count={count} setCount={setCount} />
      </div>
    </div>
  );
};

export default SearchOptions;

const move = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50%{
  opacity: 0;
  }
  100%{
  transform: translateY(0);
  opacity: 1;
  }
`;

const OptionsBox = css`
  position: absolute;
  left: 2.4rem;
  bottom: -13rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 85%;
  height: 13rem;
  background-color: ${theme.colors.gray200};

  padding: 1rem 3.5rem;
  border-radius: 0 0 0.625rem 0.625rem;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  animation: ${move} 0.3s;
`;

const OptionName = css`
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;

  font-size: 0.8rem;

  padding: 0.6rem 0.4rem;

  border-radius: 0.3125rem;

  background-color: ${theme.colors.blue700};
  color: ${theme.colors.gray400};

  cursor: default;
`;

const PeopleCount = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;

  height: 5rem;
`;

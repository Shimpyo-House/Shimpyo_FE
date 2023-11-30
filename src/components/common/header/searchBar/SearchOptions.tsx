import { Dispatch } from 'react';
import { css } from '@emotion/react';
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
      <SelecBox setProductsLocation={setProductsLocation} />
      <PeopleSelector count={count} setCount={setCount} />
    </div>
  );
};

export default SearchOptions;

const OptionsBox = css`
  position: absolute;
  bottom: -6rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 90%;
  height: 5rem;
  background-color: ${theme.colors.blue200};

  padding: 1rem 2rem;
`;

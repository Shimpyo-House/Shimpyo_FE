/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */
import { TextField, css } from '@mui/material';
import { useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import SearchOptions from './SearchOptions';
import theme from '../../../../style/theme';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('x');
  const [productLocation, setProductLocation] = useState('x');
  const [count, setCount] = useState(2);
  const [isFocus, setIsFocus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsFocus(false);
    };
    if (isFocus) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isFocus]);

  const focusHandler = () => {
    setIsFocus(true);
  };

  const keywordHandler = (string: string) => {
    setKeyword(string);
  };

  const linkToSearch = () => {
    setIsFocus(false);
    navigate(
      `/search?location=${productLocation}&count=${count}&keyword=${keyword}`,
    );
    setProductLocation('x');
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      linkToSearch();
    }
  };

  return (
    <div
      css={SearchBox}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div css={InputContainer}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="찾으시는 숙소가 있으신가요?"
          type="text"
          onFocus={focusHandler}
          onChange={(e) => {
            keywordHandler(e.target.value);
          }}
          InputProps={{
            style: {
              borderRadius: '2.75rem',
              backgroundColor: `${theme.colors.gray200}`,
            },
            autoComplete: 'off',
          }}
          onKeyDown={handleEnterKey}
        />
        <div css={SearchBtn} onClick={linkToSearch}>
          <IoMdSearch />
        </div>
      </div>
      {isFocus && (
        <SearchOptions
          setProductsLocation={setProductLocation}
          count={count}
          setCount={setCount}
        />
      )}
    </div>
  );
};

export default SearchBar;

const SearchBox = css`
  position: relative;

  width: 40%;
`;

const InputContainer = css`
  width: 100%;
  position: relative;
  align-items: center;
  border-radius: 50px;
`;

const SearchBtn = css`
  position: absolute;
  top: 0.625rem;
  right: 0.75rem;

  font-size: 2.2rem;

  color: ${theme.colors.gray700};

  cursor: pointer;
`;

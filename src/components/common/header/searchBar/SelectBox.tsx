import React, { ChangeEvent, Dispatch, useState } from 'react';
import { css } from '@emotion/react';
import location from '../../../layout/productsList/loctionData';
import theme from '../../../../style/theme';

type LocationDataType = {
  [key: string]: string[];
};

type Propstype = {
  setProductsLocation: Dispatch<React.SetStateAction<string>>;
};

const SelecBox = ({ setProductsLocation }: Propstype) => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const locationData: LocationDataType = location; // 선택한 지역을 저장할 state

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };
  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setProductsLocation(`${selectedRegion} ${e.target.value}`);
  };

  return (
    <div css={SelectBox}>
      <select
        id="regionSelect"
        value={selectedRegion}
        onChange={handleRegionChange}
        css={Selector}
      >
        <option value="">지역을 선택하세요</option>
        {Object.keys(locationData).map((region) => (
          <option key={region} value={region} css={SelectorOption}>
            {region}
          </option>
        ))}
      </select>

      {selectedRegion && (
        <div>
          <select id="citySelect" onChange={handleCityChange} css={Selector}>
            <option value="">도시를 선택하세요</option>
            {locationData[selectedRegion].map((city) => (
              <option key={city} value={city} css={SelectorOption}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SelecBox;

const SelectBox = css`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const Selector = css`
  width: 9.375rem;
  height: 2.1875rem;

  padding: 0.3125rem 1.875rem 0.3125rem 0.625rem;

  border-radius: 0.25rem;
  outline: 0 none;

  background-color: ${theme.colors.gray100};
  color: ${theme.colors.gray700};

  cursor: pointer;

  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const SelectorOption = css`
  background-color: ${theme.colors.gray100};
`;

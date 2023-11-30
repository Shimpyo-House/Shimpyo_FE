import React, { ChangeEvent, Dispatch, useState } from 'react';
import { css } from '@emotion/react';
import location from '../../../layout/productsList/loctionData';

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
      >
        <option value="">지역을 선택하세요</option>
        {Object.keys(locationData).map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      {selectedRegion && (
        <div>
          <select id="citySelect" onChange={handleCityChange}>
            <option value="">도시를 선택하세요</option>
            {locationData[selectedRegion].map((city) => (
              <option key={city} value={city}>
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
`;

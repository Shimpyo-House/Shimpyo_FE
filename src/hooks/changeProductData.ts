/* eslint-disable @typescript-eslint/indent */

import { Dispatch, useEffect } from 'react';
import { ResponseProductsData } from '../types';

const changeProductData = (
  data: ResponseProductsData,
  set: Dispatch<
    React.SetStateAction<{
      address: string | null;
      productName: string | null;
    }>
  >,
) => {
  useEffect(() => {
    const addressData = data.address.match(/^(\S+\s+\S+\s+\S+)\s/);
    const productNameData = data.productName.match(/.*(?=[[(])/);

    if (addressData) {
      set({
        address: addressData[0],
        productName: productNameData ? productNameData[0] : data.productName,
      });
    }
  }, []);
};

export default changeProductData;

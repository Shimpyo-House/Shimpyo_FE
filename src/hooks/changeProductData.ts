import { Dispatch, useEffect } from 'react';
import { ResponseProductsData } from '../types';

// 주소를 간단히 표현해주고 숙소 이름을 괄호 이전까지로 바꾸어줍니다.
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

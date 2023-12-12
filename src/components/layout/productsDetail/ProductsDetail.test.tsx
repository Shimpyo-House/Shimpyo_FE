// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { MemoryRouter } from 'react-router-dom';
// import { axiosWithNoToken } from '../../../Axios';
// import ProductsDetail from './ProductsDetail';

// jest.mock('./axios'); // axiosWithNoToken을 jest 모의 함수로 만듭니다.

// describe('ProductsDetail Component', () => {
//   it('should fetch product details on component mount', async () => {
//     const mockProductId = '123';
//     const mockProductData = {
//       // 모의 제품 데이터 정의
//     };

//     // axiosWithNoToken.get()의 모의 함수 생성
//     (axiosWithNoToken.get as jest.Mock).mockResolvedValue({
//       data: { data: mockProductData },
//     });

//     // ProductsDetail 컴포넌트를 렌더링하고 테스트하기
//     render(<ProductsDetail />, { wrapper: MemoryRouter });

//     // axiosWithNoToken.get()이 호출되었는지 확인
//     await waitFor(() => expect(axiosWithNoToken.get).toHaveBeenCalled());

//     // productDetail 상태를 확인하여 데이터가 적절히 설정되었는지 확인
//     const productDetailElement = screen.getByTestId('product-detail');
//     expect(productDetailElement).toBeInTheDocument();
//     // 이와 같이 적절한 DOM 요소를 찾아내고 상태를 확인하는 등의 테스트 코드를 작성할 수 있어요.
//   });
// });

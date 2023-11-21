// eslint-disable-next-line
import { rest } from 'msw';
import { axiosWithAccessToken, axiosWithNoToken } from '../Axios';

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const handlers = [
  rest.get('/people', async (_, res, ctx) => {
    await sleep(200);

    return res(ctx.status(200), ctx.json('its okay'));
  }),

  // 회원가입
  rest.post('/api/signup', async (_, res, ctx) => {
    await sleep(500);
    return res(ctx.status(201), ctx.json({ data: {} }));
  }),

  // 상품 목록 조회
  rest.get('/api/products', async (_, res, ctx) => {
    try {
      const response = await axiosWithAccessToken.get('/products');

      return await res(
        ctx.status(200),
        ctx.json({
          code: 200,
          message: '상품 목록을 성공적으로 조회했습니다.',
          data: response.data,
        }),
      );
    } catch (error) {
      return res(
        ctx.status(500),
        ctx.json({
          code: 500,
          message: '상품 목록 조회 중 에러가 발생했습니다.',
        }),
      );
    }
  }),

  // 상품 상세 조회
  rest.get('/api/product/:productId', async (req, res, ctx) => {
    const { productId } = req.params;

    try {
      const response = await axiosWithNoToken.get(`/product/${productId}`);

      return await res(
        ctx.status(200),
        ctx.json({
          code: 200,
          message: '상품을 성공적으로 조회했습니다.',
          data: response.data,
        }),
      );
    } catch (error) {
      return res(
        ctx.status(500),
        ctx.json({
          code: 500,
          message: '상품 상세 조회 중 에러가 발생했습니다.',
        }),
      );
    }
  }),

  // 주문 내역 조회
  rest.get('/api/orders/:memberId', async (req, res, ctx) => {
    const { memberId } = req.params;

    try {
      const response = await axiosWithAccessToken.get(`/orders/${memberId}`);

      return await res(
        ctx.status(200),
        ctx.json({
          code: 200,
          message: '성공적으로 주문 내역 목록이 조회되었습니다.',
          data: response.data,
        }),
      );
    } catch (error) {
      return res(
        ctx.status(500),
        ctx.json({
          code: 500,
          message: '주문 내역 조회 중 에러가 발생했습니다.',
        }),
      );
    }
  }),

  rest.get('/api/favorites', async (_, res, ctx) => {
    try {
      const response = await axiosWithAccessToken.get('/favorites');

      return await res(
        ctx.status(200),
        ctx.json({
          code: 200,
          message: '성공적으로 즐겨찾기 목록을 조회했습니다.',
          data: response.data,
        }),
      );
    } catch (error) {
      return res(
        ctx.status(500),
        ctx.json({
          code: 500,
          message: '즐겨찾기 목록 조회 중 에러가 발생했습니다.',
        }),
      );
    }
  }),
];

export default handlers;

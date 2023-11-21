// eslint-disable-next-line
import { rest } from 'msw';

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
  rest.post('/api/signup', async (_, res, ctx) => {
    await sleep(500);
    return res(ctx.status(201), ctx.json({ data: {} }));
  }),
  rest.get('api/products', async (_, res, ctx) => {
    await sleep(500);

    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            productId: 1,
            category: '호텔',
            productName: '강원도 오션 호텔',
            favorites: true,
            star: 1,
            image: '대표 이미지 url',
            price: 10043,
          },
          {
            productId: 2,
            category: '호텔',
            productName: '충남 오션 호텔',
            favorites: true,
            star: 1,
            image: '대표 이미지 url',
            price: 10043,
          },
          {
            productId: 3,
            category: '호텔',
            productName: '서산 오션 호텔',
            favorites: true,
            star: 1,
            image: '대표 이미지 url',
            price: 10043,
          },
        ],
      }),
    );
  }),
];

export default handlers;

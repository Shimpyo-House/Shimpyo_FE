// eslint-disable-next-line
import { rest } from 'msw';

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const handlers = [
  rest.post('/api/signup', async (_, res, ctx) => {
    await sleep(500);
    return res(
      ctx.status(201),
      ctx.json({
        code: 201,
        message: '성공적으로 회원가입을 완료했습니다.',
        data: {
          email: 'abc@gmail.com',
          name: '최우혁',
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/employee-management-c0a21.appspot.com/o/bigimage%2F%EA%B0%80%EB%A0%8C.jpg?alt=media&token=f5dd05f5-1036-44d3-9787-6abe2a42cc90',
        },
      }),
    );
  }),
  rest.post('/api/signin', async (_, res, ctx) => {
    await sleep(500);
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '성공적으로 로그인 했습니다.',
        data: {
          accessToken: import.meta.env.VITE_ACCESS_TOKEN,
          refreshToken: import.meta.env.VITE_ACCESS_TOKEN,
          email: 'abc@gmail.com',
          name: '최우혁',
          photoUrl:
            'https://firebasestorage.googleapis.com/v0/b/employee-management-c0a21.appspot.com/o/bigimage%2F%EA%B0%80%EB%A0%8C.jpg?alt=media&token=f5dd05f5-1036-44d3-9787-6abe2a42cc90',
        },
      }),
    );
  }),
  rest.post('/api/refresh', async (_, res, ctx) => {
    await sleep(500);
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '성공적으로 토큰을 발급했습니다.',
        data: {
          accessToken: import.meta.env.VITE_ACCESS_TOKEN,
          refreshToken: import.meta.env.VITE_ACCESS_TOKEN,
          email: 'abc@gmail.com',
          name: '최우혁',
          photoUrl:
            'https://firebasestorage.googleapis.com/v0/b/employee-management-c0a21.appspot.com/o/bigimage%2F%EA%B0%80%EB%A0%8C.jpg?alt=media&token=f5dd05f5-1036-44d3-9787-6abe2a42cc90',
        },
      }),
    );
  }),
  rest.patch('/api/members', async (_, res, ctx) => {
    await sleep(500);
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '성공적으로 회원 정보를 수정했습니다.',
        data: {
          memberId: 1,
          email: 'abc@gmail.com',
          name: '최우혁',
          photoUrl:
            'https://firebasestorage.googleapis.com/v0/b/employee-management-c0a21.appspot.com/o/bigimage%2F%EA%B0%80%EB%A0%8C.jpg?alt=media&token=f5dd05f5-1036-44d3-9787-6abe2a42cc90',
        },
      }),
    );
  }),
  rest.post('/api/orders', async (_, res, ctx) => {
    await sleep(500);
    return res(
      ctx.status(200),
      ctx.json({
        code: 201,
        message: '성공적으로 예약이 완료되었습니다.',
        data: {
          orderToken: 'orderToken-1234',
        },
      }),
    );
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

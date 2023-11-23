// eslint-disable-next-line
import { rest } from 'msw';

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const handlers = [
  // 회원가입
  rest.post('/api/auth/signup', async (_, res, ctx) => {
    await sleep(500);
    return res(
      ctx.status(201),
      ctx.json({
        code: 200,
        message: '성공적으로 로그인 했습니다.',
        data: {
          member: {
            memberId: 1,
            email: 'test@mail.com',
            name: 'test',
            photoUrl:
              'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
          },
          token: {
            grantType: 'Bearer',
            accessToken:
              'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTcwMDU4NjkyOH0.lof7WjalCH1gGPy2q7YYi9VTcgn_aoFMwEMQvITtddsUIcJN-YzNODt_RQde5J5dH98NKMXDOvy7YwNlt6BCfg',
            accessTokenExpiresIn: 1700586928520,
            refreshToken:
              'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MDExODk5Mjh9.uZuIAxsnf4Ubz5K9YzysJTu9Gh25XNTsPVAPSElw1lS78gS8S08L97Z4RkfGodegGXZ9UFFNkVXdhRzF9Pr-uA',
          },
        },
      }),
    );
  }),
  // 로그인
  rest.post('/api/auth/signin', async (_, res, ctx) => {
    await sleep(500);
    return res(
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
  // 리프레시
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
  // 회원 정보 수정
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
  // 상품 목록 조회
  rest.get('/api/products', async (_, res, ctx) => {
    await sleep(500);
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '상품 목록을 성공적으로 조회했습니다..',
        data: [
          {
            productId: 1,
            category: '호텔',
            productName: '강원도 오션 호텔',
            address: '강원도 ~~~ 3207-41',
            favorites: true,
            starAvg: 1.3,
            image: '대표 이미지 url',
          },
          {
            productId: 2,
            category: '호텔',
            productName: '충남 오션 호텔',
            address: '강원도 ~~~ 3207-41',
            favorites: true,
            starAvg: 1.3,
            image: '대표 이미지 url',
            price: 10043,
          },
          {
            productId: 3,
            category: '호텔',
            productName: '서산 오션 호텔',
            address: '강원도 ~~~ 3207-41',
            favorites: true,
            starAvg: 1.3,
            image: '대표 이미지 url',
            price: 10043,
          },
        ],
      }),
    );
  }),
  // 상품 상세 조회
  rest.get('/api/products/:productId', async (req, res, ctx) => {
    const { productId } = req.params;
    // 쿼리스트링이 안되네요
    // const startDate = req.url.searchParams.getAll('startDate');
    // const endDate = req.url.searchParams.getAll('endDate');
    console.log(productId);

    await sleep(500);
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '상품을 성공적으로 조회했습니다.',
        data: {
          productId: 3,
          category: '호텔',
          address: '대한민국 충청남도 서북부 태안반도 327',
          productName: '서산 오션 호텔',
          desc: '호텔 내 수영장이 있어요.',
          favorites: true,
          starAvg: 1.3,
          images: ['이미지url', '이미지2url'],
          rooms: [
            {
              roomId: 1,
              roomName: '디럭스룸',
              price: '100000',
              desc: '실내 흡연 금지',
              standard: 8,
              'capacity ': 12,
              checkIn: '2023-11-20 15:00',
              checkOut: '2023-11-21 11:00',
            },
            {
              roomId: 2,
              roomName: '킹스룸',
              price: '120000',
              desc: '왕의 침대... 왕의 TV... 왕관....',
              standard: 8,
              'capacity ': 12,
              checkIn: '2023-11-20 15:00',
              checkOut: '2023-11-21 11:00',
            },
          ],
        },
      }),
    );
  }),
  // 주문
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

  // 주문 내역 목록 조회
  rest.get('/api/orders/:memberId', async (req, res, ctx) => {
    const { memberId } = req.params;
    console.log(memberId);

    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '성공적으로 주문 내역 목록이 조회되었습니다.',
        data: {
          content: [
            {
              orderId: 1,
              orderToken: 'orderToken-1234',
              productName: '강릉 고즈넉한주문펜션',
              productOption: '디럭스룸',
              productImageUrl: 'imageUrl',
              checkInTime: '2023-11-20 13:00:00',
              checkOutTime: '2023-11-22 12:00:00',
              totalAmount: 95000,
              orderedAt: '2023-11-19 15:30:00',
            },
            {
              orderId: 2,
              orderToken: 'orderToken-5678',
              productName: '영등포 부띠크 HOTEL SB',
              productOption: '스위트룸',
              productImageUrl: 'imageUrl',
              checkInTime: '2023-11-24 13:00:00',
              checkOutTime: '2023-11-27 12:00:00',
              totalAmount: 95000,
              orderedAt: '2023-11-20 11:30:00',
            },
          ],
          pageable: {
            sort: {
              empty: true,
              sorted: false,
              unsorted: true,
            },
            offset: 0,
            pageSize: 2,
            pageNumber: 0,
            paged: true,
            unpaged: false,
          },
          last: false,
          totalPages: 3,
          totalElements: 5,
          size: 2,
          number: 0,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          first: true,
          numberOfElements: 2,
          empty: false,
        },
      }),
    );
  }),

  // 즐겨찾기 목록 조회
  rest.get('/api/favorites', async (_, res, ctx) => {
    await sleep(500);
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '성공적으로 즐겨찾기 목록을 조회했습니다.',
        data: [
          {
            productId: 1,
            category: 'hotel',
            productName: '',
            star: 4,
            image: '프로필 사진 url',
            price: 95000,
          },
        ],
      }),
    );
  }),
];

export default handlers;

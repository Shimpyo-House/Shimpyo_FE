// eslint-disable-next-line
import { rest } from 'msw';

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const handlers = [
  // 상품 목록 조회
  rest.get('/api/products', async (_, res, ctx) => {
    await sleep(500);

    const url = new URL(_.url);
    const category = url.searchParams.get('category');

    if (category === 'pension') {
      return res(
        ctx.status(200),
        ctx.json({
          code: 200,
          message: '상품 목록을 성공적으로 조회했습니다..',
          data: [
            {
              productId: 1,
              category: '펜션',
              productName: '강원도 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 2,
              category: '펜션',
              productName: '충남 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 3,
              category: '펜션',
              productName: '서산 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 4,
              category: '펜션',
              productName: '강원도 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 5,
              category: '펜션',
              productName: '충남 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 6,
              category: '펜션',
              productName: '서산 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 7,
              category: '펜션',
              productName: '강원도 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 8,
              category: '펜션',
              productName: '충남 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 9,
              category: '펜션',
              productName: '서산 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 10,
              category: '펜션',
              productName: '강원도 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 11,
              category: '펜션',
              productName: '충남 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 12,
              category: '펜션',
              productName: '서산 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 13,
              category: '펜션',
              productName: '강원도 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 14,
              category: '펜션',
              productName: '충남 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 15,
              category: '펜션',
              productName: '서산 오션 펜션',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
          ],
        }),
      );
    }
    if (category === 'hotel') {
      return res(
        ctx.status(200),
        ctx.json({
          code: 200,
          message: '상품 목록을 성공적으로 조회했습니다..',
          data: [
            {
              productId: 16,
              category: '호텔',
              productName: '강원도 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 17,
              category: '호텔',
              productName: '충남 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 18,
              category: '호텔',
              productName: '서산 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 19,
              category: '호텔',
              productName: '강원도 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 20,
              category: '호텔',
              productName: '충남 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 21,
              category: '호텔',
              productName: '서산 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 22,
              category: '호텔',
              productName: '강원도 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 23,
              category: '호텔',
              productName: '충남 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 24,
              category: '호텔',
              productName: '서산 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 25,
              category: '호텔',
              productName: '강원도 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 26,
              category: '호텔',
              productName: '충남 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 27,
              category: '호텔',
              productName: '서산 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
          ],
        }),
      );
    }
    if (category === 'hot') {
      return res(
        ctx.status(200),
        ctx.json({
          code: 200,
          message: '상품 목록을 성공적으로 조회했습니다..',
          data: [
            {
              productId: 28,
              category: '호텔',
              productName: '강원도 마롱 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 4.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 29,
              category: '호텔',
              productName: '충남 마운틴 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 30,
              category: '호텔',
              productName: '서산 와우 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 31,
              category: '호텔',
              productName: '서산 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 32,
              category: '호텔',
              productName: '강원도 마롱 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 4.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 33,
              category: '호텔',
              productName: '충남 마운틴 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 34,
              category: '호텔',
              productName: '서산 와우 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 35,
              category: '호텔',
              productName: '서산 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 36,
              category: '호텔',
              productName: '강원도 마롱 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 4.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 37,
              category: '호텔',
              productName: '충남 마운틴 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 38,
              category: '호텔',
              productName: '서산 와우 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 39,
              category: '호텔',
              productName: '서산 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
          ],
        }),
      );
    }
    return res(
      ctx.status(404),
      ctx.json({
        code: 404,
        message: '해당 카테고리는 존재하지 않습니다.',
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
          productId: 1,
          category: '호텔',
          address: '12충청남도 서북부 태안반도 327',
          productName: '서산 오션 호텔',
          desc: '호텔 내 수영장이 있어요.',
          favorites: true,
          starAvg: 1.3,
          images: ['/public/img1.jpeg', '/public/img2.jpeg'],
          rooms: [
            {
              roomId: 1,
              roomName: '디럭스룸',
              price: '100000',
              desc: '실내 흡연 금지',
              standard: 2,
              capacity: 3,
              checkIn: '2023-11-20 15:00',
              checkOut: '2023-11-21 11:00',
            },
            {
              roomId: 2,
              roomName: '킹스룸',
              price: '120000',
              desc: '왕의 침대... 왕의 TV... 왕관....',
              standard: 8,
              capacity: 12,
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

  // 장바구니
  rest.get('/api/carts', async (_, res, ctx) => {
    await sleep(500);
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '장바구니 상품을 성공적으로 조회했습니다.',
        data: [
          {
            cartId: 1,
            productId: 1,
            productName: '서산 오션 호텔',
            images: '',
            roomId: 1,
            roomName: '디럭스룸',
            price: 10000,
            desc: '실내 흡연 금지',
            standard: 2,
            capacity: 2,
            startDate: '2023-11-20',
            endDate: '2023-11-21',
            checkIn: '15:00',
            checkOut: '11:00',
          },
          {
            cartId: 2,
            productId: 2,
            productName: '남해 글래드810 풀빌라',
            images: '',
            roomId: 2,
            roomName: '디럭스룸',
            price: 20000,
            desc: '실내 흡연 금지',
            standard: 8,
            capacity: 12,
            startDate: '2023-12-24',
            endDate: '2023-12-26',
            checkIn: '15:00',
            checkOut: '11:00',
          },
          {
            cartId: 3,
            productId: 3,
            productName: '파크하얏트 부산',
            images: '',
            roomId: 3,
            roomName: '디럭스 킹 요트 경기장 뷰',
            price: 30000,
            desc: '실내 취식 금지',
            standard: 2,
            capacity: 3,
            startDate: '2024-01-01',
            endDate: '2023-01-21',
            checkIn: '15:00',
            checkOut: '11:00',
          },
          {
            cartId: 4,
            productId: 4,
            productName: '파크하얏트 부산',
            images: '',
            roomId: 3,
            roomName: '디럭스 킹 요트 경기장 뷰',
            price: 30000,
            desc: '실내 취식 금지',
            standard: 2,
            capacity: 3,
            startDate: '2024-01-01',
            endDate: '2023-01-21',
            checkIn: '15:00',
            checkOut: '11:00',
          },
        ],
      }),
    );
  }),

  // 장바구니에서 주문하기 전 품절 여부 판단을 위한 post
  rest.post('/api/reservations/preoccupy', async (req, res, ctx) => {
    console.log('POST request to /api/reservations/preoccupy:', req.body);
    await sleep(500);
    return res(
      ctx.status(200),
      ctx.json({
        code: 201,
        message: '주문 가능한 상품인지 확인 완료',
        data: [
          {
            rooms: [
              {
                roomId: 1,
                startDate: 'string1',
                endDate: 'string1',
                isAvailable: true,
              },
              {
                roomId: 2,
                startDate: 'string2',
                endDate: 'string2',
                isAvailable: true,
              },
            ],
          },
        ],
      }),
    );
  }),

  // 장바구니 삭제
  rest.delete('/api/carts/:cartId', async (req, res, ctx) => {
    const { cartId } = req.params;
    await sleep(500);
    return res(
      ctx.status(200),
      ctx.json({
        code: 201,
        message: `${cartId}: 삭제 완료`,
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

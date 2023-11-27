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
              productId: 1,
              category: '호텔',
              productName: '강원도 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 2,
              category: '호텔',
              productName: '충남 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 3,
              category: '호텔',
              productName: '서산 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 1,
              category: '호텔',
              productName: '강원도 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 2,
              category: '호텔',
              productName: '충남 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 3,
              category: '호텔',
              productName: '서산 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 1,
              category: '호텔',
              productName: '강원도 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 2,
              category: '호텔',
              productName: '충남 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 3,
              category: '호텔',
              productName: '서산 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 1,
              category: '호텔',
              productName: '강원도 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 2,
              category: '호텔',
              productName: '충남 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 3,
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
              productId: 1,
              category: '호텔',
              productName: '강원도 마롱 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 4.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 2,
              category: '호텔',
              productName: '충남 마운틴 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 3,
              category: '호텔',
              productName: '서산 와우 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 3,
              category: '호텔',
              productName: '서산 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 1,
              category: '호텔',
              productName: '강원도 마롱 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 4.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 2,
              category: '호텔',
              productName: '충남 마운틴 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 3,
              category: '호텔',
              productName: '서산 와우 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 3,
              category: '호텔',
              productName: '서산 오션 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 1,
              category: '호텔',
              productName: '강원도 마롱 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 4.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 2,
              category: '호텔',
              productName: '충남 마운틴 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 3,
              category: '호텔',
              productName: '서산 와우 호텔',
              address: '강원도 ~~~ 3207-41',
              favorites: true,
              starAvg: 1.3,
              image: '대표 이미지 url',
              price: 10000,
            },
            {
              productId: 3,
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
          images: ['/public/img1.jpeg', '/public/img1.jpeg'],
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

  // 임시 장바구니
  rest.get('/api/carts', async (_, res, ctx) => {
    await sleep(500);
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '장바구니 상품을 성공적으로 조회했습니다.',
        data: [
          {
            productId: 1,
            productName: '서산 오션 호텔',
            images:
              'data:image/jpeg;base64,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',
            rooms: [
              {
                roomId: 1,
                roomName: '디럭스룸',
                price: 10000,
                desc: '실내 흡연 금지',
                standard: 2,
                capacity: 2,
                checkIn: '2023-11-20 15:00',
                checkOut: '2023-11-21 11:00',
              },
            ],
          },
          {
            productId: 2,
            productName: '남해 글래드810 풀빌라',
            images:
              'data:image/jpeg;base64,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',
            rooms: [
              {
                roomId: 2,
                roomName: '디럭스룸',
                price: 20000,
                desc: '실내 흡연 금지',
                standard: 8,
                capacity: 12,
                checkIn: '2023-12-24 15:00',
                checkOut: '2023-12-26 11:00',
              },
            ],
          },
          {
            productId: 3,
            productName: '파크하얏트 부산',
            images:
              'data:image/jpeg;base64,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',
            rooms: [
              {
                roomId: 3,
                roomName: '디럭스 킹 요트 경기장 뷰',
                price: 30000,
                desc: '실내 취식 금지',
                standard: 2,
                capacity: 3,
                checkIn: '2024-01-01 15:00',
                checkOut: '2023-01-21 11:00',
              },
            ],
          },
        ],
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

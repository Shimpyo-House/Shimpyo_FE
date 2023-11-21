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

    return res(ctx.status(201), ctx.json('its okay'));
  }),
];

export default handlers;

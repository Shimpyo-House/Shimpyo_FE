// eslint-disable-next-line
import { setupWorker } from 'msw';
import handler from './handler';

// This configures a Service Worker with the given request handlers.
const worker = setupWorker(...handler);
export default worker;

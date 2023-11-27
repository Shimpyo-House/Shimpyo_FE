## Axios Instance

- axios를 이용하여 API 요청하듯이 src/Axios.ts 파일의 axios 인스턴스를 불러와서 요청하시면 됩니다.

```
/* src/Axios.ts */
const BASE_URL = 'http://localhost:5173';

/* access token을 사용해야하는 axios 통신일 경우 */
export const axiosWithAccessToken = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

/* access token을 사용하지않는 axios 통신일 경우 */
export const axiosWithNoToken = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});
```

### 왜 Axios Instance를 사용해야 할까?

- Header, baseURL, timeout 등 매 요청마다 공통적으로 넣어줘야하는 속성들을 미리 넣어줄 수 있다.
- axiosWithAccessToken.interceptor을 이용해서 401(Unauthorized)일 경우 refresh 토큰 요청 및 login 페이지로 라우팅을 하도록 특정 Axios 인스턴스만 일괄적으로 설정해놓을 수 있다. (참고 : src/hooks/useTokenRefresher)
  => 모든 AccessToken을 사용하는 API에서 accessToken Refresh가 가능하다

### Axios Instance 사용법

- axios 요청과 똑같다.
- 예시

1. access token을 사용하지 않는 get 요청 : 상품 목록 api/products

```
const res = await axiosWithNoToken.get('/api/products');
console.log('products', res);
```

2. access token을 사용하는 post 요청 : 로그인

```
const res = await axiosWithNoToken.post('/api/auth/signin', {
  email,
  password,
});
console.log('signin ', res);
```

- 상세 config 설정이 필요한 경우 최우혁 <<< 호출해주세요

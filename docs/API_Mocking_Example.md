#### 📚 패치

23/11/27 : 백엔드 API 연결에 따라 각자 사용하는 Mocking Handler를 제거해주세요!

## useEffect 방식의 Mockup data fetching 방식 예시입니다.

1. 실시간으로 변동되는 API 명세서는 각자 분담한 역할에 따라 동기화시키면 됩니다
2. 1차 스프린트에서 사용되는 API는 대부분 예시에 있으나, 없는 경우 적절하게 만들어 사용하시면 됩니다.
3. query방식은 확실하지 않아서 추후에 수정하겠습니다. 아마 사용에는 큰 문제 없을 것으로 예상됩니다.
4. Request의 Type의 경우 type/index.ts 파일에 저장을 해놨습니다. 역할대로 API 명세서에 변경에 따른 타입 동기화를 부탁드립니다.
5. axiosWithNoToken과 axiosWithAccessToken은 header에 인증정보가 필요한가 아닌가에 따라서 다르게 호출하시면 됩니다.

- 실제 배포 환경과 데이터 형식의 차이가 존재할 것 같습니다.
  API Mocking에서 `data.data.name`으로 참조가능한 속성은 실제 백엔드팀 API에서 `data.name`으로 참조가능한 것으로 보입니다! ..

### 회원가입

```
useEffect(() => {
  const fetchDataSignup = async ({
    name,
    email,
    password,
    passwordConfirm,
  }: RequestSignup) => {
    const data = await axiosWithNoToken.post('/api/signup', {
      name,
      email,
      password,
      passwordConfirm,
    });
    console.log('Signup', data);
  };

  fetchDataSignup({
    name: '최우혁',
    email: 'abc@gmail.com',
    password: 'abcabcabc',
    passwordConfirm: 'abcabcabc',
  });
},[])
```

### 로그인

```
useEffect(() => {
  const fetchDataSignin = async ({ email, password }: RequestSignin) => {
    const data = await axiosWithNoToken.post('/api/signin', {
      email,
      password,
    });
    console.log('Signin', data);
  };

  fetchDataSignin({
    email: 'abc@gmail.com',
    password: 'abcabcabc',
  });
}, []);
```

### 리프레시

```
useEffect(() => {
  const fetchDataRefresh = async () => {
    const data = await axiosWithNoToken.post('/api/refresh');
    console.log('refresh', data);
  };

  fetchDataRefresh();
}, []);
```

### 회원정보 수정

```
useEffect(() => {
  const fetchDataMembers = async ({
    password,
    passwordConfirm,
    photoURL,
  }: RequestMembers) => {
    const data = await axiosWithAccessToken.patch('/api/members', {
      password,
      passwordConfirm,
      photoURL,
    });
    console.log('members', data);
  };

  fetchDataMembers({
    photoURL: '',
    password: 'abcabcabc',
    passwordConfirm: 'abcabcabc',
  });
}, []);
```

### 상품목록 조회

```
useEffect(() => {
  const fetchDataOrders = async ({
    memberId,
    productId,
    checkInTime,
    checkOutTime,
    payMethod,
    totalAmount,
  }: RequestOrders) => {
    const data = await axiosWithAccessToken.post('/api/orders', {
      memberId,
      productId,
      checkInTime,
      checkOutTime,
      payMethod,
      totalAmount,
    });
    console.log('orders', data);
  };

  // API 명세에 checkInTime이 LocalDateTime이라 돼있는데 확실하지 않아 일단 string 타입으로 넣어놨습니다 추후 백엔드분과 얘기가 필요해 보입니다
  fetchDataOrders({
    memberId: '123',
    productId: '456',
    checkInTime: '2023-11-20 13:00:00',
    checkOutTime: '2023-11-22 12:00:00',
    payMethod: 'KAKAO_PAY',
    totalAmount: 95000,
  });
}, []);
```

### 주문 내역 정보 조회

```
useEffect(() => {
  const fetchDataOrdersMemberId = async ({
    memberId,
  }: {
    memberId: number;
  }) => {
    const data = await axiosWithAccessToken.get(`/api/orders/${memberId}`);
    console.log('OrdersMemberId', data);
  };

  fetchDataOrdersMemberId({ memberId: 12 });
}, []);
```

### 상품 상세 정보 조회

```
useEffect(() => {
  const fetchDataProductDetail = async ({
    productId,
    startDate,
    endDate,
  }: RequestProductDetail) => {
    const data = await axiosWithNoToken.get(
      `/api/products/${productId}?startDate='${startDate}'?endDate='${endDate}'`,
    );
    console.log('ProductDetail', data);
  };

  // 날짜 타입이 명확하지 않아 일단 string 타입으로 넣어놨습니다 추후 백엔드분과 얘기가 필요해 보입니다
  fetchDataProductDetail({
    productId: 123,
    startDate: '2023-11-20',
    endDate: '2023-11-23',
  });
}, []);
```

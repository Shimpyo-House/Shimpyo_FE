# Shimpyo : 숙박 프로젝트

## 📚프로젝트 소개

**개발 기간** : 2023.11.20 ~ 2023.12.01 (2주)<br/>
**개발 인원** : 8명 (FE 5, BE 3)

쉼표가 문장에서 잠시 멈춤과 휴식의 시간을 나타내듯이, 사용자들에게 바쁜 일상에서 벗어나 휴식을 취하고 재충전할 수 있는 숙소를 제공하는 것을 목표로 합니다.

<br>
<div align=center>
  <a href="https://shimpyo.netlify.app" target="_blank">
    <img src="https://img.shields.io/badge/배포 링크-4299E1?style=for-the-badge&logoColor=white" alt="example"/>
  </a>
</div>

<br>

```
Test ID : test@mail.com
Test PW : qwe123!@#
```

## 👩‍💻팀원소개

|                           <img src="https://avatars.githubusercontent.com/u/98576512?v=4" width="150px" />                           |            <img src="https://github.com/KDT1-FE/Y_FE_Toy1/assets/39702832/58fb577d-9f8c-4679-bca1-8ff15ca84f6b" width="150px" />             |                           <img src="https://avatars.githubusercontent.com/u/104253583?v=4" width="150px" />                            |                                <img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/93272421/9b7ea286-4768-4d55-a26e-fc0541824b71" width="150px" />                                |                <img src="https://avatars.githubusercontent.com/u/93272421?v=4" width="150px" />                |
| :-----------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: |
|                                                           FE: 최우혁<br/>(팀장)                                                           |                                               FE: 백상원<br/>(리팩토링 팀장)                                                |                                                              FE: 정지오                                                               |                                                                   FE: 장수빈                                                                    |                                                   FE: 소유나                                                   |
| 개발 초기 설정 <br> CI/CD 연동<br> 로그인/회원가입<br> 회원 정보 수정<br> Axios Instance<br/> &Axios Interceptor | 숙소 리스팅<br> 무한스크롤 <br> 검색 기능 <br> 찜하기<br> 메인, 카테고리, 검색<br/>& 백그라운드 디자인 | 로그인/회원가입 페이지 및 기능<br> 유저인증 처리<br> 유저 권한에 따른 라우팅<br> 활동중 유저 목록 최신화<br> 메인페이지 - CardSection | 채팅방 소켓 연결<br> 실시간 메시지 수신/송신<br> 채팅방 내 유저 접속상태 확인<br> 채팅방 나가기 기능<br> 새로운 채팅방 & 유저 초대 시 알림 기능 | 네비게이션바<br> 사이드바<br> 채팅방 리스트 실시간 업데이트 처리<br> 메인페이지 - HeaderSection<br> 404 페이지 |



<br/>
<br/>
<br/><br/>
<br/>


## 🎁기술 스택

![기술스택](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/37ca06f0-7d59-4f49-95ec-bf21d65b1d98)

## 📐디자인 설계

![image](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/5e3e3667-fb3f-4862-92de-b81c5b89a9bb)

<br>


<details>
<summary>야놀자 테크 캠프 미니프로젝트 RFP </summary>
<h2> 프로젝트 정의서</h2>

본 프로젝트의 개발 범위는 다음과 같습니다.

- 회원 인증
  - 회원가입
  - 로그인
- 상품 조회
  - 전체 숙박 상품 목록 조회
    (옵션)카테고리를 임의 생성하여 분류하여 출력
  - 개별 숙박 상품 상세 소개
- 상품 선택 및 장바구니 담기
  - 숙박 상품 옵션 선택
  - 장바구니 담기
  - (또는) 바로 결제하기
- 장바구니
  - 장바구니 보기
  - 장바구니에서 주문하기 버튼 클릭 시, 예약(주문) 페이지로 이동
- 예약(주문) 하기
  - 만 14세 이상 이용 동의 (상세 설명서 X, 체크박스로만 간단히 처리)
  - 결제하기 버튼 클릭 시, 상품을 주문한 것으로 처리
    (별도 결제 로직 없음)
  - 결제 성공 시 주문 결과 출력
- (옵션) 주문 내역 조회 - 별도 주문 내역 페이지를 통해 주문 내역 확인

<h2>프로젝트 요구사항 </h2>

1. **회원 회원가입 기능**
   - 회원은 회원가입을 할 수 있습니다.
   - 기본 정보는 ID 역할로 이메일 주소와, 비밀번호, 이름 입니다.
2. **회원 로그인 기능**
   - 이메일과 비밀번호로 로그인할 수 있습니다.
   - 회원 정보를 저장해둔 데이터베이스를 검색하여 해당 사용자가 유효한 사용자 인지 판단
     합니다.
   - 상품 조회(전체, 개별), 회원 가입은 로그인 없이 사용 가능합니다.
   - 이 외 기능은 로그인이 필요합니다.
3. **전체 상품 목록 조회**
   - 데이터베이스에서 전체 상품 목록을 가져옵니다.
   - 이미지, 상품명, 상품가격을 기본으로 출력합니다.
   - 재고에 따라 품절일 경우, 출력 여부에 대해선 팀별로 결정합니다.
   - (옵션) 카테고리를 분류하여, 상품을 출력할 수도 있습니다.
   - 한 페이지에 출력되는 상품 개수는 팀별로 정하여, 페이징을 수행합니다.
4. **개별 상품 조회**
   - 전체 상품 목록에서 특정 상품 이미지를 클릭하면,
     해당 상품에 대한 상세 정보를 상품에 저장해 둔 데이터베이스에서 가져옵니다.
   - 이미지, 상품명, 상품가격, 상품 상세 소개 (1줄 이상)을 기본으로 출력합니다.
   - 재고에 따라 품절일 경우, 화면 구성은 팀별로 결정합니다.
5. **상품 옵션 선택**
   - 상품 상세 소개 페이지에서 상품 옵션을 선택할 수 있습니다.
   - 날짜, 숙박 인원은 기본으로 포함됩니다.
   - 이 외 룸 형태 등 필요한 요소는 팀별로 기획합니다.
6. **장바구니 담기**
   - 상품 옵션을 선택한 후, 장바구니 담기 버튼을 클릭하면 선택한 상품이 장바구니에 담깁
     니다.
7. **장바구니 보기**
   - 장바구니에 담긴 상품 데이터 (이미지, 상품명, 옵션 등)에 따른 상품별 구매 금액, 전체
     주문 합계 금액 등을 화면에 출력합니다.
   - 체크 박스를 통해 결제할 상품을 선택/제외할 수도 있습니다.
   - 주문하기 버튼을 통해 주문/결제 화면으로 이동합니다.
8. **주문하기**
   - 장바구니에서 주문하기 버튼 또는 개별 상품 조회 페이지에서 주문하기 버튼을 누르면
     전환되는 페이지입니다.
   - 만 14세 이상 이용 동의를 체크 박스로 입력 받으면, 화면 최하단에 결제하기 버튼이 활성화됩니다.
9. **결제하기**
   - 주문 페이지에서 결제하기 버튼을 클릭하면, 실제 결제 로직 및 절차 없이 상품을 바로
     주문한 것으로 처리합니다.
   - 주문을 저장하는 데이터베이스에 주문 정보를 저장합니다.
10. **주문 결과 확인**
    - 결제를 성공적으로 처리하면, 주문한 상품(들)에 대한 주문 결과를 출력해줍니다.
11. **(옵션) 주문 내역 확인** - 별도 주문 내역 페이지에 여태 주문한 모든 이력을 출력해줍니다.

<h2>기능적 요구사항 </h2>

1. **공통**
   1. 모든 단계에서 협업을 기반으로 프로젝트를 진행합니다.
   2. 각 기능을 구현하기 위해 HTTP Request Body / Response Body 에 전달할 데이터는
      프론트엔드와 백엔드의 협업을 통해 결정합니다.
   3. 모든 단계에서 테스트를 수행합니다.
2. **프론트엔드**
   1. 사용자 인터페이스 예시를 참고하여, 화면을 구성합니다.
   2. API 명세에 따라 백엔드에 전달된 JSON 데이터를 필요에 따라 정돈하여 화면에
      출력합니다.
   3. 프론트엔드단에서 유효성 검사를 수행해야하는 지점을 고려합니다.
   4. React.js 또는 Next.js를 기반으로 구현하며, 컴포넌트 단위로 구조를 설계합니다.
   5. (옵션) 페이징 처리 시, 무한 스크롤을 고려합니다.
3. **백엔드** 1. REST API를 구현하여 프론트엔드로 JSON 형식의 데이터를 전달합니다. 2. 회원 인증과 인가는 Spring Security를 이용하여 진행합니다. 3. 숙박 상품에 대한 데이터는 오픈 API를 검증하여 활용합니다.
선택1. https://www.data.go.kr/data/15077518/openapi.do
선택2. https://api.visitkorea.or.kr/ 4. 전체 상품 조회 시 한 페이지에 출력되는 상품 개수에 따라 DB Paging을 수행합니
다. 5. (옵션) DB 트랜잭션과 동시성 제어를 고려합니다.
</details>

<br/>

## 🧑🏻‍💻 주요 기능 구현
### 숙소 리스팅

![메인페이지](https://github.com/Shimpyo-House/Shimpyo_FE/assets/121215024/ddcd5b8a-60df-41d8-8c76-1c01638cecb0)
![카테고리 페이지](https://github.com/Shimpyo-House/Shimpyo_FE/assets/121215024/eb49f5d4-32cb-451d-8471-2049e8978aa1)
### 무한 스크롤

![무한스크롤](https://github.com/Shimpyo-House/Shimpyo_FE/assets/121215024/58f20c18-d4e7-4980-8ac9-62540e265770)
### 검색 기능

![검색](https://github.com/Shimpyo-House/Shimpyo_FE/assets/121215024/f0af2054-860f-4d46-b468-a6c80457b972)
### 찜하기

![찜하기1](https://github.com/Shimpyo-House/Shimpyo_FE/assets/121215024/3e7255e2-0816-422d-82f8-80a1fb566722)
![찜하기2](https://github.com/Shimpyo-House/Shimpyo_FE/assets/121215024/3a7fbc93-770b-4479-bfa6-f000dfb0cf22)
### 2️⃣제품 상세 페이지
![ez](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/2fa2f8c4-9b2c-49f9-a5e7-7aedabf4dd9d)
![ezgif com-video-to](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/88e372e9-954f-446a-91dc-7965bb436e9a)
![image](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/a2179e46-df12-43c2-a853-5675adae3d36)
![](docs/image/IMG_5186.GIF)

### 3️⃣장바구니
- 장바구니 삭제
![image](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/60480c72-6738-45b6-aaca-ed80daa96539)  
- 주문하기
![image](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/7f5bf375-fb07-45ea-87b2-41df9d1541eb)
- 예외처리
![image](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/b1457ea1-6c20-4fa2-8f45-2fccaabf6e7c)



### 4️⃣예약 및 결제
![image](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/21a85cd3-cf1a-468e-b121-d20d38612c85)
![image](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/10dab2f8-215f-4bc3-a9e5-1ea0a6e85766)

### 5️⃣인증
- 로그인, 회원가입

![로그인및회원가입](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/1a34daf2-6c7d-434d-a4a9-152230c4439f)

- 로그아웃

![로그아웃](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/8fda596c-784a-448c-89e1-2fd69cfda8e1)

- 자동 리프레시

![image](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/9231108e-cbb2-4af8-9781-2b9d83812e4e)

### 6️⃣회원 정보 변경
![회원정보변경](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/88c092d0-c0f1-4977-a336-0675a1e8373c)



## 리팩토링<br/>

#### 기간: 23/12/04 ~ 23/12/15

<details>
  <summary>백상원</summary>

    1. 새로운 기능 개발
      
      - 찜하기 기능 구현
        => 숙소 상세 페이지에서 등록 및 제거가 가능하며 찜한 숙소 페이지에서도 확인 및 등록, 제거가 가능
    
    2. 수정사항

        에러 해결

        - 검색 시 새로고침을 하며 이동하여 리액트 쿼리의 정보가 날아가기 때문에 서버 호출이 잦아지는 현상
          => 새로고침이 아닌 쿼리스트링의 변화를 감지하여 상태가 업데이트 되도록 수정
        
        - 빠르게 렌더링 되는 페이지에서 불필요하게 로딩창이 생성되어 깜박여보이는 현상
          => 해당 페이지에서 로딩창 제거
        
        - 로그인 시 간헐적으로 장바구니에 데이터가 들어오지 않던 현상 수정
          => 유저의 토큰 정보가 함수 밖에 선언되어 있어서 함수가 실행되는 시점에 최신 토큰을 사용하지 못하여 해당 부분 수정
        
        단순 개선
        
        - 카테고리 무한스크롤 옵저버 인식 범위 조정하여 부드럽게 스크롤 내려지도록 수정

        - 검색 조건을 부여하고 엔터키를 눌렀을 때 바로 이동할 수 있도록 수정
        
        - 카테고리 페이지와 검색 페이지 리스팅 디자인 변경


    3. 회고
      
        이전 프로젝트와 달리 백엔드 개발자분들과 직접 소통을 하며 로직을 고쳐가는 작업을 하면서 초기 기획 시 서로 주고받을 데이터에 대한
      구조 및 타입 확정이 얼마나 중요한지 깨닫게 되었습니다. 또한 다양한 기능을 완성하는 것도 중요하지만 하나를 하더라도 버그가 없는 것이
      더 중요하다고 느꼈고 때문에 코드 한 줄 한 줄의 의미를 더 생각하게 되었습니다. 개발 뿐만이 아닌 회의나 일정 조률 등에서도 다른 팀과의
      소통 방법에 대해 생각하게 되었고 상호 존중을 어떻게 하면 좋을 지 고민하게 되었던 시간이었습니다.
      

      
</details>
<br/>
<br/>

<details>
  <summary>정지오</summary>
    - 구현 기능<br/>
    - 에러 사항<br/>
    - 회고<br/>
</details>
<br/>
<br/>

<details>
  <summary>장수빈</summary>
    - 구현 기능<br/>
    - 에러 사항<br/>
    - 회고<br/>
</details>
<br/>
<br/>

<details>
  <summary>소유나</summary>
    - 구현 기능<br/>
    - 에러 사항<br/>
    - 회고<br/>
</details>
<br/>
<br/>
<br/>



## API 문서
<details>
  <summary>API 문서</summary>
  <br/>
  ※ Spring REST Docs로 문서화했습니다.
  
  > `index`
  > ![](docs/image/index-docs.png)
  >
  > `Member API Docs`
  > ![](docs/image/member-docs.png)
  >
  > `Product API Docs`
  > ![](docs/image/product-docs.png)
  >
  > `Cart API Docs`
  > ![](docs/image/cart-docs.png)
  >
  > `Reservation API Docs`
  > ![](docs/image/reservation-docs.png)
  >
  > `Reservation Product API Docs`
  > ![](docs/image/reservation-product-docs.png)
  >
  > `Star API Docs`
  > ![](docs/image/star-docs.png)
  >  
  </details>

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
| 개발 초기 설정 <br> CI/CD 연동<br> 로그인/회원가입<br> 회원 정보 수정<br> Axios Instance<br/> &Axios Interceptor | 숙소 리스팅<br> 무한스크롤 <br> 검색 기능 <br> 찜하기<br> 메인, 카테고리, 검색<br/>& 백그라운드 디자인 | 숙소 상세 페이지 <br> 숙소 상세&추가 정보 api <br> 장바구니 등록 api <br> 예약하기 등록 api <br> 카카오맵 api | 장바구니 조회<br> 장바구니 삭제 <br>장바구니 품절 처리 구현<br> 장바구니 관련 헤더 수량 구현<br/> 상세페이지 - 룸 상세 정보 구현 <br/>  | 결제 페이지 구현 및 api 연결<br> 결제하기 버튼 api 연결<br> 결제 페이지에서 취소하기 api 연결<br> 결제 완료 페이지 구현 및 api 연결<br> 전체 주문 내역 확인 페이지 구현 및 api 연결 |




<br/>
<br/>
<br/><br/>
<br/>


## 🎁기술 스택

![기술스택](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/37ca06f0-7d59-4f49-95ec-bf21d65b1d98)

<br/>

## 📐디자인 설계

![image](https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/5e3e3667-fb3f-4862-92de-b81c5b89a9bb)

<br/>


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
### 1. 인증

- 로그인 및 회원가입
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/1a34daf2-6c7d-434d-a4a9-152230c4439f" alt="메인 페이지에서의 숙소 리스팅" width="800" />

<br/>


- 로그아웃
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/8fda596c-784a-448c-89e1-2fd69cfda8e1" alt="메인 페이지에서의 숙소 리스팅" width="800" />

<br/>


- 자동 리프레시
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/9231108e-cbb2-4af8-9781-2b9d83812e4e" alt="메인 페이지에서의 숙소 리스팅" width="800" />

<br/>


### 2. 회원 정보 변경
- 상단 헤더에서 내 정보 수정 가능
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/98576512/88c092d0-c0f1-4977-a336-0675a1e8373c" alt="메인 페이지에서의 숙소 리스팅" width="800" />

<br/>


### 3. 숙소 리스팅

- 메인 페이지에서의 숙소 리스팅
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/83440978/eeb14731-c8cf-45cd-a363-ba5819690a68" alt="메인 페이지에서의 숙소 리스팅" width="800" />

<br/>

- 카테고리 페이지에서의 숙소 리스팅 - 무한 스크롤 적용
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/83440978/0f5ae6d7-1e3d-4f54-aee9-7912e4c51e34" alt="카테고리에서의 숙소 리스팅" width="800" />

<br/>



### 4. 검색 기능

- 헤더에서 검색 기능 구현
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/121215024/f0af2054-860f-4d46-b468-a6c80457b972" alt="메인 페이지에서의 숙소 리스팅" width="800" />

<br/>

### 5. 찜하기

- 숙소 상세 페이지에서 찜하기 가능 
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/121215024/3e7255e2-0816-422d-82f8-80a1fb566722" alt="메인 페이지에서의 숙소 리스팅" width="800" />

<br/>

- 찜하기 페이지에서 찜한 숙소 확인 가능
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/121215024/3a7fbc93-770b-4479-bfa6-f000dfb0cf22" alt="메인 페이지에서의 숙소 리스팅" width="800" />

<br/>

### 6. 제품 상세 페이지

- 숙소 상세 정보 및 장바구니 post
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/104253583/ad979f6a-bb8e-44ec-a74c-2b562b926386" alt="장바구니 조회" width="800" /> 

<br/>

- 받아온 인원 count에 따라 장바구니 담기&예약하기 가능 여부 처리 및 예약하기 post
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/104253583/daa16688-889b-4999-bdcc-571e205f4b1d" alt="장바구니 조회" width="800" /> 
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/104253583/1c24f1c2-88be-4f1b-8cf1-781dab75472a" alt="장바구니 조회" width="800" /> 

<br/>

- 날짜에 따른 장바구니 담기 가능 여부 처리
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/104253583/c627e98b-2168-4d90-aa62-f5d0dadb5cfe" alt="장바구니 조회" width="800" /> 
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/104253583/3bb3de39-3524-4360-bbfc-98b3c2852ca7" alt="장바구니 조회" width="800" /> 

<br/>

### 7. 장바구니

- 상세 페이지에서 추가한 아이템들을 장바구니 페이지에서 조회
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/83440978/f6df9e9f-363e-420b-8cae-1460bc34a27f" alt="장바구니 조회" width="800" /> 

<br/>


- 장바구니에서 아이템 주문하기 
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/83440978/511e96ef-d454-4627-ab56-2343f31aa3e1" alt="장바구니에서 아이템 주문" width="800"> 

<br/>

- 장바구니 아이템 삭제하기
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/83440978/db3cce35-542c-4090-a98a-1d18c39605e5" alt="장바구니에서 아이템 삭제" width="800"> 

<br/>


- 장바구니 3개 초과 주문 & 0개 주문시 예외 처리 
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/83440978/9e67c8da-b5ac-4487-b0cc-14a1b6c04b4d" alt="장바구니 3개 초과 주문 & 0개 주문시 예외 처리" width="800"> 

<br/>


- 여러명의 사용자가 같은 숙소 동시 주문 시 선점에 따른 품절 처리
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/83440978/9f7b3c3c-d9f0-4f18-852b-3585cf1d8c49" alt="여러명의 사용자가 같은 숙소 동시 주문 시 선점에 따른 품절 처리" width="800"> 

<br/>




### 8. 예약 및 결제
- 주문 및 결제 가능한 페이지
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/83440978/19ede0c9-e434-4f6a-a5e7-3e63add5dc3c" alt="여러명의 사용자가 같은 숙소 동시 주문 시 선점에 따른 품절 처리" width="800"> 

<br/>

- 전체 예약 내역 조회 
<img src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/83440978/52c938f5-2e21-4c16-aa3b-681834626886" alt="여러명의 사용자가 같은 숙소 동시 주문 시 선점에 따른 품절 처리" width="800"> 

<br/>



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

<details>
  <summary>  정지오</summary>
 
  >
리팩토링 내용<br/>
  >
    카카오맵 API 추가 -> 숙소 위치 마커 렌더링
    마커 클릭 시 커스텀 오버레이 렌더링 -> 클릭 시 길찾기 페이지 생성
    숙소상세정보 API 변경에 따른 추가 정보 get
    장바구니 API 변경에 따른 로직 처리
    예약하기 API 변경에 따른 로직 처리
  >

스크린샷<br/><br/>
![ezgif com-video-to-gif-converted (5)](https://github.com/Shimpyo-House/Shimpyo_FE/assets/104253583/98ce1f9f-9c52-4524-83ac-7b1a16e3aec2)
- 객실 이미지 슬라이더 구현
- 이미지 없을 시 기본 이미지 렌더링
- 숙소 상세 정보 API 추가에 따른 추가 및 상세 정보 get 처리
- 숙소 상세 및 추가 정보 아이콘 처리 및 값(boolean = false)에 따라 취소선 적용
<br/><br/>

![ezgif com-video-to-gif-converted (10)](https://github.com/Shimpyo-House/Shimpyo_FE/assets/104253583/0818ff3e-463d-46a5-91fb-31412d2ca617)<br/>
![ezgif com-video-to-gif-converted (11)](https://github.com/Shimpyo-House/Shimpyo_FE/assets/104253583/cd730a96-1208-4db1-a932-585ccf76899e)
- 장바구니 API 변경에 따른 post 처리
- 날짜마다 남은 객실 수만큼 장바구니 담기 가능
<br/><br/>

![ezgif com-video-to-gif-converted (7)](https://github.com/Shimpyo-House/Shimpyo_FE/assets/104253583/21226743-5ab0-4914-986c-9d5fcec34def)
- 객실 시설 및 서비스 정보
- 아이콘 적용 및 값에 따라 취소선 적용
<br/><br/>

![ezgif com-video-to-gif-converted (8)](https://github.com/Shimpyo-House/Shimpyo_FE/assets/104253583/c09161bd-26e2-4adb-9fe6-180322c1de42)
- 카카오맵 API -> 숙소 위치 마커 설정
- 커스텀 오버레이를 통한 UI 설계
- 길찾기 아이콘 클릭 시, 해당 숙소 주소로 카카오 길찾기 실행
<br/><br/>

![ezgif com-video-to-gif-converted (4)](https://github.com/Shimpyo-House/Shimpyo_FE/assets/104253583/b87ddafb-0b94-42ef-8b1b-4f46bf8425f6)
- 예약하기 API 변경에 따른 post 처리
<br/><br/><br/><br/>

>

에러 사항<br/>
![image](https://github.com/Shimpyo-House/Shimpyo_FE/assets/104253583/ed818fb4-d01e-4f38-afd8-fba85585d326)<br/>
  >
    카카오맵 API를 웹앱에 처음 적용해봤는데 크기 및 높이를 설정하는 부분과 요소들을 스타일링 하는데서 많은 문제가 있었다.
    React는 useEffect 훅을 제공해주는데 이 훅에서 카카오맵 API 코드를 작성하라해서 가이드대로 진행했는데,
    위 사진과 같은 오류가 나왔다. React에서는 우리가 HTML의 script 태그에서 로드한 객체는 무조건 window 객체 밑에 붙게 되어있는데,
    그래서 아래와 같이"window.kakao"라는 방식으로 사용해야 함을 알게 되었다.
  >
<img width="582" alt="image" src="https://github.com/Shimpyo-House/Shimpyo_FE/assets/104253583/e1049cff-b03a-4f2e-826f-7aec98537ae6">
  >
<br/><br/><br/><br/>

회고<br/>
  >
    백엔드와의 협업을 처음 해봐서 많은 어려움이 있었다. post, get하는 원리 및 방식도 잘 몰랐었고 프론트 개념이 완전히 잡혀있지 않은 상태에서 하니 어려움은 배로 느껴졌었다.
    그래도 지속적인 회의 및 개발을 통해 최종적으로는 백엔드에서 전달해준 api를 다 잘 사용할 수 있었다. 숙소 상세 페이지를 맡아 숙소정보를 불러오고 장바구니에 담고 바로 예약하는 등
    많은 api를 사용하는 것이 부담이 되었지만 그만큼 백엔드와의 통신을 공부할 수 있어서 많이 성장하는 계기가 되었던 것 같다. 다음 프로젝트 시에는 백엔드 지식을 좀 더 갖춰서
    백엔드와의 소통을 더 원활하게 할 수 있는 프론트엔드 개발자가 되고싶다는 생각을 가지게 되었다.
  >
</details>
<br/>

<details>
  <summary> 장수빈</summary>

  >
  1. 리팩토링 내용<br/>
  >
    - 객실 상세 정보 API 추가에 따른 UI 구현
    - 장바구니 API 변경에 따른 로직 처리 
      - 조회, 주문, 삭제, 품절 처리 
    - 상세 페이지에서 장바구니 POST 시 헤더 수량 변경
  > 

  2. 스크린샷<br/>
  >
  - 객실 상세 정보 API 추가에 따른 UI 구현
  
    ![ezgif com-video-to-gif-converted](https://github.com/Shimpyo-House/Shimpyo_FE/assets/83440978/f3df7203-616f-418d-bc50-ed5076fe3730)
  >

<br/>

3. 에러 사항<br/>
  >
    1. 상세 페이지에서 아이템을 장바구니에 넣을 때(post), 헤더 장바구니 수량이 변하지 않았던 현상

      - POST를 제외한 장바구니 관련 API를 React Query로 관리하고 있었는데 post 부분은 쿼리와 연결이 되어 있지 않아서 post 하는 부분의 API를 다른 장바구니의 API와 동일하게 쿼리로 관리한 후, mutation을 사용하여 장바구니에 아이템이 추가될 때마다 헤더 수량이 변경될 수 있도록 수정하였습니다.
  >
<br/>

4. 회고<br/>
  >
    백엔드와 협업 경험이 이번이 처음이었는데, 소통을 하려면 프론트에 대해서만 아는 것이 아닌 백엔드의 지식을 함께 겸비해야 한다는 것을 깨닫게 된 프로젝트였습니다. 또한 주어진 기간 안에 프론트엔드, 백엔드 일정 조율이 매우 중요하다는 것을 몸소 느끼게 되었습니다. 
  >
</details>
<br/>

<details>
  <summary>소유나</summary>

    1. 구현 기능
      
      - 결제 페이지 구현 및 api 연결(장바구니/예약 페이지에서 넘어오는 data get)

      - 결제하기 버튼 api 연결 

      - 결제 페이지에서 취소하기 api 연결
      
      - 결제 완료 페이지 구현 및 api 연결

      - 전체 주문 내역 확인 페이지 구현 및 api 연결
   
    
    2. 에러 사항

      - 결제 페이지에서 체크박스를 먼저 누르고 필수 입력 사항을 입력하면 바로 결제하기 버튼 활성화 안 되는 문제가 있다


    3. 회고
      
      - 처음으로 백엔드와 협업해서 작업했는데 api를 연결해서 데이터를 받아오고 사용하고 백엔드에 데이터를 보내는 방법을 잘 터득한 것 같다. 이번 협업을 통해서 백엔드 지식도 꼭 필요하겠구나를 느꼈고 부족한 부분과 앞으로 더 공부해야할 부분을 알게된 것 같다.
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

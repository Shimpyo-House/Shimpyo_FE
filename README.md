# Shimpyo : 숙박 프로젝트

## 📚프로젝트 소개

**개발 기간** : 2023.11.20 ~ 2023.12.01 (2주)<br/>
**개발 인원** : 8명 (FE 5, BE 3)

`Shimpyo`는 숙소 정보확인, 예약, 결제까지 가능한 숙박플랫폼입니다.

<br>
<div align=center>
  <a href="https://fastcampus-wiki.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/배포 링크-ed234b?style=for-the-badge&logoColor=white" alt="example"/>
  </a>
</div>

<br>

## 👩‍💻팀원소개

<table>
  <tr>
    <td align="center" width="150px">
      <a href="" target="_blank">
        <img src="" alt="최우혁 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="" target="_blank">
        <img src="" alt="정지오 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="" target="_blank">
        <img src="" alt="백상원 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="" target="_blank">
        <img src="" alt="정수빈 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="" target="_blank">
        <img src="" alt="소유나 프로필" />
      </a>
    </td>

  </tr>
  <tr> 
    <td align="center">
      <a href="" target="_blank">
        최우혁<br />
        Frontend
      </a>
    </td>
    <td align="center">
      <a href="" target="_blank">
        정지오<br />
        Frontend
      </a>
    </td>
    <td align="center">
      <a href="" target="_blank">
        백상원<br />
        Frontend
      </a>
    </td>
    <td align="center">
      <a href="" target="_blank">
        정수빈<br />
        Frontend
      </a>
    </td>
    <td align="center">
      <a href="" target="_blank">
        소유나<br />
        Frontend
      </a>
    </td>

  </table>
  <table>
  </tr>
    <tr>
    <td align="center" width="150px">
      <a href="" target="_blank">
        <img src="" alt="정의정 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="" target="_blank">
        <img src="" alt="심재철 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="" target="_blank">
        <img src="" alt="이주연 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="" target="_blank">
        <img src="" alt="서정현 멘토님" />
      </a>
    </td>
  </tr>
  <tr> 
    <td align="center">
      <a href="" target="_blank">
        정의정<br />
        Backend
      </a>
    </td>
    <td align="center">
      <a href="" target="_blank">
        심재철<br />
        Backend
      </a>
    </td>
    <td align="center">
      <a href="" target="_blank">
        이주연<br />
        Backend
      </a>
    </td>
    <td align="center">
      <a href="" target="_blank">
        서정현 멘토님
      </a>
    </td>
  </tr>
</table>
<br>

## 🎁기술 스택

스택 이미지

## 👤디자인 설계

Figma 이미지
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

### 로그인, 회원가입

<img src="https://github.com/cs-yum/cs-yum-blog/assets/101972330/08a39e06-34d9-47a7-9292-c2dccb19e158"  width="300" />

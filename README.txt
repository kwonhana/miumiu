project-root
├── public                          # 정적 리소스 (빌드 없이 그대로 배포되는 영역)
│   ├── assets
│   │   ├── favicon                # 브라우저 파비콘 관련 리소스
│   │   ├── icon                   # UI 공통 아이콘
│   │   └── images                 # 서비스 이미지 리소스
│   │       ├── detail             # 상품 상세 이미지
│   │       └── static             # 고정 UI 이미지 (배너, 배경 등)
│   │
│   ├── logo                       # 로고 전용 폴더
│   │   ├── logo_black.png
│   │   └── logo.png
│   │
│   ├── favicon.png                # 기본 파비콘
│   ├── index.html                 # SPA 엔트리 HTML
│   ├── manifest.json              # PWA 설정
│   └── robots.txt                 # 검색엔진 크롤링 설정
│
├── src
│   ├── svc                        # 외부 서비스 / API 계층
│   │   └── api
│   │       ├── authStore.js       # 국ㄹ 인증 관련 API / 로직
│   │       ├── firebase.js        # Firebase 연결 설정
│   │       ├── kakaoMap.js        # 카카오맵 API 연동
│   │       ├── products.js        # 상품 API 데이터 정의
│   │       └── storeInfo.js       # 매장 관련 API
│
│   ├── components                 # 전역 공통 컴포넌트
│   │   └── feedback
│   │       └── info
│   │           ├── CookiePolicy.jsx       # 쿠키 정책
│   │           ├── PrivacyPolicy.jsx      # 개인정보 처리방침
│   │           ├── ProductPurchaseTerms.jsx # 구매 약관
│   │           ├── TermsOfService.jsx     # 서비스 이용약관
│   │           ├── Chatbot.jsx            # 챗봇 UI
│   │           ├── Modal.jsx              # 공통 모달 프레임
│   │           └── ModalText.jsx          # 모달 내용 컴포넌트
│
│   ├── styles                    # 글로벌 스타일
│   │   ├── chatbot.scss // 챗봇 scss
│   │   ├── footer.scss // 챗봇 scss
│   │   └── modal-text.scss // 챗봇 scss 
│
│   ├── input                     # 입력 UI 시스템 (디자인 시스템 성격)
│   │   ├── scss // input scss
│   │   │   └── Input.scss        # input 전용 공통 스타일
│   │
│   │   ├── Input.jsx             # 베이스 Input 컴포넌트
│   │   ├── Address.jsx           # 주소 입력
│   │   ├── AuthInput.jsx         # 인증 입력 통합
│   │   ├── BirthdayInput.jsx     # 생년월일 입력
│   │   ├── DetailAddress.jsx     # 상세 주소
│   │   ├── DropBox.jsx           # 드롭다운 UI
│   │   ├── EmailInput.jsx        # 이메일 입력
│   │   ├── IdInput.jsx           # 아이디 입력
│   │   ├── NameInput.jsx         # 이름 입력
│   │   ├── PasswordInput.jsx     # 비밀번호 입력
│   │   ├── PhoneInput.jsx        # 전화번호 입력
│   │   ├── PointInput.jsx        # 포인트 입력
│   │   ├── PostCode.jsx          # 우편번호
│   │   ├── RadioCard.jsx         # 라디오 선택 카드
│   │   ├── SearchInput.jsx       # 검색 입력
│   │   ├── SelectCity.jsx        # 지역 선택
│   │   ├── TellInput.jsx         # 연락처 입력
│   │   └── TextInput.jsx         # 기본 텍스트 입력
│   │
│   │   ├── layout                # input 전용 UI 모듈
│   │   │   ├── scss
│   │   │   │   ├── Button.scss
│   │   │   │   └── Spinner.scss
│   │   │   ├── Button.jsx        # 공통 버튼
│   │   │   ├── Logo.jsx          # 로고 컴포넌트
│   │   │   └── Spinner.jsx       # 로딩 스피너
│   │
│   │   └── product               # 상품 카드 전용 UI
│   │       ├── ProductCard.jsx   # 상품 카드 ui
│   │       └── SkeletonCard.jsx   # 상품 스켈레톤 ui
│
│   ├── pages                     # 라우팅 단위 페이지
│   │   ├── auth                  # 인증 관련 페이지
│   │   │   ├── join         #회원가입
│   │   │   │   ├── Join.jsx
│   │   │   │   └── Join.scss
│   │   │   │
│   │   │   ├── login         #로그인
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Login.scss
│   │   │   │
│   │   │   ├── MyPage          #마이페이지
│   │   │   │   ├── scss
│   │   │   │   │   ├── AddressEditModal.scss
│   │   │   │   │   ├── AddressTable.scss
│   │   │   │   │   ├── InfoEditPopup.scss
│   │   │   │   │   ├── MyPage.scss
│   │   │   │   │   ├── MypageBanner.scss
│   │   │   │   │   └── MypageNav.scss
│   │   │   │   ├── layout
│   │   │   │   │   ├── AddressEditModal.jsx  #배송지 수정 
│   │   │   │   │   ├── AddressTable.jsx  #배송지 리스트
│   │   │   │   │   ├── InfoEditPopup.jsx  #회원정보 수정하기
│   │   │   │   │   ├── MyInfo.jsx  #내정보
│   │   │   │   │   ├── Mypage.jsx #마이페이지
│   │   │   │   │   ├── MypageBanner.jsx  #마이페이지 상단
│   │   │   │   │   └── MypageNav.jsx #마이페이지 탭
│   │   │   │   └── Mypage.jsx  #마이페이지 시작점 
│   │   │   │
│   │   │   └── WishList
│   │   │       ├── WishList.jsx  # 찜 목록
│   │   │       ├── WishList.scss 
│   │   │       ├── WishListPopup.scss # 찜목록 삭제 modal scss
│   │   │
│   │   ├── checkout
│   │   │   ├── Cart
│   │   │   │   └── Cart.jsx #장바구니 시작점
│   │   │   ├── layout
│   │   │   │   ├── CartItem.jsx  #장바구니 아이템
│   │   │   │   └── CartTotalPrice.jsx  #장바구니 가격 
│   │   │   ├── MyOrder
│   │   │   │   ├── scss
│   │   │   │   │   ├── MyOrder.scss 
│   │   │   │   │   ├── OngoingNone.scss
│   │   │   │   │   ├── OngoingProcess.scss
│   │   │   │   │   ├── RecentNone.scss
│   │   │   │   │   └── RecentOrderTable.scss
│   │   │   │   ├── MyOrder.jsx  #내 주문
│   │   │   │   ├── OngoingNone.jsx  #주문 없을 시 
│   │   │   │   ├── OngoingProcess.jsx #배송 진행 단계 
│   │   │   │   ├── RecentNone.jsx #최근 구매 내역
│   │   │   │   └── RecentOrderTable.jsx  #최근 구매 리스트
│   │   │   ├── OrderComplete 
│   │   │   │   └── OrderComplete.jsx #주문 완료시
│   │   │   ├── OrderSummary
│   │   │   │   └── OrderSummary.jsx # 결제 입력 확인 페이지
│   │   │   ├── OrderTotal
│   │   │   │   └── OrderTotal.jsx  #총 주문 내역
│   │   │   ├── Payment
│   │   │   │   └── Payment.jsx #결제 방법
│   │   │   ├── Shipping
│   │   │   │   └── Shipping.jsx #주문자 입력 란
│   │   │   └── scss
│   │   │       ├── Cart.scss
│   │   │       ├── CartItem.scss
│   │   │       ├── CartTotalPrice.scss
│   │   │       ├── OrderComplete.scss
│   │   │       ├── OrderSummary.scss
│   │   │       ├── OrderTotal.scss
│   │   │       ├── Payment.scss
│   │   │       └── Shipping.scss
│   │   │ 
│   │   ├── customer              # 매장 / 고객센터
│   │   ├── footer                # 푸터 페이지
│   │   ├── header                # 헤더 영역
│   │   ├── Home                  # 메인 페이지
│   │   └── Products              # 상품 목록 페이지
│
│   ├── store                     # Zustand 상태관리 영역
│   │   ├── data.js               # 공통 데이터
│   │   ├── useChat.js            # 챗봇 상태
│   │   ├── useComStore.js        # 공통 상태
│   │   ├── useHeaderStore.js     # 헤더 상태
│   │   ├── useInputStore.js      # input 상태
│   │   ├── useProductsStore.js   # 상품 상태
│   │   └── useSearchState.js     # 검색 상태
│
│   ├── App.js                    # 최상위 React 엔트리 컴포넌트
│   ├── App.module.scss           # App 스코프 스타일
│   ├── App.scss                  # 글로벌 App 스타일
│   ├── App.test.js               # 테스트
│   ├── index.js                  # React 진입점
│   ├── index.css                 # 기본 스타일
│   ├── logo.svg                  # 기본 로고
│   ├── reportWebVitals.js        # 성능 측정
│   ├── ScrollToTop.js            # 라우트 이동 시 스크롤 리셋
│   └── setupTests.js             # 테스트 초기 설정
│
└── package.json                  # 프로젝트 의존성 설정

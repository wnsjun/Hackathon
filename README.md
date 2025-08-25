# 🌱 SpaceFarm - 텃밭 대여 서비스 플랫폼

도시 속 버려진 공간을 활용한 텃밭 대여 서비스 플랫폼입니다. 옥상, 마당, 자투리 공간을 나만의 텃밭으로 만들어 도시 속 자연을 되찾을 수 있습니다.

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)
- [환경 변수 설정](#환경-변수-설정)
- [페이지별 기능 상세](#페이지별-기능-상세)
- [API 구조](#api-구조)
- [컴포넌트 구조](#컴포넌트-구조)
- [상태 관리](#상태-관리)
- [스타일링 가이드](#스타일링-가이드)
- [개발 가이드라인](#개발-가이드라인)
- [배포 정보](#배포-정보)
- [기여 방법](#기여-방법)

## 🎯 프로젝트 소개

SpaceFarm은 도시의 유휴 공간을 활용하여 개인이 텃밭을 대여할 수 있는 플랫폼입니다. 공간 소유자는 자신의 공간을 등록하여 수익을 창출하고, 사용자는 원하는 위치의 텃밭을 대여하여 도시 농업을 체험할 수 있습니다.

### 💡 핵심 가치

- **공간 활용**: 버려진 도시 공간의 효율적 활용
- **지속가능성**: 도시 농업을 통한 환경 보호
- **커뮤니티**: 텃밭 관련 정보 공유 및 소통
- **편의성**: 간편한 대여 시스템과 결제 서비스

## ✨ 주요 기능

### 🏠 홈 & 매물 관리

- **매물 검색**: 위치, 평수, 가격, 테마별 필터링
- **추천 시스템**: 사용자 맞춤 텃밭 추천
- **매물 등록**: 공간 소유자의 텃밭 등록 및 관리
- **상세 정보**: 텃밭 상세 정보, 사진, 리뷰 조회

### 💬 소통 & 커뮤니티

- **실시간 채팅**: WebSocket 기반 1:1 채팅 시스템
- **커뮤니티**: 텃밭 관련 정보 공유 게시판
- **리뷰 시스템**: 텃밭 이용 후기 작성 및 조회
- **AI 챗봇**: 텃밭 관련 상담 및 문의 지원

### 🔐 사용자 관리

- **회원가입/로그인**: 이메일 기반 인증 시스템
- **마이페이지**: 개인정보, 대여 내역, 등록 매물 관리
- **코인 시스템**: 가상 화폐를 통한 결제 시스템
- **북마크**: 관심 매물 저장 기능

### 💳 결제 & 거래

- **코인 충전**: 토스페이 연동 결제 시스템
- **대여 결제**: 코인을 활용한 텃밭 대여 결제
- **거래 내역**: 충전 및 결제 내역 조회

## 🛠 기술 스택

### Frontend

- **React 19.1.0** - 컴포넌트 기반 UI 라이브러리
- **Vite 7.0.4** - 빠른 빌드 도구
- **React Router DOM 7.7.0** - 클라이언트 사이드 라우팅
- **Tailwind CSS 4.1.11** - 유틸리티 기반 CSS 프레임워크
- **Axios 1.11.0** - HTTP 클라이언트
- **TanStack Query 5.84.2** - 서버 상태 관리
- **STOMP.js 7.1.1** - WebSocket 메시징
- **SockJS 1.6.1** - WebSocket 연결 관리

### Development Tools

- **ESLint** - 코드 품질 관리
- **Prettier 3.6.2** - 코드 포매팅
- **TypeScript Types** - 타입 지원 (JavaScript 환경)
- **Vite Plugin SVGR** - SVG 컴포넌트 변환

### Build & Deployment

- **Vite** - 번들러
- **Vercel** - 배포 플랫폼 (vercel.json 설정)

## 📁 프로젝트 구조

```
├── public/                     # 정적 자산
│   ├── spacefarm_logo_image.png
│   └── vite.svg
├── src/
│   ├── apis/                   # API 관리
│   │   ├── axiosInstance.js    # Axios 인스턴스 설정
│   │   ├── authApi.js          # 인증 관련 API
│   │   ├── home.js             # 홈 매물 API
│   │   ├── chatApi.js          # 채팅 API
│   │   ├── community.js        # 커뮤니티 API
│   │   ├── paymentApi.js       # 결제 API
│   │   └── ...                 # 기타 API 모듈
│   ├── assets/                 # 이미지, 아이콘 자산
│   │   ├── spacefarm_logo_image.png
│   │   ├── banner.png
│   │   ├── FarmCoin.svg
│   │   └── ...                 # 기타 자산
│   ├── components/             # 재사용 가능한 컴포넌트
│   │   ├── common/             # 공통 컴포넌트
│   │   │   ├── Button.jsx      # 버튼 컴포넌트
│   │   │   ├── Card/           # 카드 컴포넌트들
│   │   │   │   ├── FarmCard.jsx
│   │   │   │   ├── CommunityPostCard.jsx
│   │   │   │   └── ReviewCard.jsx
│   │   │   ├── Filter/         # 필터 컴포넌트들
│   │   │   │   ├── LocationFilter.jsx
│   │   │   │   ├── AreaFilter.jsx
│   │   │   │   └── PriceFilter.jsx
│   │   │   ├── Modal/          # 모달 컴포넌트들
│   │   │   ├── chat/           # 채팅 관련 컴포넌트
│   │   │   └── ...             # 기타 공통 컴포넌트
│   │   └── layouts/            # 레이아웃 컴포넌트
│   │       ├── Layout.jsx      # 메인 레이아웃
│   │       └── Navbar.jsx      # 네비게이션 바
│   ├── contexts/               # Context API
│   │   └── CoinContext.jsx     # 코인 잔액 상태 관리
│   ├── data/                   # Mock 데이터
│   │   ├── mockFarms.js        # 텃밭 mock 데이터
│   │   └── mockCommunity.js    # 커뮤니티 mock 데이터
│   ├── hooks/                  # 커스텀 훅
│   │   ├── useAuth.js          # 인증 관련 훅
│   │   ├── usePayment.js       # 결제 관련 훅
│   │   └── useStompClient.js   # WebSocket 관련 훅
│   ├── page/                   # 페이지 컴포넌트
│   │   ├── Home.jsx            # 홈 페이지
│   │   ├── Login.jsx           # 로그인 페이지
│   │   ├── Community.jsx       # 커뮤니티 페이지
│   │   ├── ChatPage.jsx        # 채팅 페이지
│   │   ├── MyPage.jsx          # 마이페이지
│   │   └── ...                 # 기타 페이지
│   ├── utils/                  # 유틸리티 함수
│   │   ├── auth.js             # 인증 유틸리티
│   │   ├── date.js             # 날짜 처리 유틸리티
│   │   └── timeAgo.js          # 시간 표시 유틸리티
│   ├── App.jsx                 # 메인 App 컴포넌트
│   ├── main.jsx                # React DOM 렌더링
│   └── index.css               # 전역 스타일
├── CLAUDE.md                   # 개발 가이드라인
├── package.json                # 패키지 설정
├── vite.config.js              # Vite 설정
├── eslint.config.js            # ESLint 설정
└── vercel.json                 # Vercel 배포 설정
```

## 🚀 설치 및 실행

### 사전 요구사항

- Node.js 18+
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone [repository-url]
cd Hackathon

# 의존성 설치
npm install
# 또는
yarn install
```

### 실행

```bash
# 개발 서버 실행
npm run dev
# 또는
yarn dev

# 빌드
npm run build
# 또는
yarn build

# 린트 검사
npm run lint
# 또는
yarn lint

# 프리뷰 (빌드 후 확인)
npm run preview
# 또는
yarn preview
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 🔧 환경 변수 설정

`.env` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
VITE_API_URL=http://your-api-server.com/api
```

- `VITE_API_URL`: 백엔드 API 서버 주소

## 📖 페이지별 기능 상세

### 🏠 Home (`/home`, `/`)

- **매물 검색**: 위치, 평수, 가격, 테마별 필터링
- **추천 매물**: 로그인 사용자에게 개인화된 텃밭 추천
- **매물 목록**: 필터링된 텃밭 매물 카드 형태로 표시
- **매물 등록**: 새로운 텃밭 등록 버튼

### 🔍 HomeSearchResult (`/search`)

- **검색 결과**: 제목 기반 텃밭 검색 결과
- **필터 적용**: 홈에서 설정한 필터가 유지됨

### 🌾 PlantDetail (`/plant/:id`, `/farm/:id`)

- **매물 상세**: 텃밭 상세 정보, 사진, 위치
- **리뷰 섹션**: 해당 텃밭의 이용 후기
- **대여 신청**: 코인을 사용한 대여 신청
- **북마크**: 관심 매물 저장

### 🏗 AddFarm (`/addfarm`)

- **매물 등록**: 새로운 텃밭 정보 입력 및 등록
- **사진 업로드**: 텃밭 사진 여러 장 업로드
- **위치 설정**: 주소 및 상세 위치 정보

### 💬 ChatPage (`/chat`)

- **채팅방 목록**: 참여 중인 채팅방 리스트
- **실시간 채팅**: WebSocket 기반 1:1 채팅
- **텃밭 정보**: 채팅방별 관련 텃밭 정보 표시

### 🏪 Community (`/community`)

- **게시글 목록**: 텃밭 관련 커뮤니티 게시글
- **검색 기능**: 게시글 제목/내용 검색
- **카테고리**: 다양한 주제별 게시글 분류

### ✍ CommunityWrite (`/community/write`)

- **게시글 작성**: 텃밭 관련 정보 공유 글 작성
- **이미지 첨부**: 게시글 이미지 업로드
- **카테고리 선택**: 적절한 주제 카테고리 선택

### 📄 CommunityDetail (`/community/:id`)

- **게시글 상세**: 커뮤니티 게시글 상세 내용
- **댓글 시스템**: 게시글에 대한 댓글 작성/조회
- **좋아요**: 게시글 좋아요 기능

### 🔐 Login (`/login`)

- **로그인**: 이메일/비밀번호 기반 로그인
- **소셜 로그인**: 카카오 로그인 연동
- **자동 로그인**: 토큰 기반 자동 로그인

### 📝 Signup (`/signup`)

- **회원가입**: 기본 정보 입력 (1단계)
- **이메일 인증**: 이메일 기반 계정 인증

### 📋 SignupInfo (`/signupinfo`)

- **추가 정보**: 회원가입 2단계 상세 정보 입력
- **프로필 설정**: 닉네임, 관심사 등 설정

### 👤 MyPage (`/mypage`)

- **개인정보**: 사용자 프로필 및 정보 관리
- **대여 내역**: 이용 중인/완료된 텃밭 목록
- **등록 매물**: 본인이 등록한 텃밭 관리
- **코인 잔액**: 현재 코인 잔액 및 충전

### 🌾 MyAllFarms (`/my-all-farms`)

- **전체 매물**: 본인이 등록한 모든 텃밭 목록
- **매물 관리**: 등록 매물 수정/삭제

### 📰 MyAllCommunity (`/my-all-community`)

- **작성 글**: 본인이 작성한 커뮤니티 게시글
- **글 관리**: 게시글 수정/삭제

### ⭐ MyAllReviews (`/my-all-reviews`)

- **작성 리뷰**: 본인이 작성한 텃밭 이용 후기
- **리뷰 관리**: 리뷰 수정/삭제

### 💰 CoinChargePage (`/coin-charge`)

- **코인 충전**: 토스페이를 통한 코인 충전
- **충전 내역**: 과거 충전 기록 조회

### 💳 CreditPage (`/credit`, `/credit/:chatRoomId`)

- **결제 처리**: 텃밭 대여 결제 진행
- **결제 확인**: 결제 완료 후 확인

### ⚙️ Setting (`/setting`)

- **계정 설정**: 개인정보 수정
- **알림 설정**: 푸시 알림 관리
- **로그아웃**: 안전한 로그아웃

## 🔗 API 구조

### 인증 관련 (`authApi.js`)

- `POST /auth/login` - 로그인
- `POST /auth/signup1` - 회원가입 1단계
- `POST /auth/signup2` - 회원가입 2단계
- `POST /auth/logout` - 로그아웃

### 텃밭 관련 (`home.js`)

- `GET /farms` - 전체 텃밭 목록 조회
- `GET /farms/:id` - 특정 텃밭 상세 조회
- `POST /farms` - 새 텃밭 등록

### 채팅 관련 (`chatApi.js`)

- `GET /chat/rooms` - 채팅방 목록
- `GET /chat/rooms/:id/messages` - 채팅 메시지 조회
- WebSocket을 통한 실시간 메시징

### 커뮤니티 관련 (`community.js`)

- `GET /community/posts` - 게시글 목록
- `GET /community/posts/:id` - 게시글 상세
- `POST /community/posts` - 새 게시글 작성
- `POST /community/posts/:id/comments` - 댓글 작성

### 결제 관련 (`paymentApi.js`)

- `POST /payments/charge` - 코인 충전
- `POST /payments/rent` - 텃밭 대여 결제

### HTTP 클라이언트 설정 (`axiosInstance.js`)

- 자동 토큰 첨부
- 401 오류 시 자동 로그아웃
- CORS 처리
- 요청/응답 인터셉터

## 🧩 컴포넌트 구조

### 공통 컴포넌트 (`components/common/`)

#### 카드 컴포넌트

- **FarmCard**: 일반 텃밭 매물 카드
- **RecommendFarmCard**: 추천 텃밭 카드
- **RentingFarmCard**: 대여 중인 텃밭 카드
- **CommunityPostCard**: 커뮤니티 게시글 카드
- **ReviewCard**: 리뷰 카드

#### 필터 컴포넌트

- **LocationFilter**: 지역별 필터
- **AreaFilter**: 평수별 필터 (슬라이더)
- **PriceFilter**: 가격별 필터 (슬라이더)
- **ThemeFilter**: 테마별 필터

#### 모달 컴포넌트

- **ChargeSuccessModal**: 충전 완료 모달
- **ExchangeSuccessModal**: 교환 완료 모달
- **ReviewModal**: 리뷰 작성 모달

#### 채팅 컴포넌트

- **ChatRoomList**: 채팅방 목록
- **ChatMessage**: 채팅 메시지
- **ChatFarmInfo**: 채팅방 텃밭 정보

#### 기타 공통 컴포넌트

- **Button**: 재사용 가능한 버튼 (다양한 variant 지원)
- **Searchbar**: 검색창
- **Header**: 페이지 헤더
- **CoinDisplay**: 코인 잔액 표시
- **ChatbotIcon**: AI 챗봇 아이콘

### 레이아웃 컴포넌트 (`components/layouts/`)

- **Layout**: 메인 레이아웃 wrapper
- **Navbar**: 상단 네비게이션 + 하단 모바일 네비게이션

## 🎛 상태 관리

### Context API

- **CoinContext**: 코인 잔액 전역 상태 관리
  - `coinBalance`: 현재 코인 잔액
  - `updateCoinBalance`: 코인 잔액 업데이트
  - `loadCoinBalance`: localStorage에서 잔액 로드

### TanStack Query (React Query)

- 서버 상태 관리 및 캐싱
- API 호출 상태 관리 (loading, error, success)
- 자동 재시도 및 백그라운드 업데이트

### Local Storage

- **accessToken**: 인증 토큰
- **userData**: 사용자 정보 (닉네임, 코인 잔액 등)
- **postLikes**: 게시글 좋아요 상태
- **farmBookmarks**: 텃밭 북마크 상태

### WebSocket (STOMP)

- **useStompClient** 커스텀 훅으로 관리
- 실시간 채팅 메시지 송수신
- 연결 상태 관리 및 재연결 로직

## 🎨 스타일링 가이드

### Tailwind CSS 설정

- **Tailwind CSS 4.1.11** 사용
- **@tailwindcss/vite** 플러그인 적용
- 커스텀 색상 및 폰트 설정

### 스타일링 규칙 (CLAUDE.md 기반)

#### ✅ 권장사항

- Tailwind 클래스 기반 스타일링 사용
- `flex`, `grid` 레이아웃 활용
- `gap` 속성으로 간격 조절
- 컴포넌트별 일관된 디자인 시스템

#### ❌ 지양사항

- 인라인 스타일 (`style={{ }}`) 사용 금지
- `relative`, `absolute` 포지셔닝 최소화
- `margin`, `padding` 대신 `gap` 사용 권장

### 반응형 디자인

- **Mobile First** 접근 방식
- **sm:**, **md:**, **lg:**, **xl:** 브레이크포인트 활용
- 모바일 전용 하단 네비게이션
- 데스크톱/모바일 다른 UI 컴포넌트

### 색상 팔레트

- **Primary Green**: `#1AA752` (SpaceFarm 브랜드 색상)
- **Text**: `#111111` (기본 텍스트)
- **Secondary Text**: `#777777`, `#BBBBBB`
- **Background**: `#F9FAFB` (페이지 배경)

## 📋 개발 가이드라인

### 코딩 컨벤션 (CLAUDE.md 기반)

#### ✅ 필수 규칙

1. **150줄 초과 컴포넌트 분리**: 내부 hooks나 서브 컴포넌트로 분할
2. **인라인 함수 지양**: 핸들러 함수로 분리
   - 네이밍: `handle` + 대상 + 이벤트명 (예: `handleCTAButtonClick`)
3. **React 모듈 import**: `React.useState` ❌ → `import { useState }` ✅
4. **타입스크립트 사용 금지**: JavaScript만 사용
5. **주석 추가 금지**: 코드 자체로 의도를 명확히 표현

#### 📁 디렉토리 규칙

- 페이지는 `src/page/[PageName].jsx` 형태
- 재사용 컴포넌트는 `src/components/common/` 배치
- API 관련 코드는 `src/apis/` 디렉토리에 모듈별로 분리

#### 🎨 에셋 관리

- Figma에서 SVG 코드 복사하여 컴포넌트화
- `.svg` 파일 직접 생성 금지
- 이미지는 `src/assets/` 디렉토리에 배치

### Git 워크플로우

- **main** 브랜치가 메인 브랜치
- 기능별 브랜치 생성 후 PR을 통한 머지

### 코드 품질 관리

- **ESLint** 규칙 준수
- **Prettier** 자동 포매팅
- 커밋 전 린트 검사 실행

### 성능 최적화

- TanStack Query를 통한 API 응답 캐싱
- 이미지 최적화 (`?url` 파라미터 활용)
- 컴포넌트 지연 로딩 (필요시)

## 🌐 배포 정보

### Vercel 배포

- **vercel.json** 설정으로 SPA 라우팅 지원
- 자동 배포 파이프라인 구성
- 환경 변수는 Vercel 대시보드에서 관리

### 빌드 설정

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 환경 구성

- **개발**: `npm run dev` (localhost:3000)
- **빌드**: `npm run build`
- **프리뷰**: `npm run preview`

## 🤝 기여 방법

### 개발 환경 설정

1. 저장소 Fork
2. 로컬 개발 환경 구성
3. 기능 개발 및 테스트
4. PR 생성

### 기여 규칙

- **CLAUDE.md** 개발 가이드라인 준수
- 기능별 작은 단위 PR 권장
- 코드 리뷰 필수
- 테스트 코드 작성 권장

### 이슈 리포팅

- GitHub Issues를 통한 버그 리포트
- 기능 제안 및 개선사항 제출
- 재현 가능한 상세한 정보 제공

## 📞 연락처 및 지원

개발 관련 문의사항이나 지원이 필요한 경우:

- GitHub Issues를 통한 문의
- 프로젝트 관리자에게 직접 연락

---

## 🔄 최신 업데이트

### 현재 버전: v1.0.0

- 기본 텃밭 대여 서비스 구현 완료
- 실시간 채팅 시스템 구현
- 커뮤니티 기능 구현
- 코인 충전/결제 시스템 구현
- 반응형 디자인 적용

### 향후 계획

- 푸시 알림 시스템
- 고급 검색 필터
- 소셜 기능 확장
- 성능 최적화

---

**SpaceFarm**으로 도시 속 작은 농장을 시작해보세요! 🌱

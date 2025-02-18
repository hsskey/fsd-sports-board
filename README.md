# 📝 fsd-community-board

해당 Project는 GitHub Issues API를 활용하여 구현한 게시판 애플리케이션입니다. Feature-Sliced Design 아키텍처를 기반으로 설계되었으며, 사용자에게 축구게시판과 골프게시판을 제공합니다.

🔗 **데모**: [https://fsd-sports-board.vercel.app//](https://fsd-sports-board.vercel.app//)

## ✨ 주요 기능

### 📋 게시판
- 축구게시판과 골프게시판
- 게시글 작성, 조회, 수정, 삭제 (CRUD) 기능
- 제목 및 내용 기반 검색 기능
- 페이지네이션을 통한 게시글 목록 관리
- 최근 게시글 미리보기 기능

### 🙌 사용자 경험
- 스켈레톤 UI를 통해 로딩 상태 표시
- 게시글 작성 중 페이지 이탈 방지 기능

## 🛠️ 기술 스택

### 🧩 Core
- React 18
- TypeScript
- Vite
- React Router v7

### 🌐 Data Fetching & HTTP Client
- TanStack Query v5 (Data Fetching & Caching)
- Axios

### 🎨 UI
- Mantine UI
- TailwindCSS

### 🧪 테스트
- Vitest
- React Testing Library
- Testing Library User Event

### 🌿 코드 품질
- Biome (Linting & Formatting)
- Lefthook (Git Hooks)

## 🏛️ 아키텍처

### 🍰 Feature-Sliced Design

```
src/
├── app/      # 앱 초기화 (providers, router)
├── pages/    # 페이지 컴포넌트
├── widgets/  # 하위 레이어를 조합한 도메인에 특화된 UI 컴포넌트 
├── features/ # 비즈니스 로직
├── entities/ # 비즈니스 엔티티
└── shared/   # 공용 유틸리티
```

## 🚀 실행 방법

1. 의존성 설치

```bash
pnpm install
```

2. 환경변수 설정

```bash
VITE_GITHUB_TOKEN=your_github_token
VITE_GOLF_REPO=your_github_repo
VITE_SOCCER_REPO=your_github_repo 
```

3. 개발 서버 실행

```bash
pnpm dev
```

5. 테스트 실행

```bash
pnpm test
```

## 🌟 주요 구현사항

### 1. 게시판 기능
- 게시글 목록 조회, 상세 조회, 작성, 수정, 삭제
- 검색 및 페이지네이션
- 게시글 작성시 이탈 방지

### 2. UI/UX
- Mantine UI와 TailwindCSS 조합을 통해 일관된 디자인 구현
- 스켈레톤 UI를 활용하여 로딩 상태 표시

### 3. 성능 최적화
- 데이터 캐싱 전략을 통해 불필요한 네트워크 요청 최소화

# CLAUDE.md

이 웹페이지는 **텃밭 대여 서비스를 지원하는 플랫폼**입니다.

---

# MCP Servers

## Figma Dev Mode MCP Rules

- Figma Dev Mode MCP Server는 이미지 및 SVG 자산을 제공하는 assets endpoint를 제공합니다.
- **중요**: Figma Dev Mode MCP Server가 이미지나 SVG에 대해 `localhost` 소스를 반환하면, 해당 소스를 그대로 사용해야 합니다.
- **중요**: 새로운 아이콘 패키지를 가져오거나 추가하지 마세요. 모든 자산은 Figma에서 전달된 데이터(payload) 안에 있어야 합니다.
- **중요**: `localhost` 소스가 제공된 경우, placeholder(임시 이미지)를 사용하거나 생성하지 마세요.

---

# Tech Spec

`./package.json` 파일에서 dependencies를 확인해주세요.

### 사용된 기술 스택

- **개발 프레임워크**: `React 19.1.0`, `Vite 7.0.4`
- **스타일링 도구**: `Tailwind CSS 4.1.11`, `@tailwindcss/vite`
- **라우팅**: `React Router DOM 7.7.0`
- **API 통신**: `Axios 1.11.0`
- **타입 지원**: `@types/react`, `@types/react-dom`
- typescript 사용금지, javascript만 사용하세요

### 개발 도구

- `ESLint`, `Prettier` (코드 품질 관리)
- `@vitejs/plugin-react` (Vite에서 React 지원)

---

# Directory Architecture

- **파일 구조는 현재 만들어진 디렉토리 구조를 최대한 유지하며 개발해 주세요.**

---

# Implement

- 각 페이지는 `src/app` 디렉토리 내의 `[pageName]` 디렉토리로 관리됩니다.
- 페이지를 구현할 경우, 반드시 디렉토리 아키텍처 규칙을 따르세요.
- 필요한 데이터가 있다면 **모델(model)과 API를 직접 선언**하세요.  
  → Figma 디자인을 참고해, 어떤 데이터가 필요한지 스스로 판단하여 결정합니다.
- 버튼, 입력창(input), SearchBar 등 **자주 재사용될 컴포넌트**는 `common` 디렉토리에 유연하게 구현해 주세요.

---

# Avoid Pattern

- **150줄을 초과하는 컴포넌트 파일**은 내부 hooks 또는 서브 컴포넌트로 분리하세요.
- `React.[모듈]` 방식은 사용하지 마세요.  
  예: `React.useState` ❌ → `import { useState } from 'react'` ✔️
- **인라인 함수** 사용은 지양하고, 핸들러 함수로 분리하세요.
  - 네이밍 규칙: `handle` + 대상(Target) + 이벤트명(EventName)  
    예: `handleCTAButtonClick`, `handleAgeInputChange`
- **인라인 스타일(css)**은 사용하지 마세요.  
  예: `<div style={{ color: 'red' }}>` ❌ → Tailwind 클래스 기반 스타일링 사용 ✔️
- 에셋(아이콘 등)이 필요할 경우, **Figma에서 SVG 코드로 복사해서 사용**하세요.  
  → 직접 `.svg` 파일을 만들지 말고, SVG 컴포넌트로 변환하여 사용합니다.
- **Tailwind에서 `relative`, `absolute`**는 가급적 피하고, `flex` 또는 `grid`를 사용하세요.
- **margin/padding**은 최소화하고, 대신 `gap` 속성 또는 `h-{}`가 적용된 빈 `div`로 간격을 조절하세요.

---

💡 위 규칙들을 지키면 유지보수성과 협업 효율이 크게 향상됩니다.

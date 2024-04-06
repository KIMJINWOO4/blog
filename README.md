# blog

`blog`는 개인 블로그 프로젝트로, Next.js 및 MDX를 활용하여 구축되었습니다. 

본 프로젝트는 마크다운 파일을 통해 콘텐츠를 관리하며, `@contentlayer/core`와 같은 도구를 사용해 정적 사이트 생성을 최적화합니다.

## 기능

- **MDX 파싱**: `@next/mdx`와 `next-mdx-remote`를 사용하여 MDX 파일에서 React 컴포넌트를 사용할 수 있습니다.
- **스타일링**: `@tailwindcss/typography`와 `tailwindcss`를 통해 예쁘고 읽기 쉬운 블로그 디자인을 제공합니다.
- **코드 하이라이팅**: `rehype-highlight`와 `react-syntax-highlighter`를 사용하여 코드 블록에 하이라이팅을 적용합니다.
- **애니메이션**: `framer-motion`을 이용하여 페이지 및 컴포넌트 전환에 부드러운 애니메이션을 추가합니다.
- **SEO 최적화**: 정적 사이트 생성과 `contentlayer`를 활용하여 빠르고 효율적인 페이지 로딩 속도를 제공합니다.


## 배포
이 프로젝트는 [Netlify](http://netlify.com)를 통해 배포되었습니다.

자세한 배포 과정은 Netlify의 공식 문서를 참고하세요.

## 프로젝트 링크

블로그는 여기에서 확인할 수 있습니다.

[김진우의 블로그](https://ak-47.netlify.app)

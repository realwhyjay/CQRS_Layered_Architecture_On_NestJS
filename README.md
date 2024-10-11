# CQRS_Layered_Architecture_On_NestJS

## Description

[NestJS Layered Architecture에 CQRS 패턴 적용하기!](https://velog.io/@realwhyjay/NestJS-Layered-Architecture%EC%97%90-CQRS-%ED%8C%A8%ED%84%B4-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0) 포스팅의 예시 코드입니다.

## Installation

```bash
$ yarn
```

## Running the app

1. 로컬에 DB를 하나 생성합니다
2. `.env-example`을 참고하여 생성한 DB 정보를 입력한 `.env` 파일을 해당 디렉토리에 생성합니다
3. 아래의 명령어를 사용하여 프로젝트의 entity를 기반으로 table을 생성합니다

```bash
$ yarn migrate:run:local
```

4. 아래의 명령어로 앱을 실행합니다

```bash
$ yarn run start
```

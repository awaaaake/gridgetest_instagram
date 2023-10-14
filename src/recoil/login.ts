// Recoil 사용 예제 보기
// https://blog.rhostem.com/posts/2021-11-24-recoil-writable-selector
// https://velog.io/@2ast/React-Recoil%EC%9D%98-atomFamily%EC%99%80-selectorFamily-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0
// https://velog.io/@2ast/React-Recoil-selector%EB%A1%9C-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94%EC%97%90-%EA%B8%B0%EC%97%AC%ED%95%98%EA%B8%B0

import { atom, selector } from "recoil"; //로그인한 유저의 상태 관리

const userState = atom({
  key: "userState",
  default: {
    loginId: "",
    jwt: "",
  },
});

export const idState = selector({
  key: "idState",
  get: ({ get }) => get(userState).loginId,
  set: ({ get, set }, loginId) => set(userState, { ...get(userState), loginId }),
});

export const jwtState = selector({
  key: "jwtState",
  get: ({ get }) => get(userState).jwt,
  set: ({ get, set }, jwt) => set(userState, { ...get(userState), jwt }),
});

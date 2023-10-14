// authState.js
import { atom } from 'recoil';

// 카카오 로그인 access_token를 저장할 Recoil 상태
export const kakaoLoginCodeState = atom({
  key: 'kakaoLoginCodeState',
  default: '',
});
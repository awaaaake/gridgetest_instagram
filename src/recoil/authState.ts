// authState.js
import { atom } from 'recoil';

// īī�� �α��� access_token�� ������ Recoil ����
export const kakaoLoginCodeState = atom({
  key: 'kakaoLoginCodeState',
  default: '',
});
// userDataState.ts
import { atom } from "recoil";  //ȸ�����Խ� �������� ����

export const userDataState = atom({
  key: "userDataState",
  default: {
    username: "",
    password: "",
    userid: "",
    birthDate: "",
    usercontact: "",
  },
});
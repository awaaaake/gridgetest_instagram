// userDataState.ts
import { atom } from "recoil";  //회원가입시 유저정보 저장

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
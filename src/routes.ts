import React from "react";

const Home = React.lazy(() => import("./pages/home/index"));
const Login = React.lazy(() => import("./pages/login/index"));
const KaKaoLogin = React.lazy(() => import("./pages/login/kakaologin"));
const Signup = React.lazy(() => import("./pages/signup/Signup"));
const Step1 = React.lazy(() => import("./pages/signup/Step1"));
const Step2 = React.lazy(() => import("./pages/signup/Step2"));
const Step3 = React.lazy(() => import("./pages/signup/Step3"));
const Pay = React.lazy(() => import("./pages/payment/index"));
const Page404 = React.lazy(() => import("./pages/page404/Page404"));
const Page500 = React.lazy(() => import("./pages/page500/Page500"));

const routes = [
  { path: "/login", element: Login },
  { path: "/login/kakao", element: KaKaoLogin },
  { path: "/signup", element: Signup},
  { path: "/signup/step1", element: Step1},
  { path: "/signup/step2", element: Step2},
  { path: "/signup/step3", element: Step3},
  { path: "/pay", element: Pay},
  { path: "/", element: Home },
  { path: "/404", element: Page404 },
  { path: "/500", element: Page500 },
];

export default routes;

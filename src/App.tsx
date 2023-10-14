import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Modal from 'react-modal';

const loading = <div>화면을 불러오는 중 입니다.</div>;

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./pages/login/index"));
const KaKaoLogin = React.lazy(() => import("./pages/login/kakaologin"));
const Signup = React.lazy(() => import("./pages/signup/Signup"));
const Step1 = React.lazy(() => import("./pages/signup/Step1"));
const Step2 = React.lazy(() => import("./pages/signup/Step2"));
const Step3 = React.lazy(() => import("./pages/signup/Step3"));
const Pay = React.lazy(() => import("./pages/payment/index"));
const Page404 = React.lazy(() => import("./pages/page404/Page404"));
const Page500 = React.lazy(() => import("./pages/page500/Page500"));

//컴포넌트
const App = () => {
   // 모달을 #root 엘리먼트에 연결
   Modal.setAppElement('#root');
   
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login/kakao" element={<KaKaoLogin />} />
          <Route path="/signup" element={<Signup />}>
            <Route path='step1' element={<Step1 />} />
            <Route path='step2' element={<Step2 />} />
            <Route path='step3' element={<Step3 />} />
          </Route>
          <Route path="/pay" element={<Pay />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="/*" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

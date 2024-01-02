import "./App.css";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./Pages/Main/Main";
import { Customer } from "./Pages/Customer/Customer";
import { Category } from "./Pages/Categories/Category";
import { Sales } from "./Pages/Sales/Sales";
import { ChooseRole } from "./Pages/SignUp/ChooseRole";
import { SignUp } from "./Pages/SignUp/SignUp";
import { Payment } from "./Pages/Payment/Payment";
import { MyPage } from "./Pages/MyPage/MyPage";
import { SellerMyPage } from "./Pages/Seller/SellerMyPage";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import { LoginPage } from "./Auth/LoginPage";
import Review from "./Pages/Review/Review";
import { MypageEdit } from "./Pages/MyPage/MypageEdit";
import { Search } from "./Pages/Search/Search";
import { Basket } from "./Pages/Item/ShowItem";
import { CusMyPage } from "./Pages/CusMyPage/CusMyPage";
import { LoginSuccess } from "./Auth/LoginSuccess";
import { DeleteSuccess } from "./Auth/DeleteSuccess";
const App = () => {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Category/:itemName" element={<Category />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/buy/:id" element={<Customer />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/Basket" element={<Basket />} />
            <Route path="/seller-my-page" element={<SellerMyPage />} />
            <Route path="/review-write" element={<Review />} />
            <Route path="/loginPage" element={<LoginPage />} />
            <Route path="/login-success" element={<LoginSuccess />} />
            <Route path="/signup-choose-role" element={<ChooseRole />} />
            <Route path="/signup/:role" element={<SignUp />} />
            <Route path="/cusMyPage" element={<CusMyPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage-edit" element={<MypageEdit />} />
            <Route path="/search/:word" element={<Search />} />
            <Route path="/delete-success" element={<DeleteSuccess />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
      <Footer />
    </>
  );
};

export default App;

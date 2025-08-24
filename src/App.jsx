import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import { Login } from './page/Login';
import { Layout } from './components/layouts/Layout';
import ChatPage from './page/ChatPage';
import AddFarm from './page/AddFarm';
import PlantDetail from './page/PlantDetail';
import { Community } from './page/Community';
import { Signup } from './page/Signup';
import { MyPage } from './page/MyPage';
import CommunityWrite from './page/CommunityWrite';
import AddInfo from './page/AddInfo';
import SignupInfo from './page/SignupInfo';
import CommunityDetail from './page/CommunityDetail';
import SettingPage from './page/Setting';
import MyAllFarms from './page/MyAllFarms';
import MyAllCommunity from './page/MyAllCommunity';
import CreditPage from './page/CreditPage';
import CoinChargePage from './page/CoinChargePage';
import HomeSearchResult from './page/HomeSearchResult';
import { CoinProvider } from './contexts/CoinContext';
import MyAllReviews from './page/MyAllReviews';

const App = () => {
  return (
    <CoinProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="search" element={<HomeSearchResult />} />
            <Route path="addfarm" element={<AddFarm />} />
            <Route path="farm/:id" element={<PlantDetail />} />
            <Route path="plant/:id" element={<PlantDetail />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/write" element={<CommunityWrite />} />
            <Route path="/community/:id" element={<CommunityDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/my-all-farms" element={<MyAllFarms />} />
            <Route path="/my-all-community" element={<MyAllCommunity />} />
            <Route path="/addinfo" element={<AddInfo />} />
            <Route path="/signupinfo" element={<SignupInfo />} />
            <Route path="/credit" element={<CreditPage />} />
            <Route path="/coin-charge" element={<CoinChargePage />} />
            <Route path="/my-all-reviews" element={<MyAllReviews />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CoinProvider>
  );
};

export default App;

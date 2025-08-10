import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import { Login } from './page/Login';
import { Layout } from './components/layouts/Layout';
import { ChatPage } from './page/ChatPage';
import AddFarm from './page/AddFarm';
import PlantDetail from './page/PlantDetail';
import { Community } from './page/Community';
import { Signup } from './page/Signup';
import {MyPage} from './page/MyPage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="addfarm" element={<AddFarm />} />
          <Route path="plant/:id" element={<PlantDetail />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

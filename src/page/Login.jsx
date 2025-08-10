import kakaoLogo from '../assets/kakao-icon.svg';
import { useNavigate } from 'react-router-dom';
import SpaceFarm from '../assets/SpaceFarm.svg';
import { useState } from 'react';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 일반로그인 
  const handleNormalLogin = async (e) => {
    e.preventDefault();
    alert(`이메일: ${email}\n비밀번호: ${password}`);
  };

  // 카카오 소셜 로그인 백엔드 엔드포인트
  const backendKakaoURL = '/oauth2/authorization/kakao';

  const handleLogin = () => {
    window.location.href = backendKakaoURL;
  };

  // 스페이스팜 버튼 클릭 시 home으로 이동
  const handleTitleClick = () => {
    navigate('/home');
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen flex-1 bg-white ">
      <img
        src={SpaceFarm}
        alt="로고"
        className="h-10 w-auto cursor-pointer"
        onClick={handleTitleClick}
      />
      <h1
        className="text-green-600 text-2xl font-semibold text-center mb-8 cursor-pointer"
        onClick={handleTitleClick}
      >
        SpaceFarm
      </h1>

      <form
        onSubmit={handleNormalLogin}
        className="flex flex-col gap-2 w-[280px] mt-8"
      >
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition cursor-pointer"
        >
          로그인
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="bg-gray-200 text-black py-2 rounded hover:bg-gray-300 transition cursor-pointer mb-2"
        >
          회원가입
        </button>
      </form>

      <button
        onClick={handleLogin}
        className="flex items-center justify-center gap-2 w-[280px] py-3 cursor-pointer rounded-md bg-[#FEE500] text-[#191919] hover:opacity-90 transition mt-10"
      >
        <img src={kakaoLogo} alt="kakao" className="w-6 h-6" />
        <span className="text-base font-semibold">카카오톡으로 간편로그인</span>
      </button>
    </main>
  );
};

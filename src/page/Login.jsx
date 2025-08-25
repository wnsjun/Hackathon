import { useNavigate } from 'react-router-dom';
import SpaceFarm from '../assets/SpaceFarm.svg?url';
import { useState } from 'react';
import { useLogin } from '../hooks/useAuth';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useLogin();

  const handleNormalLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('userData', JSON.stringify(data));
        },
        onError: () => {
          alert('로그인 실패! 이메일과 비밀번호를 확인하세요.');
        },
      }
    );
  };

  // 로고 클릭 시 홈으로
  const handleTitleClick = () => {
    navigate('/home');
  };

  return (
    <main className="flex flex-col items-center justify-center pt-50 flex-1 bg-white">
      <img
        src={SpaceFarm}
        alt="로고"
        className="h-40 w-40 cursor-pointer"
        onClick={handleTitleClick}
      />
      <h1
        className="text-green-600 text-[48px] font-semibold text-center mb-8 cursor-pointer"
        onClick={handleTitleClick}
      >
        SpaceFarm
      </h1>
      <p className="pt-6 text-center text-[16px] leading-[150%] tracking-[-0.48px] font-[400] text-[#111]">
        버려진 옥상, 마당, 자투리 공간을{' '}
        <span className="font-[600]">나만의 텃밭</span>으로.
      </p>
      <p className="text-center text-[16px] leading-[150%] tracking-[-0.48px] font-[400] text-[#111]">
        공간을 나누고, 초록을 가꾸며 도시 속 자연을 되찾아요.
      </p>

      <form
        onSubmit={handleNormalLogin}
        className="flex flex-col pt-8 gap-4 w-[280px] mt-8"
      >
        {/* 이메일 입력 */}
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-gray-400 px-1 py-2 focus:outline-none focus:border-green-600"
          required
        />

        {/* 비밀번호 입력 */}
        <div className="flex pt-4 flex-col">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b border-gray-400 px-1 py-2 focus:outline-none focus:border-green-600"
            required
          />
          <span className="text-xs pt-2 text-gray-500 mt-1">
            영문, 숫자 포함 8자 이상
          </span>
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={!email || password.length < 8 || loginMutation.isPending}
          className={`h-[62px] flex px-5 flex-col justify-center items-center gap-2 rounded-md transition mt-4 
    ${
      !email || password.length < 8
        ? 'bg-[#F7F7F7] text-gray-400 cursor-not-allowed'
        : 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
    }`}
        >
          {loginMutation.isPending ? '로그인 중...' : '로그인 하기'}
        </button>

        {/* 회원가입 버튼 */}
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="text-[#777] underline text-center text-[16px] mb-50 leading-[150%] tracking-[-0.48px] font-[400] bg-transparent hover:text-gray-600 cursor-pointer mt-4"
        >
          회원가입 하기
        </button>
      </form>
    </main>
  );
};

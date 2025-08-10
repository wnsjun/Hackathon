import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate();

  // 입력값 상태
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [isAuthSent, setIsAuthSent] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [account, setAccount] = useState('');

  // 인증번호 발송
  const handleSendAuthCode = () => {
    // 실제로는 이메일로 인증번호 발송 API 호출 필요
    alert('인증번호가 발송되었습니다.');
    setIsAuthSent(true);
  };

  //비밀번호 일치여부 검사
  const isPasswordMatch = password === passwordCheck || passwordCheck === '';

  // 회원가입 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 회원가입 API 호출 필요
    alert('회원가입이 완료되었습니다!');
    navigate('/login');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-8">회원가입</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-[320px] bg-gray-50 p-6 rounded shadow"
      >
        {/* 이메일 + 인증번호 받기 */}
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="이메일(ID)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
            required
          />
          <button
            type="button"
            onClick={handleSendAuthCode}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition cursor-pointer"
          >
            인증번호 받기
          </button>
        </div>
        {/* 인증번호 입력 */}
        {isAuthSent && (
          <input
            type="text"
            placeholder="인증번호 입력"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
        )}
        {/* 비밀번호 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        {/* 비밀번호 확인 */}
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        {!isPasswordMatch && (
          <div className="text-red-500 text-sm mb-2">비밀번호가 일치하지 않습니다.</div>
        )}
        {/* 이름 */}
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        {/* 연락처 */}
        <input
          type="tel"
          placeholder="연락처"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        {/* 닉네임 */}
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        {/* 계좌등록(선택) */}
        <input
          type="text"
          placeholder="계좌등록 (선택)"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mt-2 cursor-pointer"
        >
          회원가입
        </button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-gray-500 underline mt-1 cursor-pointer"
        >
          로그인으로 돌아가기
        </button>
      </form>
    </main>
  );
};

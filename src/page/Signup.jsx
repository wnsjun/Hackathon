import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checkIcon from '../assets/check.svg?url';
import Button from '../components/common/Button';

export const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const isPasswordLengthValid = password.length >= 8;
  const isPasswordMatch = password === passwordCheck && isPasswordLengthValid;

  const labelStyle = {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '150%',
    letterSpacing: '-0.48px',
  };
  const starStyle = {
    color: '#FF3232',
    fontFamily: 'Pretendard',
    fontSize: '16px',
  };
  const infoTextBaseStyle = {
    fontFamily: 'Pretendard',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '150%',
  };
  const checkIconStyle = {
    width: '16px',
    height: '16px',
    aspectRatio: '1 / 1',
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
  };
  const inputWrapperStyle = { position: 'relative' };

  const handleNext = (e) => {
    e.preventDefault();
    if (!isPasswordMatch) {
      alert('비밀번호가 일치하지 않거나 8자 이상이 아닙니다.');
      return;
    }
    navigate('/signupinfo', { state: { email, password } });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-2xl mt-[267px] font-bold mb-6">회원가입 하기</h1>
      <form onSubmit={handleNext} className="flex flex-col gap-6 w-[320px]">
        <div style={inputWrapperStyle}>
          <label
            htmlFor="email"
            className="block mb-1 mt-12 select-none"
            style={labelStyle}
          >
            이메일<span style={starStyle}>*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-2 border-b border-gray-300 focus:outline-none focus:border-gray-500 py-2"
            required
          />
          {email.trim() !== '' && (
            <img src={checkIcon} alt="check" style={checkIconStyle} />
          )}
        </div>

        <div style={inputWrapperStyle}>
          <label
            htmlFor="password"
            className="block mb-1 pt-8 select-none"
            style={labelStyle}
          >
            비밀번호<span style={starStyle}>*</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-2 border-b border-gray-300 focus:outline-none focus:border-gray-500 py-2"
            required
          />
          {isPasswordLengthValid && (
            <img src={checkIcon} alt="check" style={checkIconStyle} />
          )}
          <p
            className="mt-1 pl-2 select-none"
            style={{
              ...infoTextBaseStyle,
              color: isPasswordLengthValid ? '#1AA752' : '#6B7280',
            }}
          >
            영문, 숫자 포함 8자 이상
          </p>
        </div>

        <div style={inputWrapperStyle}>
          <input
            id="passwordCheck"
            type="password"
            placeholder="비밀번호를 재입력하세요"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            className="w-full pl-2 pt-8 border-b border-gray-300 focus:outline-none focus:border-gray-500 py-2"
            required
          />
          {passwordCheck.trim() !== '' && isPasswordMatch && (
            <img src={checkIcon} alt="check" style={checkIconStyle} />
          )}
        </div>

        {passwordCheck && (
          <div
            className="select-none"
            style={{
              color: isPasswordMatch ? '#1AA752' : '#FF3232',
              ...infoTextBaseStyle,
            }}
          >
            {isPasswordMatch
              ? '비밀번호가 일치해요.'
              : '비밀번호가 일치하지 않아요.'}
          </div>
        )}

        <Button
          color="next"
          type="submit"
          className="mt-8 mb-[267px]"
          disabled={!isPasswordMatch}
        >
          다음
        </Button>
      </form>
    </main>
  );
};

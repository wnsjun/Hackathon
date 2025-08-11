import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignupInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state || {};

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  // 전화번호 숫자만 입력 처리
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone(value);
  };

  // 계좌번호 숫자만 입력 처리
  const handleAccountNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAccountNumber(value);
  };

  const labelStyle = {
    color: 'var(--500, #111)',
    fontFamily: 'Pretendard',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '150%',
    letterSpacing: '-0.48px',
    fontStyle: 'normal',
  };

  const starStyle = {
    color: 'var(--Error, #FF3232)',
    fontFamily: 'Pretendard',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '150%',
    letterSpacing: '-0.48px',
    fontStyle: 'normal',
  };

  const inputStyle =
    'w-full border-b border-gray-300 focus:outline-none focus:border-green-600 py-2 placeholder:text-[var(--300,#BBB)] placeholder:text-base';

  const infoTextStyle = {
    color: 'var(--400, #777)',
    fontFamily: 'Pretendard',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '150%', // 18px
    letterSpacing: '-0.36px',
    fontStyle: 'normal',
  };

  // 필수 3개 입력 확인
  const isRequiredFilled =
    name.trim() !== '' && phone.trim() !== '' && nickname.trim() !== '';

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-2xl font-bold mb-6">회원가입 하기</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isRequiredFilled) return;
          navigate('/addinfo', {
            state: {
              email,
              password,
              name,
              phone,
              nickname,
              bank,
              accountNumber,
            },
          });
        }}
        className="flex flex-col gap-6 w-[320px]"
      >
        {/* 이름 */}
        <div>
          <label
            htmlFor="name"
            style={labelStyle}
            className="block mb-1 select-none"
          >
            이름
            <span style={starStyle}>*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputStyle}
            required
          />
        </div>

        {/* 연락처 */}
        <div>
          <label
            htmlFor="phone"
            style={labelStyle}
            className="block mb-1 select-none"
          >
            연락처
            <span style={starStyle}>*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="숫자만 입력하세요"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={11}
            className={inputStyle}
            required
          />
        </div>

        {/* 닉네임 */}
        <div>
          <label
            htmlFor="nickname"
            style={labelStyle}
            className="block mb-1 select-none"
          >
            닉네임
            <span style={starStyle}>*</span>
          </label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className={inputStyle}
            required
          />
        </div>

        {/* 은행 선택 + 계좌번호 */}
        <div>
          <label style={labelStyle} className="block mb-1 select-none">
            계좌등록
          </label>
          <div className="flex gap-2 items-center">
            <select
              id="bank"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-[120px] border-b border-gray-300 focus:outline-none focus:border-green-600 py-2 bg-white"
            >
              <option value="">은행</option>
              <option value="국민은행">국민은행</option>
              <option value="신한은행">신한은행</option>
              <option value="하나은행">하나은행</option>
              <option value="우리은행">우리은행</option>
              <option value="기업은행">기업은행</option>
            </select>
            <input
              id="accountNumber"
              type="text"
              placeholder="계좌번호를 입력하세요"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              maxLength={20}
              className="flex-grow border-b border-gray-300 focus:outline-none focus:border-green-600 py-2 placeholder:text-[var(--300,#BBB)] placeholder:text-base"
            />
          </div>
          <p style={infoTextStyle} className="mt-1 select-none">
            가입 후 마이페이지에서 등록할 수 있어요.
          </p>
        </div>

        {/* 버튼 */}
        <button
          type="submit"
          disabled={!isRequiredFilled}
          className="mt-4"
          style={{
            display: 'flex',
            height: '62px',
            padding: '10px 20px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            alignSelf: 'stretch',
            borderRadius: '8px',
            background: !isRequiredFilled ? '#F7F7F7' : 'var(--Main, #1AA752)',
            color: !isRequiredFilled ? '#BBB' : 'var(--100, #FFF)',
            textAlign: 'center',
            fontFamily: 'Pretendard',
            fontSize: '20px',
            fontWeight: 600,
            fontStyle: 'normal',
            lineHeight: '150%',
            letterSpacing: '-0.6px',
            cursor: !isRequiredFilled ? 'not-allowed' : 'pointer',
          }}
        >
          다음
        </button>
      </form>
    </main>
  );
};

export default SignupInfo;

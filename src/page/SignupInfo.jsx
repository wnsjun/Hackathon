import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/common/Button';
import { useSignup1 } from '../hooks/useAuth';

const SignupInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state || {};

  // 디버깅을 위한 로그
  console.log('Location state:', location.state);
  console.log('Email:', email, 'Password:', password);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const signup1Mutation = useSignup1();

  const banks = ['국민은행', '신한은행', '하나은행', '우리은행', '기업은행'];

  // 전화번호: 숫자 + 하이픈 허용
  const handlePhoneChange = (e) =>
    setPhone(e.target.value.replace(/[^0-9\-]/g, ''));

  // 계좌번호: 숫자 + 하이픈 허용 (변경됨)
  const handleAccountNumberChange = (e) =>
    setAccountNumber(e.target.value.replace(/[^0-9\-]/g, ''));

  const isRequiredFilled = name && phone && nickname && bank && accountNumber;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isRequiredFilled) return;

    // API 명세에 맞는 payload
    const payload = {
      email,
      password,
      confirmPassword: password,
      name,
      phone,
      nickname,
      bank,
      accountNumber,
    };

    console.log('Signup1 payload:', payload);

    signup1Mutation.mutate(payload, {
      onSuccess: () =>
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
        }),
    });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-2xl pt-14 font-bold mb-6">회원가입 하기</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[320px]">
        {/* 이름 */}
        <div>
          <label className="block mb-1 select-none">
            이름<span className="text-red-500">*</span>
          </label>
          <input
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-b py-2"
            required
          />
        </div>

        {/* 연락처 */}
        <div>
          <label className="block mb-1 select-none">
            연락처<span className="text-red-500">*</span>
          </label>
          <input
            placeholder="010-1234-5678"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={13}
            className="w-full border-b py-2"
            required
          />
        </div>

        {/* 닉네임 */}
        <div>
          <label className="block mb-1 select-none">
            닉네임<span className="text-red-500">*</span>
          </label>
          <input
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full border-b py-2"
            required
          />
        </div>

        {/* 은행/계좌 */}
        <div>
          <label className="block mb-1 select-none">
            계좌등록<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="border-b py-2 px-2 w-24"
            >
              <option value="" hidden>
                은행
              </option>
              {banks.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <input
              placeholder="계좌번호 (예: 123-456-789012)"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              maxLength={20}
              className="flex-grow border-b py-2 px-2"
            />
          </div>
        </div>

        {signup1Mutation.isError && (
          <div className="text-red-600 mt-2">
            {signup1Mutation.error?.response?.data?.message ||
              '회원가입 1단계 실패!'}
          </div>
        )}

        <Button
          type="submit"
          color="next"
          disabled={!isRequiredFilled}
          className="mt-8 mb-[267px]"
        >
          다음
        </Button>
      </form>
    </main>
  );
};

export default SignupInfo;

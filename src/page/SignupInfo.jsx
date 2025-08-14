// import { useLocation, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import Button from '../components/common/Button';
// import { useSignup1 } from '../hooks/useAuth';

// const SignupInfo = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { email, password } = location.state || {};

//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [nickname, setNickname] = useState('');
//   const [bank, setBank] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');

//   const banks = ['국민은행', '신한은행', '하나은행', '우리은행', '기업은행'];

//   const signup1Mutation = useSignup1();

//   const handlePhoneChange = (e) => {
//     const value = e.target.value.replace(/[^0-9]/g, '');
//     setPhone(value);
//   };

//   const handleAccountNumberChange = (e) => {
//     const value = e.target.value.replace(/[^0-9]/g, '');
//     setAccountNumber(value);
//   };

//   const labelStyle = {
//     color: 'var(--500, #111)',
//     fontFamily: 'Pretendard',
//     fontSize: '16px',
//     fontWeight: 400,
//     lineHeight: '150%',
//     letterSpacing: '-0.48px',
//     fontStyle: 'normal',
//   };

//   const starStyle = {
//     color: 'var(--Error, #FF3232)',
//     fontFamily: 'Pretendard',
//     fontSize: '16px',
//     fontWeight: 400,
//     lineHeight: '150%',
//     letterSpacing: '-0.48px',
//     fontStyle: 'normal',
//   };

//   const inputStyle =
//     'pl-2 w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 py-2 placeholder:text-[var(--300,#BBB)] placeholder:text-base';

//   const infoTextStyle = {
//     color: 'var(--400, #777)',
//     fontFamily: 'Pretendard',
//     fontSize: '12px',
//     fontWeight: 400,
//     lineHeight: '150%',
//     letterSpacing: '-0.36px',
//     fontStyle: 'normal',
//   };

//   const isRequiredFilled =
//     name.trim() &&
//     phone.trim() &&
//     nickname.trim() &&
//     bank.trim() &&
//     accountNumber.trim();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!isRequiredFilled) return;

//     const payload = {
//       email,
//       password,
//       confirmPassword: password,
//       name,
//       phone,
//       nickname,
//       account: {
//         bank,
//         accountNumber,
//       },
//     };

//     signup1Mutation.mutate(payload, {
//       onSuccess: () => {
//         navigate('/addinfo', {
//           state: {
//             email,
//             password,
//             name,
//             phone,
//             nickname,
//             bank,
//             accountNumber,
//           },
//         });
//       },
//     });
//   };

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
//       <h1 className="text-2xl pt-14 font-bold mb-6">회원가입 하기</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[320px]">
//         {/* 이름 */}
//         <div>
//           <label
//             htmlFor="name"
//             style={labelStyle}
//             className="block mb-1 select-none"
//           >
//             이름<span style={starStyle}>*</span>
//           </label>
//           <input
//             id="name"
//             type="text"
//             placeholder="이름을 입력하세요"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className={inputStyle}
//             required
//           />
//         </div>

//         {/* 연락처 */}
//         <div>
//           <label
//             htmlFor="phone"
//             style={labelStyle}
//             className="block mb-1 select-none"
//           >
//             연락처<span style={starStyle}>*</span>
//           </label>
//           <input
//             id="phone"
//             type="tel"
//             placeholder="숫자만 입력하세요"
//             value={phone}
//             onChange={handlePhoneChange}
//             maxLength={11}
//             className={inputStyle}
//             required
//           />
//         </div>

//         {/* 닉네임 */}
//         <div>
//           <label
//             htmlFor="nickname"
//             style={labelStyle}
//             className="block mb-1 select-none"
//           >
//             닉네임<span style={starStyle}>*</span>
//           </label>
//           <input
//             id="nickname"
//             type="text"
//             placeholder="닉네임을 입력하세요"
//             value={nickname}
//             onChange={(e) => setNickname(e.target.value)}
//             className={inputStyle}
//             required
//           />
//         </div>

//         {/* 은행 + 계좌번호 */}
//         <div>
//           <label style={labelStyle} className="block mb-1 select-none">
//             계좌등록<span style={starStyle}>*</span>
//           </label>
//           <div className="flex gap-2 items-center">
//             <div style={{ position: 'relative', flexShrink: 0 }}>
//               <select
//                 id="bank"
//                 value={bank}
//                 onChange={(e) => setBank(e.target.value)}
//                 style={{
//                   display: 'flex',
//                   height: '48px',
//                   padding: '8px',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   gap: '8px',
//                   borderBottom: '1px solid var(--300, #BBB)',
//                   color: bank ? 'var(--500, #111)' : 'var(--300, #BBB)',
//                   fontFamily: 'Pretendard',
//                   fontSize: '16px',
//                   fontWeight: 400,
//                   lineHeight: '150%',
//                   letterSpacing: '-0.48px',
//                   backgroundColor: 'white',
//                   appearance: 'none',
//                   paddingRight: '32px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 <option value="" disabled hidden>
//                   은행
//                 </option>
//                 {banks.map((b) => (
//                   <option key={b} value={b}>
//                     {b}
//                   </option>
//                 ))}
//               </select>
//               <span
//                 style={{
//                   position: 'absolute',
//                   right: '8px',
//                   top: '50%',
//                   transform: 'translateY(-50%)',
//                   pointerEvents: 'none',
//                   fontSize: '16px',
//                   color: 'var(--300, #BBB)',
//                 }}
//               >
//                 ▼
//               </span>
//             </div>
//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '16px',
//                 alignSelf: 'stretch',
//                 flexGrow: 1,
//                 borderBottom: '1px solid var(--300, #BBB)',
//               }}
//             >
//               <input
//                 id="accountNumber"
//                 type="text"
//                 placeholder="계좌번호를 입력하세요"
//                 value={accountNumber}
//                 onChange={handleAccountNumberChange}
//                 maxLength={20}
//                 className="flex-grow py-2 placeholder:text-[var(--300,#BBB)] placeholder:text-base focus:outline-none"
//                 style={{
//                   fontFamily: 'Pretendard',
//                   fontSize: '16px',
//                   lineHeight: '150%',
//                 }}
//               />
//             </div>
//           </div>
//           <p style={infoTextStyle} className="mt-1 pl-2 select-none">
//             가입 후 마이페이지에서 등록할 수 있어요.
//           </p>
//         </div>

//         <Button
//           color="next"
//           type="submit"
//           className="mt-8 mb-[267px]"
//           disabled={!isRequiredFilled}
//         >
//           다음
//         </Button>
//       </form>
//     </main>
//   );
// };

// export default SignupInfo;
// UI는 위가 맞음 아래는 API 가 맞음

import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/common/Button';
import { useSignup1 } from '../hooks/useAuth';

const SignupInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state || {};

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
      phone: phone.includes('-')
        ? phone
        : phone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3'),
      nickname,
      bank,
      accountNumber, // 하이픈 있는 그대로 전송
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
                <option key={b}>{b}</option>
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

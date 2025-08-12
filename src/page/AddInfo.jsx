// import { useLocation, useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// const AddInfo = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const formData = location.state || {};

//   const [province, setProvince] = useState('');
//   const [city, setCity] = useState('');
//   const [district, setDistrict] = useState('');

//   const themes = [
//     { id: 'rooftop', label: '옥상', desc: '아파트 및 건물 옥상, 지붕 위 공간' },
//     {
//       id: 'emptyLot',
//       label: '공터',
//       desc: '건물 옆 자투리 공간, 쓰임 없는 부지',
//     },
//     {
//       id: 'flowerBed',
//       label: '화단',
//       desc: '아파트 단지 내 화단, 빌라 현관 앞 꽃밭',
//     },
//     { id: 'park', label: '공원', desc: '공원 내 공공 텃밭, 선책로 옆 잔디' },
//   ];

//   const [selectedThemes, setSelectedThemes] = useState([]);

//   const toggleTheme = (id) => {
//     setSelectedThemes((prev) =>
//       prev.includes(id) ? prev.filter((theme) => theme !== id) : [...prev, id]
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const finalData = { ...formData, province, city, district, selectedThemes };
//     console.log('회원가입 데이터:', finalData);
//     alert('회원가입이 완료되었습니다!');
//     navigate('/login');
//   };

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
//       <h1 className="text-xl font-bold mb-4">회원가입 - 3단계</h1>
//       <p className="text-center text-gray-700 mb-2">
//         맞춤형 텃밭을 제공하기 위해 기본 정보가 필요해요
//       </p>
//       <p className="text-center mb-6">텃밭을 찾고싶은 동네를 선택해주세요</p>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[320px]">
//         {/* 도/시군구/읍면동 한 줄 배치 */}
//         <div className="flex gap-2">
//           <select
//             value={province}
//             onChange={(e) => setProvince(e.target.value)}
//             className="border rounded px-3 py-2 flex-1"
//             required
//           >
//             <option value="">도 선택</option>
//             <option value="서울특별시">서울특별시</option>
//             <option value="경기도">경기도</option>
//             <option value="부산광역시">부산광역시</option>
//           </select>

//           <select
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="border rounded px-3 py-2 flex-1"
//             required
//           >
//             <option value="">시/군/구 선택</option>
//             <option value="강남구">강남구</option>
//             <option value="서초구">서초구</option>
//             <option value="수원시">수원시</option>
//           </select>

//           <select
//             value={district}
//             onChange={(e) => setDistrict(e.target.value)}
//             className="border rounded px-3 py-2 flex-1"
//             required
//           >
//             <option value="">읍/면/동 선택</option>
//             <option value="역삼동">역삼동</option>
//             <option value="삼성동">삼성동</option>
//             <option value="매탄동">매탄동</option>
//           </select>
//         </div>

//         {/* 안내 문구 */}
//         <p className="text-gray-500 text-sm">
//           가입 후 마이페이지에서 수정할 수 있어요.
//         </p>

//         {/* 관심 텃밭 테마 */}
//         <p className="font-bold mt-2">관심 텃밭 테마를 선택해주세요</p>
//         <div className="flex flex-col gap-3">
//           {themes.map((theme) => (
//             <label
//               key={theme.id}
//               className="flex items-center justify-between border-b pb-2 cursor-pointer"
//             >
//               <div className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedThemes.includes(theme.id)}
//                   onChange={() => toggleTheme(theme.id)}
//                   className="w-5 h-5 accent-green-600"
//                 />
//                 <span className="text-sm font-medium">{theme.label}</span>
//               </div>
//               <span
//                 className="text-[14px] font-normal"
//                 style={{
//                   color: 'var(--400, #777)',
//                   fontFamily: 'Pretendard',
//                   lineHeight: '150%',
//                   letterSpacing: '-0.42px',
//                   textAlign: 'right',
//                 }}
//               >
//                 {theme.desc}
//               </span>
//             </label>
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="bg-green-600 text-white py-2 rounded mt-4"
//         >
//           완료
//         </button>
//       </form>
//     </main>
//   );
// };

// export default AddInfo;

import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AddInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const themes = [
    { id: 'rooftop', label: '옥상', desc: '아파트 및 건물 옥상, 지붕 위 공간' },
    {
      id: 'emptyLot',
      label: '공터',
      desc: '건물 옆 자투리 공간, 쓰임 없는 부지',
    },
    {
      id: 'flowerBed',
      label: '화단',
      desc: '아파트 단지 내 화단, 빌라 현관 앞 꽃밭',
    },
    { id: 'park', label: '공원', desc: '공원 내 공공 텃밭, 선책로 옆 잔디' },
  ];

  const [selectedThemes, setSelectedThemes] = useState([]);

  const toggleTheme = (id) => {
    setSelectedThemes((prev) =>
      prev.includes(id) ? prev.filter((theme) => theme !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const {
      email = '',
      password = '',
      name = '',
      phone = '',
      nickname = '',
      bank = '',
      accountNumber = '',
    } = formData;

    // API 요청 바디 생성
    const requestBody = {
      email,
      password,
      confirmPassword: password, // confirmPassword 서버에서 요구함
      name,
      nickname,
      phone,
      bank,
      accountNumber,
      // province, city, district, selectedThemes는 회원가입 API 명세에 없으므로 제외
    };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // 가입 성공
        alert('회원가입이 완료되었습니다!');
        navigate('/login');
      } else {
        // 에러 처리
        const errorData = await response.json();
        // 서버에서 오는 메시지에 따라 변경하세요
        setErrorMsg(errorData.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      setErrorMsg('서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-xl font-bold mb-4">회원가입 - 3단계</h1>
      <p className="text-center text-gray-700 mb-2">
        맞춤형 텃밭을 제공하기 위해 기본 정보가 필요해요
      </p>
      <p className="text-center mb-6">텃밭을 찾고싶은 동네를 선택해주세요</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[320px]">
        {/* ... 기존 폼 UI 유지 ... */}

        <div className="flex gap-2">
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
            required
          >
            <option value="">도 선택</option>
            <option value="서울특별시">서울특별시</option>
            <option value="경기도">경기도</option>
            <option value="부산광역시">부산광역시</option>
          </select>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
            required
          >
            <option value="">시/군/구 선택</option>
            <option value="강남구">강남구</option>
            <option value="서초구">서초구</option>
            <option value="수원시">수원시</option>
          </select>

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
            required
          >
            <option value="">읍/면/동 선택</option>
            <option value="역삼동">역삼동</option>
            <option value="삼성동">삼성동</option>
            <option value="매탄동">매탄동</option>
          </select>
        </div>

        {/* 관심 텃밭 테마 */}
        <p className="font-bold mt-2">관심 텃밭 테마를 선택해주세요</p>
        <div className="flex flex-col gap-3">
          {themes.map((theme) => (
            <label
              key={theme.id}
              className="flex items-center justify-between border-b pb-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedThemes.includes(theme.id)}
                  onChange={() => toggleTheme(theme.id)}
                  className="w-5 h-5 accent-green-600"
                />
                <span className="text-sm font-medium">{theme.label}</span>
              </div>
              <span
                className="text-[14px] font-normal"
                style={{
                  color: 'var(--400, #777)',
                  fontFamily: 'Pretendard',
                  lineHeight: '150%',
                  letterSpacing: '-0.42px',
                  textAlign: 'right',
                }}
              >
                {theme.desc}
              </span>
            </label>
          ))}
        </div>

        {errorMsg && (
          <div className="text-red-600 mt-2 text-center">{errorMsg}</div>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded mt-4 disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? '가입 중...' : '완료'}
        </button>
      </form>
    </main>
  );
};

export default AddInfo;

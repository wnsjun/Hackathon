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
import CheckSquareContained from '../components/common/CheckSquareContained';

const dongList = [
  '공덕동',
  '아현동',
  '도화동',
  '용강동',
  '대흥동',
  '염리동',
  '신수동',
  '서강동',
  '서교동',
  '합정동',
  '망원제1동',
  '망원제2동',
  '연남동',
  '성산제1동',
  '성산제2동',
  '상암동',
];

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

const AddInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const [city, setCity] = useState('마포구'); // 시는 고정값으로 둠
  const [selectedDongs, setSelectedDongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedThemes, setSelectedThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleDong = (dong) => {
    setSelectedDongs((prev) =>
      prev.includes(dong) ? prev.filter((d) => d !== dong) : [...prev, dong]
    );
  };

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

    // 실제 API 요청 바디에 selectedDongs, selectedThemes 포함
    const requestBody = {
      email,
      password,
      confirmPassword: password,
      name,
      nickname,
      phone,
      bank,
      accountNumber,
      city,
      selectedDongs,
      selectedThemes,
    };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert('회원가입이 완료되었습니다!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        setErrorMsg(errorData.message || '회원가입에 실패했습니다.');
      }
    } catch {
      setErrorMsg('서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-xl font-bold mb-4">회원가입 하기</h1>
      <p className="text-center text-gray-700 mb-2">
        맞춤형 텃밭을 제공하기 위해 기본 정보가 필요해요
      </p>
      <p className="text-center mb-6">텃밭을 찾고싶은 동네를 선택해주세요</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[320px]">
        {/* 시 선택(고정) */}
        <div>
          <label className="block mb-1 font-medium">시/구 선택</label>
          <button
            type="button"
            className="w-full border rounded px-3 py-2 text-left flex justify-between items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <span>{city}</span>
            <span className="text-sm text-gray-500">
              {selectedDongs.length > 0
                ? selectedDongs.join(', ')
                : '동을 선택하세요'}
            </span>
          </button>
        </div>

        {/* 기존 선택 항목 중 시/구/동 셀렉트박스 삭제했으니 여기서 선택 완료 */}

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

      {/* 동 선택 모달 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded p-6 w-11/12 max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">동 선택</h2>

            <div className="flex gap-6 flex-wrap">
              {dongList.map((dong) => (
                <button
                  key={dong}
                  type="button"
                  onClick={() => toggleDong(dong)}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <CheckSquareContained
                    check={selectedDongs.includes(dong) ? 'on' : 'off'}
                  />
                  <span>{dong}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={() => setIsModalOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AddInfo;

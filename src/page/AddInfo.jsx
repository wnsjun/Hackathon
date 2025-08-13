// import { useLocation, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import CheckSquareContained from '../components/common/CheckSquareContained';

// const dongList = [
//   '공덕동',
//   '아현동',
//   '도화동',
//   '용강동',
//   '대흥동',
//   '염리동',
//   '신수동',
//   '서강동',
//   '서교동',
//   '합정동',
//   '망원제1동',
//   '망원제2동',
//   '연남동',
//   '성산제1동',
//   '성산제2동',
//   '상암동',
// ];

// const themes = [
//   { id: 'rooftop', label: '옥상', desc: '아파트 및 건물 옥상, 지붕 위 공간' },
//   {
//     id: 'emptyLot',
//     label: '공터',
//     desc: '건물 옆 자투리 공간, 쓰임 없는 부지',
//   },
//   {
//     id: 'flowerBed',
//     label: '화단',
//     desc: '아파트 단지 내 화단, 빌라 현관 앞 꽃밭',
//   },
//   { id: 'park', label: '공원', desc: '공원 내 공공 텃밭, 선책로 옆 잔디' },
// ];

// const themeApiMap = {
//   rooftop: 'ROOFTOP',
//   emptyLot: 'EMPTY_LOT',
//   flowerBed: 'FLOWER_BED',
//   park: 'PARK',
// };

// const AddInfo = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const formData = location.state || {};

//   const [city] = useState('마포구');
//   const [selectedDongs, setSelectedDongs] = useState([]);
//   const [selectedThemes, setSelectedThemes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [showDongList, setShowDongList] = useState(false);

//   const toggleDong = (dong) => {
//     setSelectedDongs((prev) =>
//       prev.includes(dong) ? prev.filter((d) => d !== dong) : [...prev, dong]
//     );
//   };

//   const toggleTheme = (id) => {
//     setSelectedThemes((prev) =>
//       prev.includes(id) ? prev.filter((theme) => theme !== id) : [...prev, id]
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');
//     setLoading(true);

//     const selectedDong = selectedDongs.length > 0 ? selectedDongs[0] : '';
//     const apiThemes = selectedThemes.map((id) => themeApiMap[id]);

//     const requestBody = {
//       address: { sido: '서울특별시', sigungu: city, dong: selectedDong },
//       themes: apiThemes,
//     };

//     try {
//       const response = await fetch('/api/auth/signup2', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody),
//       });

//       if (response.ok) {
//         alert('회원가입이 완료되었습니다!');
//         navigate('/login');
//       } else {
//         const errorData = await response.json();
//         setErrorMsg(errorData.message || '회원가입에 실패했습니다.');
//       }
//     } catch {
//       setErrorMsg('서버와 통신 중 오류가 발생했습니다.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
//       <h1 className="text-xl font-bold mb-4">회원가입 하기</h1>
//       <p className="text-center text-gray-700 mb-2">
//         맞춤형 텃밭을 제공하기 위해 기본 정보가 필요해요
//       </p>
//       <p className="text-center mb-6">텃밭을 찾고싶은 동네를 선택해주세요</p>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[320px]">
//         {/* 시/구 + 동 선택 같은 줄 */}
//         <div className="flex items-center gap-4">
//           {/* 시/구 */}
//           <div>
//             <div className="border rounded px-3 py-2">{city}</div>
//           </div>

//           {/* 동 선택 */}
//           <div className="relative flex-1">
//             <button
//               type="button"
//               onClick={() => setShowDongList((prev) => !prev)}
//               className="w-full border rounded px-3 py-2 flex justify-between items-center"
//             >
//               <span>
//                 {selectedDongs.length > 0
//                   ? selectedDongs.join(', ')
//                   : '동을 선택하세요'}
//               </span>
//               <span className="text-gray-500 text-sm">
//                 {showDongList ? '▲' : '▼'}
//               </span>
//             </button>

//             {/* 팝업형 드롭다운 */}
//             {showDongList && (
//               <div
//                 className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-50 p-3 flex flex-wrap gap-4"
//                 style={{ maxHeight: '200px', overflowY: 'auto' }}
//               >
//                 {dongList.map((dong) => (
//                   <button
//                     key={dong}
//                     type="button"
//                     onClick={() => toggleDong(dong)}
//                     className="flex items-center space-x-2 cursor-pointer"
//                   >
//                     <CheckSquareContained
//                       check={selectedDongs.includes(dong) ? 'on' : 'off'}
//                     />
//                     <span>{dong}</span>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

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

//         {errorMsg && (
//           <div className="text-red-600 mt-2 text-center">{errorMsg}</div>
//         )}

//         <button
//           type="submit"
//           className="bg-green-600 text-white py-2 rounded mt-4 disabled:bg-gray-300"
//           disabled={loading}
//         >
//           {loading ? '가입 중...' : '완료'}
//         </button>
//       </form>
//     </main>
//   );
// };

// export default AddInfo;

import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DongSelector from '../components/common/DongSelector';
import { useSignup2 } from '../hooks/useAuth'; // react-query 훅


// 테마 목록
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
  { id: 'park', label: '공원', desc: '공원 내 공공 텃밭, 산책로 옆 잔디' },
];

// API 전송용 테마 매핑
const themeApiMap = {
  rooftop: 'ROOFTOP',
  emptyLot: 'EMPTY_LOT',
  flowerBed: 'FLOWER_BED',
  park: 'PARK',
};

const CheckCircle = ({ checked = false, onChange }) => (
  <div className="relative w-6 h-6 cursor-pointer" onClick={onChange}>
    <div className={`w-6 h-6 rounded-full border-2 ${checked ? 'border-[#1aa752] bg-[#1aa752]' : 'border-[#bbbbbb] bg-white'} flex items-center justify-center`}>
      {checked && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="white"/>
        </svg>
      )}
    </div>
  </div>
);

const AddInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const [city] = useState('마포구');
  const [selectedDong, setSelectedDong] = useState('');
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [showDongList, setShowDongList] = useState(false);

  const signup2Mutation = useSignup2();

  // 동 선택 핸들러
  const handleDongSelect = (dong) => {
    setSelectedDong(dong);
  };

  // 테마 선택 토글
  const toggleTheme = (id) => {
    setSelectedThemes((prev) =>
      prev.includes(id) ? prev.filter((theme) => theme !== id) : [...prev, id]
    );
  };

  // 완료 버튼 활성화 조건 체크
  const isFormValid = selectedDong && selectedThemes.length > 0;

  // 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    const apiThemes = selectedThemes.map((id) => themeApiMap[id]);

    signup2Mutation.mutate(
      {
        address: { sido: '서울특별시', sigungu: city, dong: selectedDong },
        themes: apiThemes,
      },
      {
        onSuccess: () => {
          alert('회원가입이 완료되었습니다!');
          navigate('/login');
        },
      }
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-xl font-bold mb-4">회원가입 하기</h1>
      <p className="text-center text-gray-700 mb-2">
        맞춤형 텃밭을 제공하기 위해 기본 정보가 필요해요
      </p>
      <p className="text-center mb-6">텃밭을 찾고싶은 동네를 선택해주세요</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[320px]">
        {/* 시/구 + 동 선택 */}
        <div className="flex items-center gap-4">
          {/* 시/구 */}
          <div className="border rounded px-3 py-2">{city}</div>

          {/* 동 선택 */}
          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => setShowDongList((prev) => !prev)}
              className="w-full border rounded px-3 py-2 flex justify-between items-center"
            >
              <span>
                {selectedDong || '동을 선택하세요'}
              </span>
              <span className="text-gray-500 text-sm">
                {showDongList ? '▲' : '▼'}
              </span>
            </button>

            <DongSelector
              isOpen={showDongList}
              onClose={() => setShowDongList(false)}
              onDongSelect={handleDongSelect}
              selectedDong={selectedDong}
            />
          </div>
        </div>

        {/* 관심 텃밭 테마 */}
        <p className="font-bold mt-2">관심 텃밭 테마를 선택해주세요</p>
        <div className="space-y-2">
          {themes.map((theme) => (
            <div key={theme.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <CheckCircle 
                  checked={selectedThemes.includes(theme.id)}
                  onChange={() => toggleTheme(theme.id)}
                />
                <span className="text-[16px] font-semibold text-[#111111] tracking-[-0.48px]">{theme.label}</span>
              </div>
              <span className="text-[14px] text-[#777777] tracking-[-0.42px]">{theme.desc}</span>
            </div>
          ))}
        </div>

        {/* 에러 메시지 */}
        {signup2Mutation.isError && (
          <div className="text-red-600 mt-2 text-center">
            {signup2Mutation.error?.response?.data?.message ||
              '회원가입에 실패했습니다.'}
          </div>
        )}

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded mt-4 disabled:bg-gray-300"
          disabled={signup2Mutation.isLoading || !isFormValid}
        >
          {signup2Mutation.isLoading ? '가입 중...' : '완료'}
        </button>
      </form>
    </main>
  );
};

export default AddInfo;

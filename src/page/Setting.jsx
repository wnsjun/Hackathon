import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/profile.svg';
import DongSelector from '../components/common/DongSelector';
import axiosInstance from '../apis/axiosInstance';

const banks = ['국민은행', '신한은행', '우리은행', '하나은행', '카카오뱅크'];

const themes = [
  { code: 'ROOFTOP', label: '옥상', desc: '아파트 및 건물 옥상, 지붕 위 공간' },
  {
    code: 'EMPTY_LOT',
    label: '공터',
    desc: '건물 옆 자투리 공간, 쓰임 없는 부지',
  },
  {
    code: 'FLOWER_BED',
    label: '화단',
    desc: '아파트 단지 내 화단, 빌라 현관 앞 꽃밭',
  },
  { code: 'PARK', label: '공원', desc: '공원 내 공공 텃밭, 산책로 옆 잔디' },
];

const Setting = () => {
  const navigate = useNavigate();

  // 사용자 정보
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [nickname, setNickname] = useState('');

  // 계좌
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  // 관심 동네 & 테마
  const [city] = useState('마포구');
  const [selectedDong, setSelectedDong] = useState('');
  const [showDongList, setShowDongList] = useState(false);
  const [selectedThemes, setSelectedThemes] = useState([]);

  // 프로필
  const [profileUrl, setProfileUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // 프로필 조회
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get('/mypage/profile');
        setName(data.name || '');
        setContact(data.phoneNumber || '');
        setNickname(data.nickname || '');
        setSelectedDong(data.addressDong || '');
        setBank(data.bank || '');
        setAccountNumber(data.accountNumber || '');
        setSelectedThemes(data.preferredThemes || []);
        setProfileUrl(data.imageUrl || '');
      } catch (err) {
        console.error('프로필 불러오기 실패', err);
      }
    };
    fetchProfile();
  }, []);

  const handleAccountNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9-]/g, '');
    setAccountNumber(value);
  };

  const toggleTheme = (code) => {
    setSelectedThemes((prev) =>
      prev.includes(code) ? prev.filter((t) => t !== code) : [...prev, code]
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedImageUrl = profileUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const { data } = await axiosInstance.post(
          '/mypage/edit/image',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        uploadedImageUrl = data.imageUrl;
      }

      await axiosInstance.patch('/mypage/edit', {
        name,
        phoneNumber: contact,
        nickname,
        bank: bank || '',
        accountNumber: accountNumber || '',
        preferredDong: selectedDong || '',
        preferredThemes: selectedThemes,
        imageUrl: uploadedImageUrl,
      });

      alert('설정이 저장되었습니다!');
      navigate('/mypage');
    } catch (err) {
      console.error('설정 저장 실패', err);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <main className="pt-56 flex flex-col items-center min-h-screen bg-white px-4 py-8">
      <div className="w-[358px]">
        {/* 프로필 */}
        <div className="flex flex-col items-center mb-8">
          <input
            type="file"
            accept="image/*"
            id="profileInput"
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="profileInput" className="cursor-pointer">
            <img
              src={profileUrl || profile}
              alt="Profile"
              className="w-[160px] h-[160px] rounded-full mb-4 object-cover"
            />
          </label>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg flex flex-col gap-6"
        >
          {/* 이름 */}
          <div className="pt-12">
            <label className="text-gray-900 font-normal text-base leading-[1.5] tracking-tight">
              이름<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b py-2 px-2 focus:outline-none"
            />
          </div>

          {/* 연락처 */}
          <div className="pt-6">
            <label className="text-gray-900 font-normal text-base leading-[1.5] tracking-tight">
              연락처<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full border-b py-2 px-2 focus:outline-none"
            />
          </div>

          {/* 닉네임 */}
          <div className="pt-6">
            <label className="text-gray-900 font-normal text-base leading-[1.5] tracking-tight">
              닉네임<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full border-b py-2 px-2 focus:outline-none"
            />
          </div>

          {/* 은행 + 계좌번호 */}
          <div className="mb-2 pt-6">
            <span className=" text-gray-900 font-normal text-base leading-[1.5] tracking-tight">
              계좌 등록
            </span>
            <div className=" flex items-center gap-2">
              <select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="h-12 px-2 border-b border-gray-400 text-gray-900 font-normal text-base focus:outline-none"
              >
                <option value="" disabled hidden>
                  은행 선택
                </option>
                {banks.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="계좌번호를 입력하세요"
                value={accountNumber}
                onChange={handleAccountNumberChange}
                maxLength={20}
                className="flex-1 h-12 px-2 border-b border-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* 관심 동네 */}
          <div className="pt-12">
            <label className="text-gray-900 font-normal text-base leading-[1.5] tracking-tight">
              관심 동네
            </label>
            <div className="flex items-center pt-2 gap-4">
              <div className="border rounded px-3 py-2">{city}</div>
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => setShowDongList((prev) => !prev)}
                  className="w-full border rounded px-3 py-2 flex justify-between items-center"
                >
                  <span>{selectedDong || '동을 선택하세요'}</span>
                  <span className="text-gray-500">
                    {showDongList ? '▲' : '▼'}
                  </span>
                </button>
                <DongSelector
                  isOpen={showDongList}
                  onClose={() => setShowDongList(false)}
                  onDongSelect={setSelectedDong}
                  selectedDong={selectedDong}
                />
              </div>
            </div>
          </div>

          {/* 관심 텃밭 테마 */}
          <div className="pt-8">
            <p className="text-gray-900 font-normal text-base leading-[1.5] tracking-tight mb-2">
              관심 텃밭 테마 선택
            </p>
            {themes.map((t) => (
              <div
                key={t.code}
                className="flex items-center justify-between py-2"
              >
                <label className="flex items-center gap-2 text-gray-900 font-normal text-base leading-[1.5] tracking-tight">
                  <input
                    type="checkbox"
                    checked={selectedThemes.includes(t.code)}
                    onChange={() => toggleTheme(t.code)}
                  />
                  <span>{t.label}</span>
                </label>
                <span className="text-gray-500 text-sm">{t.desc}</span>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 w-full h-[62px] flex flex-col justify-center items-center gap-[10px] rounded-lg bg-[#1AA752] text-white"
          >
            완료
          </button>
        </form>
      </div>
    </main>
  );
};

export default Setting;

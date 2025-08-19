// src/page/Setting.jsx
import React, { useState, useEffect } from 'react';
import profile from '../assets/profile.svg';
import DongSelector from '../components/common/DongSelector';
import { useNavigate } from 'react-router-dom';
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

  // 사용자 정보 상태
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [nickname, setNickname] = useState('');

  // 계좌 관련 상태
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accounts, setAccounts] = useState([]);

  // 관심 동네 & 테마
  const [city] = useState('마포구');
  const [selectedDong, setSelectedDong] = useState('');
  const [showDongList, setShowDongList] = useState(false);
  const [selectedThemes, setSelectedThemes] = useState([]);

  // 프로필 조회
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get('/mypage/profile');
        setName(data.name || '');
        setContact(data.phone || '');
        setNickname(data.nickname || '');
        setSelectedDong(data.address?.split(' ')[2] || '');
        setAccounts(
          data.bank
            ? [{ bank: data.bank, accountNumber: data.accountNumber }]
            : []
        );
      } catch (err) {
        console.error('프로필 불러오기 실패', err);
      }
    };
    fetchProfile();
  }, []);

  // 계좌 추가
  const handleAddAccount = () => {
    if (bank && accountNumber) {
      setAccounts([...accounts, { bank, accountNumber }]);
      setBank('');
      setAccountNumber('');
    }
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9-]/g, '');
    setAccountNumber(value);
  };

  // 테마 토글
  const toggleTheme = (code) => {
    setSelectedThemes((prev) =>
      prev.includes(code) ? prev.filter((t) => t !== code) : [...prev, code]
    );
  };

  // 설정 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch('/mypage/edit', {
        name,
        phone: contact,
        nickname,
        bank: accounts[0]?.bank || null,
        accountNumber: accounts[0]?.accountNumber || null,
      });
      alert('설정이 저장되었습니다!');
      navigate('/mypage');
    } catch (err) {
      console.error('설정 저장 실패', err);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  // 스타일 공통
  const textStyle = {
    color: 'var(--500, #111)',
    fontFamily: 'Pretendard',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '150%',
    letterSpacing: '-0.48px',
  };

  const starStyle = {
    color: 'var(--Error, #FF3232)',
    fontFamily: 'Pretendard',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '150%',
    letterSpacing: '-0.48px',
  };

  return (
    <main className="mt-30 pt-10 flex flex-col items-center min-h-screen bg-white px-4 py-8">
      {/* 프로필 */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={profile}
          alt="Profile"
          className="w-[160px] h-[160px] flex-shrink-0 rounded-full mb-4"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg flex flex-col gap-6"
      >
        {/* 이름 */}
        <div>
          <label style={textStyle}>
            이름<span style={starStyle}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-b py-2 px-2"
          />
        </div>

        {/* 연락처 */}
        <div>
          <label style={textStyle}>
            연락처<span style={starStyle}>*</span>
          </label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full border-b py-2 px-2"
          />
        </div>

        {/* 닉네임 */}
        <div>
          <label style={textStyle}>
            닉네임<span style={starStyle}>*</span>
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full border-b py-2 px-2"
          />
        </div>

        {/* 계좌 등록 */}
        <div>
          <label style={textStyle}>계좌 등록</label>
          <div className="flex gap-2 mb-2">
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
            <button
              type="button"
              onClick={handleAddAccount}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              +
            </button>
          </div>
          <ul className="space-y-1">
            {accounts.map((acc, index) => (
              <li key={index} className="text-sm text-gray-700">
                {acc.bank} {acc.accountNumber}
              </li>
            ))}
          </ul>
        </div>

        {/* 관심 동네 */}
        <div>
          <label style={textStyle}>관심 동네</label>
          <div className="flex items-center gap-4">
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
        <div>
          <p style={textStyle} className="mt-2 mb-2">
            관심 텃밭 테마 선택
          </p>
          {themes.map((t) => (
            <div
              key={t.code}
              className="flex items-center justify-between py-2"
            >
              <label className="flex items-center gap-2" style={textStyle}>
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

        {/* 완료 버튼 */}
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded mt-4 disabled:bg-gray-300"
        >
          완료
        </button>
      </form>
    </main>
  );
};

export default Setting;

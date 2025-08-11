import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmCard from '../components/common/FarmCard';
import { mockFarms } from '../data/mockFarms';
import Button from '../components/common/Button';
import ChatbotIcon from '../components/common/ChatbotIcon';

export const Community = () => {
  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFarms(mockFarms);
  }, []);

  const farmsToShow = farms.slice(0, 3);

  return (
    <div className="p-12 my-12">

      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <h1
          style={{
            color: '#000',
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '160%',
          }}
        >
          인증피드
        </h1>
        <Button onClick={() => navigate('/addfarm')}>작성하기
        </Button>
      </div>

      {farmsToShow.length === 0 ? (
        <p className="text-center text-gray-500">등록된 텃밭이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {farmsToShow.map((farm) => (
            <FarmCard key={farm.id} farm={farm} />
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <h1
          style={{
            color: '#000',
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '160%',
          }}
        >
          재배 팁
        </h1>
        <Button onClick={() => navigate('/addfarm')}>작성하기
        </Button>
      </div>

      {farmsToShow.length === 0 ? (
        <p className="text-center text-gray-500">등록된 텃밭이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {farmsToShow.map((farm) => (
            <FarmCard key={farm.id} farm={farm} />
          ))}
        </div>
      )}
      
      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
    </div>
  );
};


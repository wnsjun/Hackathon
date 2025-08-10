import { useNavigate } from 'react-router-dom';
import plant from '../../assets/plant.png';

const FarmCard = ({ farm, isRecommended }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/plant/${farm.id}`, { state: { farm } });
  };

  const handleDetailClick = (e) => {
    e.stopPropagation();
    navigate(`/plant/${farm.id}`, { state: { farm } });
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
    >
      {/* 이미지 섹션 */}
      <div className="relative">
        <div
          className="w-full h-60 bg-cover bg-center rounded-t-lg"
          style={{
            backgroundImage: `url(${plant})`,
          }}
        />

      </div>

      {/* 카드 내용 */}
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-semibold text-gray-900 flex-1">
            {farm.title}
          </h3>
          <span className="text-xs text-gray-500 ml-2">{farm.area}㎡</span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-400">
            <path fill="currentColor" d="M6 0C2.686 0 0 2.686 0 6s2.686 6 6 6 6-2.686 6-6S9.314 0 6 0zm0 8.5c-.828 0-1.5-.672-1.5-1.5S5.172 5.5 6 5.5s1.5.672 1.5 1.5S6.828 8.5 6 8.5z"/>
          </svg>
          <span className="text-sm text-gray-600">{farm.address}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-green-600 font-semibold">
            <span className="text-lg">{farm.priceText}</span>
            <span className="text-sm"> / {farm.rentalPeriod}</span>
          </div>
          <button
            onClick={handleDetailClick}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            자세히 보기 〉
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmCard;

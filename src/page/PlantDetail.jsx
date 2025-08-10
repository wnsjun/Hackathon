import { useLocation } from 'react-router-dom';
import plant from '../assets/plant.png';

const PlantDetail = () => {
  const location = useLocation();
  const { farm } = location.state || {};

  if (!farm) {
    return (
      <div className="p-12 pt-32 text-center">
        텃밭 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="p-12 pt-32 max-w-3xl mx-auto">
      {/* 사용자 닉네임 - 예시로 고정 */}
      <h1 className="text-2xl font-bold mb-4">사용자: 옥상텃밭</h1>

      {/* 사진 */}
      <div
        className="w-full h-[300px] bg-cover bg-center rounded-xl mb-6"
        style={{ backgroundImage: `url(${plant})` }}
      ></div>

      {/* 텃밭 정보 */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4 text-gray-800">
        <h2 className="text-xl font-semibold">{farm.title}</h2>
        <p>주소: {farm.address}</p>
        <p>가격: {farm.price}</p>
        <p>대여 기간: {farm.rentalPeriod}</p>
      </div>
    </div>
  );
};

export default PlantDetail;

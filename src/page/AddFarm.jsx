import { Navbar } from '../components/layouts/Navbar';
import { useState } from 'react';

const AddFarm = () => {
  // 입력 상태 관리 예시
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState('');
  const [farmName, setFarmName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 등록 로직
    alert('등록 버튼 클릭됨!');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 mt-40 ">
        {/* 매물올리기 + 등록 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">매물 올리기</h1>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-400 transition cursor-pointer"
          >
            등록
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 주소 */}
          <div className="flex items-center space-x-4">
            <label htmlFor="address" className="w-20 font-semibold">
              주소
            </label>
            <input
              id="address"
              type="text"
              placeholder="주소를 입력하세요"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* 가격 / 대여기간 */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <label htmlFor="price" className="w-20 font-semibold">
                가격
              </label>
              <input
                id="price"
                type="number"
                min="0"
                placeholder="금액"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-32 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span>원</span>
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor="rentalPeriod" className="w-24 font-semibold">
                대여기간
              </label>
              <input
                id="rentalPeriod"
                type="number"
                min="0"
                placeholder="기간"
                value={rentalPeriod}
                onChange={(e) => setRentalPeriod(e.target.value)}
                className="w-32 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span>일</span>
            </div>
          </div>

          {/* 텃밭 이름 */}
          <div className="flex items-center space-x-4">
            <label htmlFor="farmName" className="w-20 font-semibold">
              텃밭 이름
            </label>
            <input
              id="farmName"
              type="text"
              placeholder="텃밭 이름을 입력하세요"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* 텃밭 사진 업로드 */}
          <div className="flex items-center space-x-4">
            <label htmlFor="farmImage" className="w-20 font-semibold">
              텃밭 사진
            </label>
            <input
              id="farmImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="flex-grow"
              required
            />
          </div>

          {/* 텃밭 설명 */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="description" className="font-semibold">
              텃밭 설명
            </label>
            <textarea
              id="description"
              rows="5"
              placeholder="텃밭에 대해 설명해 주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddFarm;

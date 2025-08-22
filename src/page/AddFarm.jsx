import { Navbar } from '../components/layouts/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import ChatbotIcon from '../components/common/ChatbotIcon';
import { createFarm } from '../apis/home';

const AddFarm = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState(0);
  const [rentalPeriod, setRentalPeriod] = useState(0);
  const [farmName, setFarmName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [area, setArea] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = () => {
    return address.trim() !== '' && 
          price > 0 && 
          rentalPeriod > 0 && 
          farmName.trim() !== '' && 
          description.trim() !== '' && 
          area > 0 && 
          selectedTheme !== '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // 선택된 테마의 API 값 찾기
      const selectedThemeObj = themes.find(theme => theme.id === selectedTheme);
      const themeApiValue = selectedThemeObj?.apiValue || '';

      const farmData = {
        title: farmName.trim(),
        description: description.trim(),
        address: address.trim(),
        price: parseInt(price) || 0,
        rentalPeriod: parseInt(rentalPeriod) || 0,
        size: parseInt(area) || 0,
        theme: themeApiValue
      };
      
      // 데이터 validation 로그
      console.log('전송 전 데이터 검증:', {
        title: farmData.title.length + ' chars',
        description: farmData.description.length + ' chars', 
        address: farmData.address.length + ' chars',
        price: farmData.price + ' (number)',
        rentalPeriod: farmData.rentalPeriod + ' (number)',
        size: farmData.size + ' (number)',
        theme: farmData.theme + ' (string)',
        hasImages: images.length > 0
      });

      const response = await createFarm(farmData, images);
      console.log('텃밭 등록 성공:', response);
      
      // 성공 시 홈으로 이동
      alert('텃밭이 성공적으로 등록되었습니다!');
      navigate('/home');
    } catch (error) {
      console.error('텃밭 등록 실패:', error);
      
      if (error.response?.status === 500) {
        alert('서버 오류로 텃밭 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
      } else if (error.response?.status === 400) {
        alert('입력 정보를 다시 확인해주세요.');
      } else if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
      } else if (error.response?.status === 403) {
        alert('텃밭을 등록할 권한이 없습니다.');
      } else {
        alert('텃밭 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prevImages => [...prevImages, ...files]);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreviews(prevPreviews => [...prevPreviews, event.target.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };


  const themes = [
    { id: 'rooftop', name: '옥상', description: '아파트 및 건물 옥상, 지붕 위 공간', apiValue: 'ROOFTOP' },
    { id: 'lot', name: '공터', description: '건물 옆 자투리 공간, 쓰임 없는 부지', apiValue: 'EMPTY_LOT' },
    { id: 'garden', name: '화단', description: '아파트 단지 내 화단, 빌라 현관 앞 꽃밭', apiValue: 'FLOWER_BED' },
    { id: 'park', name: '공원', description: '공원 내 공공 텃밭, 산책로 옆 잔디', apiValue: 'PARK' }
  ];

  const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 22C12 22 4 16 4 10C4 5 8 2 12 2C16 2 20 5 20 10C20 16 12 22 12 22ZM12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13Z" stroke="#777777" strokeWidth="1.5"/>
    </svg>
  );

  const WonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18" fill="none">
      <path d="M22.6667 1L17.3333 17L12 1L6.66667 17L1.33333 1M0 5.94277H24" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const DateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M17 4H3C1.89543 4 1 4.89543 1 6V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V6C19 4.89543 18.1046 4 17 4Z" stroke="#777777" strokeWidth="1.5"/>
    <path d="M1 8C1 6.114 1 5.172 1.586 4.586C2.172 4 3.114 4 5 4H15C16.886 4 17.828 4 18.414 4.586C19 5.172 19 6.114 19 8H1Z" fill="#777777"/>
    <path d="M5 1V4M15 1V4" stroke="#777777" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );


  const AreaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14.25 4.5H19.5V9.75M19.0205 4.97812L5.24906 18.7509M9.75 19.5H4.5V14.25" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ThemeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12.5 10C12.5 8.136 12.5 7.204 12.197 6.47C11.9959 5.98427 11.7009 5.54295 11.3291 5.17129C10.9573 4.79963 10.5158 4.50492 10.03 4.304C9.296 4 8.364 4 6.5 4C6.5 5.864 6.5 6.796 6.803 7.53C7.00414 8.01573 7.29906 8.45705 7.67089 8.82871C8.04273 9.20037 8.48418 9.49508 8.97 9.696C9.704 10 10.636 10 12.5 10ZM12.5 10C12.5 8.757 12.5 8.136 12.703 7.646C12.974 6.993 13.493 6.473 14.146 6.203C14.636 6 15.461 6 16.703 6C16.703 7.243 16.703 7.864 16.5 8.354C16.229 9.00709 15.5071 9.52604 14.854 9.797C14.364 10 13.742 10 12.5 10ZM12.5 10V15M20 15C14.5327 15 9.46734 15 4 15M20 18C14.5327 18 9.46734 18 4 18M20 21C14.5327 21 9.46734 21 4 21" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );


  const SliderHandle = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="white" stroke="#1aa752" strokeWidth="4"/>
      <circle cx="20" cy="20" r="6" fill="#1aa752"/>
    </svg>
  );

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

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen pt-32">
        <div className="max-w-[1440px] mx-auto px-40 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-[32px] font-semibold text-black leading-[1.5] tracking-[-0.64px]">텃밭 매물 등록</h1>
            <div className="flex items-center gap-4">
              {isFormValid() && (
                <div className="flex items-center gap-1 text-[#1aa752]">
                  <span className="text-[16px] font-semibold">친환경 점수 +10</span>
                </div>
              )}
              <Button
                onClick={handleSubmit}
                variant="farm"
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? '등록 중...' : '등록'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Main Form */}
            <div className="col-span-2 space-y-8">
              {/* Address */}
              <div className="flex items-center gap-[101px]">
                <div className="flex items-center gap-2">
                  <LocationIcon />
                  <label className="text-[20px] font-semibold text-[#111111] leading-[1.5] tracking-[-0.6px]">주소</label>
                </div>
                <div className="flex-1 border-b border-[#bbbbbb] pb-3">
                  <input
                    type="text"
                    placeholder="주소를 입력하세요."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full font-semibold text-[20px] text-[#111111] tracking-[-0.6px] bg-transparent outline-none placeholder-[#bbbbbb]"
                  />
                </div>
              </div>

              {/* Price and Period */}
              <div className="flex gap-[120px]">
                {/* Price */}
                <div className="flex items-center justify-between w-[357px]">
                  <div className="flex items-center gap-2">
                    <WonIcon />
                    <label className="text-[20px] font-semibold text-[#111111] leading-[1.5] tracking-[-0.6px]">가격</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="border-b border-[#bbbbbb] pb-1">
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-[164px] text-[32px] font-semibold text-[#111111] text-right tracking-[-0.64px] bg-transparent outline-none"
                      />
                    </div>
                    <span className="text-[24px] text-[#111111] tracking-[-0.48px] h-8">원</span>
                  </div>
                </div>

                {/* Period */}
                <div className="flex items-center justify-between w-[260px]">
                  <div className="flex items-center gap-2">
                    <DateIcon />
                    <label className="text-[20px] font-semibold text-[#111111] leading-[1.5] tracking-[-0.6px]">대여 기간</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="border-b border-[#bbbbbb] pb-1">
                      <input
                        type="number"
                        value={rentalPeriod}
                        onChange={(e) => setRentalPeriod(e.target.value)}
                        className="w-[68px] text-[32px] font-semibold text-[#111111] text-right tracking-[-0.64px] bg-transparent outline-none"
                      />
                    </div>
                    <span className="text-[24px] text-[#111111] tracking-[-0.48px] h-8">일</span>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="bg-[#f7f7f7] min-h-[588px] rounded-2xl p-4">
                {imagePreviews.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 h-full">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={preview} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-[280px] object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {imagePreviews.length < 4 && (
                      <div 
                        className="border-2 border-dashed border-[#bbbbbb] rounded-lg flex flex-col items-center justify-center cursor-pointer h-[280px] hover:border-[#1aa752] transition-colors"
                        onClick={() => document.getElementById('imageUpload').click()}
                      >
                        <div className="w-8 h-8 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                            <path d="M19.2002 3.5293H22C23.1045 3.5293 23.9999 4.42478 24 5.5293V18C24 19.1046 23.1046 20 22 20H2C0.895431 20 0 19.1046 0 18V5.5293C6.25466e-05 4.42478 0.895469 3.5293 2 3.5293H4.7998L7.2002 0H16.7998L19.2002 3.5293ZM12 7.05957C9.34912 7.05967 7.2002 9.1667 7.2002 11.7656L7.20605 12.0078C7.3308 14.4136 9.29893 16.3428 11.7529 16.4648L12 16.4717C14.5677 16.4714 16.6651 14.4938 16.7939 12.0078L16.7998 11.7656C16.7998 9.1668 14.6507 7.05983 12 7.05957ZM12 8.55957C13.8504 8.55983 15.2998 10.0231 15.2998 11.7656C15.2994 13.5079 13.8502 14.9714 12 14.9717C10.1496 14.9716 8.70056 13.508 8.7002 11.7656C8.7002 10.023 10.1494 8.55967 12 8.55957ZM10.8008 3.36816C10.3866 3.36816 10.0508 3.70395 10.0508 4.11816C10.051 4.53215 10.3867 4.86816 10.8008 4.86816H13.2012L13.2773 4.86426C13.6552 4.82572 13.9509 4.50616 13.9512 4.11816C13.9512 3.72998 13.6553 3.41067 13.2773 3.37207L13.2012 3.36816H10.8008Z" fill="#777777"/>
                          </svg>
                        </div>
                        <p className="text-[14px] text-[#777777] leading-[1.5] tracking-[-0.42px]">
                          + 사진 추가
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div 
                    className="h-[588px] flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('imageUpload').click()}
                  >
                    <div className="w-8 h-8 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                        <path d="M19.2002 3.5293H22C23.1045 3.5293 23.9999 4.42478 24 5.5293V18C24 19.1046 23.1046 20 22 20H2C0.895431 20 0 19.1046 0 18V5.5293C6.25466e-05 4.42478 0.895469 3.5293 2 3.5293H4.7998L7.2002 0H16.7998L19.2002 3.5293ZM12 7.05957C9.34912 7.05967 7.2002 9.1667 7.2002 11.7656L7.20605 12.0078C7.3308 14.4136 9.29893 16.3428 11.7529 16.4648L12 16.4717C14.5677 16.4714 16.6651 14.4938 16.7939 12.0078L16.7998 11.7656C16.7998 9.1668 14.6507 7.05983 12 7.05957ZM12 8.55957C13.8504 8.55983 15.2998 10.0231 15.2998 11.7656C15.2994 13.5079 13.8502 14.9714 12 14.9717C10.1496 14.9716 8.70056 13.508 8.7002 11.7656C8.7002 10.023 10.1494 8.55967 12 8.55957ZM10.8008 3.36816C10.3866 3.36816 10.0508 3.70395 10.0508 4.11816C10.051 4.53215 10.3867 4.86816 10.8008 4.86816H13.2012L13.2773 4.86426C13.6552 4.82572 13.9509 4.50616 13.9512 4.11816C13.9512 3.72998 13.6553 3.41067 13.2773 3.37207L13.2012 3.36816H10.8008Z" fill="#777777"/>
                      </svg>
                    </div>
                    <p className="text-[14px] text-[#777777] leading-[1.5] tracking-[-0.42px]">
                      사진을 선택해주세요. (최대 4장)
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageUpload"
                />
              </div>

              {/* Farm Name and Description */}
              <div className="space-y-8">
                <div className="border-b border-[#bbbbbb] pb-2">
                  <input
                    type="text"
                    placeholder="텃밭 이름을 입력하세요"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full text-[36px] font-semibold text-[#111111] tracking-[-0.72px] bg-transparent outline-none placeholder-[#bbbbbb]"
                  />
                </div>
                <div className="border-b border-[#bbbbbb] pb-2">
                  <textarea
                    placeholder="텃밭 설명을 입력하세요"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full text-[20px] text-[#111111] tracking-[-0.6px] bg-transparent outline-none placeholder-[#bbbbbb] resize-none h-20"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* 면적 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <AreaIcon />
                  <label className="text-[20px] font-semibold text-black leading-[1.5] tracking-[-0.6px]">평수</label>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <div className="bg-[#f7f7f7] h-2 rounded-full"></div>
                    <div className="bg-[#1aa752] h-2 rounded-full absolute top-0 left-0" style={{ width: `${(area / 100) * 100}%` }}></div>
                    <div className="absolute -top-4 left-0 w-10 h-10" style={{ left: `${(area / 100) * 100}%`, transform: 'translateX(-50%)' }}>
                      <SliderHandle />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={area}
                      onChange={handleAreaChange}
                      className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1">
                      <span className="text-[16px] font-semibold text-black tracking-[-0.48px]">{area}</span>
                      <span className="text-[16px] text-black tracking-[-0.48px]">㎡</span>
                    </div>
                  </div>
                  <p className="text-[14px] text-[#777777] leading-[1.5] tracking-[-0.42px]">측정이 어려울 경우 대략적인 크기를 입력해주세요.</p>
                </div>
              </div>

              {/* 테마 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ThemeIcon />
                  <label className="text-[20px] font-semibold text-[#111111] leading-[1.5] tracking-[-0.6px]">테마</label>
                </div>
                <div className="space-y-2">
                  {themes.map((theme) => (
                    <div key={theme.id} className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-4">
                        <CheckCircle 
                          checked={selectedTheme === theme.id}
                          onChange={() => setSelectedTheme(selectedTheme === theme.id ? '' : theme.id)}
                        />
                        <span className="text-[16px] font-semibold text-[#111111] tracking-[-0.48px]">{theme.name}</span>
                      </div>
                      <span className="text-[14px] text-[#777777] tracking-[-0.42px]">{theme.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
      </div>
    </>
  );
};

export default AddFarm;

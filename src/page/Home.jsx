import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmCard from '../components/common/Card/FarmCard';
import RecommendFarmCard from '../components/common/Card/RecommendFarmCard';
import Button from '../components/common/Button';
import { mockFarms } from '../data/mockFarms';
import { fetchAllFarms } from '../apis/home';
import ChatbotIcon from '../components/common/ChatbotIcon';
import banner from '../assets/banner.png?url';
import LocationFilter from '../components/common/Filter/LocationFilter';
import AreaFilter from '../components/common/Filter/AreaFilter';
import PriceFilter from '../components/common/Filter/PriceFilter';
import ThemeFilter from '../components/common/Filter/ThemeFilter';


const Home = () => {
  const [farms, setFarms] = useState([]);
  const [recommendedFarms, setRecommendedFarms] = useState([]);
  const [displayedRecommendedFarms, setDisplayedRecommendedFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: '위치',
    area: '평수',
    price: '가격',
    theme: '테마'
  });
  const [openFilter, setOpenFilter] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({
    location: [],
    area: { minArea: 16, maxArea: 100 },
    price: { minPrice: 1000, maxPrice: 1000000 },
    theme: []
  });
  const [nickname, setNickname] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 랜덤으로 3개 선택하는 함수
  const getRandomFarms = (farms, count = 3) => {
    if (!Array.isArray(farms) || farms.length === 0) return [];
    if (farms.length <= count) return farms;
    
    const shuffled = [...farms].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const resetFilters = () => {
    setAppliedFilters({
      location: [],
      area: { minArea: 16, maxArea: 100 },
      price: { minPrice: 1000, maxPrice: 1000000 },
      theme: []
    });
    setFilters({
      location: '위치',
      area: '평수',
      price: '가격',
      theme: '테마'
    });
    setOpenFilter(null);
    navigate('/home');
  };

  const loadFarms = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("63줄")
      const response = await fetchAllFarms();
      // API response에서 farms 배열 추출
      console.log(response)
      setFarms(response.farms || []);

      const recommendedFarmsData = response.recommendedFarms || [];
      setRecommendedFarms(recommendedFarmsData);
      setDisplayedRecommendedFarms(getRandomFarms(recommendedFarmsData));
    } catch (err) {
      console.error('매물 목록 로딩 실패:', err);
      setError('매물 목록을 불러올 수 없습니다.');
      setFarms(mockFarms);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFarms();
    // accessToken으로 로그인 상태 확인
    const loginStatus = !!localStorage.getItem('accessToken');
    setIsLoggedIn(loginStatus);
    
    // nickname 설정
    const userData = localStorage.getItem('userData');
    if (userData) {
      const { nickname: userNickname } = JSON.parse(userData);
      setNickname(userNickname);
    }
  }, []);

  useEffect(() => {
    const handleResetFilters = () => {
      resetFilters();
    };

    window.addEventListener('resetHomeFilters', handleResetFilters);
    
    return () => {
      window.removeEventListener('resetHomeFilters', handleResetFilters);
    };
  }, []);

  const filteredFarms = (Array.isArray(farms) ? farms : []).filter((farm) => {
    // API DTO 구조: { id, title, price, rentalPeriod, address, isAvailable }
    
    // 위치 필터링
    const matchesLocation = appliedFilters.location.length === 0 || 
      appliedFilters.location.some(loc => farm.address?.includes(loc.split(' ')[0]));
    
    // 평수 필터링 (mockFarms와 호환성을 위해 area 속성도 확인)
    const farmArea = farm.area || farm.size;
    const matchesArea = farmArea >= appliedFilters.area.minArea && 
      farmArea <= appliedFilters.area.maxArea;
    
    // 가격 필터링
    const farmPrice = farm.price;
    const matchesPrice = farmPrice >= appliedFilters.price.minPrice && 
      farmPrice <= appliedFilters.price.maxPrice;
    
    // 테마 필터링 (mockFarms와 호환성을 위해)
    const farmTheme = farm.theme;
    const matchesTheme = appliedFilters.theme.length === 0 || 
      appliedFilters.theme.includes(farmTheme);
    
    // 사용 가능한 매물만 표시 (API에서 제공하는 경우)
    const isAvailable = farm.isAvailable !== false;
    
    return matchesLocation && matchesArea && matchesPrice && matchesTheme && isAvailable;
  });

  const handleFilterDropdownChange = (filterType) => {
    setOpenFilter(openFilter === filterType ? null : filterType);
  };

  const handleLocationToggle = (location) => {
    setAppliedFilters(prev => {
      const isSelected = prev.location.includes(location);
      const newLocation = isSelected 
        ? prev.location.filter(loc => loc !== location)
        : [...prev.location, location];
      return {
        ...prev,
        location: newLocation
      };
    });
  };

  const handleAreaFilterApply = ({ minArea, maxArea }) => {
    setAppliedFilters(prev => ({
      ...prev,
      area: { minArea, maxArea }
    }));
  };

  const handlePriceFilterApply = ({ minPrice, maxPrice }) => {
    setAppliedFilters(prev => ({
      ...prev,
      price: { minPrice, maxPrice }
    }));
  };

  const handleThemeToggle = (theme) => {
    setAppliedFilters(prev => {
      const isSelected = prev.theme.includes(theme);
      const newTheme = isSelected 
        ? prev.theme.filter(t => t !== theme)
        : [...prev.theme, theme];
      return {
        ...prev,
        theme: newTheme
      };
    });
  };

  const handleRegisterFarmClick = () => {
    navigate('/addfarm');
  };

  const handleViewAllRecommendationsClick = () => {
    setDisplayedRecommendedFarms(getRandomFarms(recommendedFarms));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 sm:px-12 lg:px-20 xl:px-32 py-6 pt-32">
        {/* 배너 섹션 */}
        <div className="mb-8">
        <img
          src={banner}
          alt="SpaceFarm 텃밭 대여 서비스"
          className="w-full max-w-[1440px] aspect-[1440/437] flex-shrink-0 object-cover rounded-xl"
        />
        </div>

        {/* 추천 섹션 - 로그인 상태일 때만 표시 */}
        {isLoggedIn && (
          <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex">
            <h2 className="text-2xl font-bold text-[#1AA752]">
                {nickname}
              </h2>
              <h2 className="text-2xl font-bold text-gray-900">
                님만을 위한 텃밭이에요
              </h2>
            </div>
              <button 
                onClick={handleViewAllRecommendationsClick}
                className="text-sm text-[#777] font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                새로고침
                <svg className="w-4 h-4 text-[#777]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 21v-5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            {Array.isArray(displayedRecommendedFarms) && displayedRecommendedFarms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {displayedRecommendedFarms.map((farm) => (
                  <RecommendFarmCard key={farm.id} farm={farm} isRecommended={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">추천 매물이 없습니다</p>
                <p className="text-gray-400 text-sm mt-1">더 많은 매물이 등록되면 맞춤 추천해드릴게요</p>
              </div>
            )}
          </div>
        )}

        {/* 텃밭 매물 확인 섹션 */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">텃밭 매물 확인</h2>
            <Button 
              onClick={handleRegisterFarmClick}
              variant="farm"
            >
              매물 등록
            </Button>
          </div>

          {/* 필터 버튼들 */}
          <div className="flex flex-wrap gap-3 mb-8">
            {Object.entries(filters).map(([key, value]) => (
              <div key={key} className="relative">
                <button
                  onClick={() => handleFilterDropdownChange(key)}
                  className={`cursor-pointer px-4 py-2 border rounded-lg text-sm flex items-center gap-2 transition-colors bg-white ${
                    openFilter === key 
                      ? 'border-green-400 text-green-600' 
                      : 'border-gray-300 text-gray-700 hover:border-green-400 hover:text-green-600'
                  }`}
                >
                  {value}
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className={`text-gray-400 transition-transform ${
                      openFilter === key ? 'rotate-180' : ''
                    }`}
                  >
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                
                {/* 필터 컴포넌트들 */}
                {key === 'location' && (
                  <LocationFilter 
                    isOpen={openFilter === 'location'}
                    onClose={() => setOpenFilter(null)}
                    onLocationToggle={handleLocationToggle}
                    selectedLocations={appliedFilters.location}
                  />
                )}
                {key === 'area' && (
                  <AreaFilter 
                    isOpen={openFilter === 'area'}
                    onClose={() => setOpenFilter(null)}
                    onApplyFilter={handleAreaFilterApply}
                  />
                )}
                {key === 'price' && (
                  <PriceFilter 
                    isOpen={openFilter === 'price'}
                    onClose={() => setOpenFilter(null)}
                    onApplyFilter={handlePriceFilterApply}
                  />
                )}
                {key === 'theme' && (
                  <ThemeFilter 
                    isOpen={openFilter === 'theme'}
                    onClose={() => setOpenFilter(null)}
                    onThemeToggle={handleThemeToggle}
                    selectedThemes={appliedFilters.theme}
                  />
                )}
              </div>
            ))}
          </div>

          {/* 농장 카드들 */}
          {loading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center animate-spin">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
              </div>
              <p className="text-gray-500 text-lg">매물 목록을 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-400">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <p className="text-red-600 text-lg mb-2">{error}</p>
              <button 
                onClick={loadFarms}
                className="text-green-600 hover:text-green-700 underline"
              >
                다시 시도
              </button>
            </div>
          ) : filteredFarms.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path stroke="currentColor" strokeWidth="1.5" d="M12 2L2 7v10c0 5.55 3.84 7.74 9 8.86C16.16 24.74 22 22.55 22 17V7l-10-5z"/>
                  <path stroke="currentColor" strokeWidth="1.5" d="M8 12h8M12 8v8"/>
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">조건에 맞는 텃밭이 없습니다</p>
              <p className="text-gray-400 text-sm">필터 조건을 변경해보세요</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredFarms.map((farm) => (
                <FarmCard key={farm.id} farm={farm} isRecommended={false} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
    </div>
  );
};

export default Home;

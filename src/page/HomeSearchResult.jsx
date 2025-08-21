import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FarmCard from '../components/common/Card/FarmCard';
import instance from '../apis/instance';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HomeSearchResult = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = useQuery();
  const searchQuery = query.get('title') || '';

  const searchFarms = async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await instance.get(`/farm?title=${encodeURIComponent(searchTerm)}`);
      setFarms(response.data.farms || []);
    } catch (err) {
      console.error('검색 실패:', err);
      setError('검색 중 오류가 발생했습니다.');
      setFarms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      searchFarms(searchQuery);
    } else {
      setLoading(false);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 sm:px-12 lg:px-20 xl:px-32 py-6 pt-32">
        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center animate-spin">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
            </div>
            <p className="text-gray-500 text-lg">검색 중...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-400">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : farms.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">'{searchQuery}'으로 텃밭 매물에서 검색한 결과가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {farms.map((farm) => (
              <FarmCard key={farm.id} farm={farm} isRecommended={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSearchResult;
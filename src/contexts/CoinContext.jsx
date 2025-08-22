import { createContext, useContext, useState, useEffect } from 'react';

const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [coinBalance, setCoinBalance] = useState(0);

  // localStorage에서 코인 잔액 불러오기
  const loadCoinBalance = () => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const userInfo = JSON.parse(userData);
        setCoinBalance(userInfo.money || 0);
      } else {
        setCoinBalance(0);
      }
    } catch (error) {
      console.error('Error loading coin balance:', error);
      setCoinBalance(0);
    }
  };

  // 코인 잔액 업데이트
  const updateCoinBalance = (newBalance) => {
    setCoinBalance(newBalance);
    
    // localStorage의 userData도 업데이트
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const userInfo = JSON.parse(userData);
        userInfo.money = newBalance;
        localStorage.setItem('userData', JSON.stringify(userInfo));
      }
    } catch (error) {
      console.error('Error updating userData:', error);
    }
  };

  // 컴포넌트 마운트 시 코인 잔액 로드
  useEffect(() => {
    loadCoinBalance();
  }, []);

  // localStorage 변경 감지 (다른 탭에서 변경 시)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'userData') {
        loadCoinBalance();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <CoinContext.Provider value={{ 
      coinBalance, 
      updateCoinBalance, 
      loadCoinBalance 
    }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoin = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error('useCoin must be used within a CoinProvider');
  }
  return context;
};
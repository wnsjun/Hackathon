import { useMutation } from '@tanstack/react-query';
import { chargeApi, exchangeApi } from '../apis/paymentApi';

// 충전 훅
export const useCharge = () => {
  return useMutation({
    mutationFn: (money) => chargeApi(money),
    onSuccess: (res) => {
      alert('충전이 완료되었습니다!');
      // userData 업데이트
      const userData = localStorage.getItem('userData');
      if (userData) {
        const userInfo = JSON.parse(userData);
        // 서버에서 업데이트된 money 값을 받아서 업데이트
        if (res.money !== undefined) {
          userInfo.money = res.money;
          localStorage.setItem('userData', JSON.stringify(userInfo));
        }
      }
      // 페이지 새로고침으로 잔액 업데이트
      window.location.reload();
    },
    onError: (error) => {
      console.error('Charge error:', error);
      alert(error.response?.data?.message || '충전에 실패했습니다.');
    },
  });
};

// 환전 훅
export const useExchange = () => {
  return useMutation({
    mutationFn: (money) => exchangeApi(money),
    onSuccess: (res) => {
      alert('환전이 완료되었습니다!');
      // userData 업데이트
      const userData = localStorage.getItem('userData');
      if (userData) {
        const userInfo = JSON.parse(userData);
        // 서버에서 업데이트된 money 값을 받아서 업데이트
        if (res.money !== undefined) {
          userInfo.money = res.money;
          localStorage.setItem('userData', JSON.stringify(userInfo));
        }
      }
      // 페이지 새로고침으로 잔액 업데이트
      window.location.reload();
    },
    onError: (error) => {
      console.error('Exchange error:', error);
      alert(error.response?.data?.message || '환전에 실패했습니다.');
    },
  });
};
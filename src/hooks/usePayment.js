import { useMutation } from '@tanstack/react-query';
import { chargeApi, exchangeApi } from '../apis/paymentApi';
import { useCoin } from '../contexts/CoinContext';

// 충전 훅
export const useCharge = () => {
  const { updateCoinBalance } = useCoin();
  
  return useMutation({
    mutationFn: (money) => chargeApi(money),
    onSuccess: (res) => {
      alert('충전이 완료되었습니다!');
      // 서버에서 업데이트된 money 값을 받아서 실시간 업데이트
      if (res.money !== undefined) {
        updateCoinBalance(res.money);
      }
    },
    onError: (error) => {
      console.error('Charge error:', error);
      alert(error.response?.data?.message || '충전에 실패했습니다.');
    },
  });
};

// 환전 훅
export const useExchange = () => {
  const { updateCoinBalance } = useCoin();
  
  return useMutation({
    mutationFn: (money) => exchangeApi(money),
    onSuccess: (res) => {
      alert('환전이 완료되었습니다!');
      // 서버에서 업데이트된 money 값을 받아서 실시간 업데이트
      if (res.money !== undefined) {
        updateCoinBalance(res.money);
      }
    },
    onError: (error) => {
      console.error('Exchange error:', error);
      alert(error.response?.data?.message || '환전에 실패했습니다.');
    },
  });
};
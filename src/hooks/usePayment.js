import { useMutation } from '@tanstack/react-query';
import { chargeApi, exchangeApi, getBalanceApi } from '../apis/paymentApi';
import { useCoin } from '../contexts/CoinContext';

// 충전 훅
export const useCharge = () => {
  const { updateCoinBalance } = useCoin();
  
  return useMutation({
    mutationFn: (money) => chargeApi(money),
    onSuccess: async (res) => {
      alert('충전이 완료되었습니다!');
      // 충전 후 항상 최신 잔액 조회하여 실시간 업데이트
      try {
        const balanceRes = await getBalanceApi();
        if (balanceRes.money !== undefined) {
          updateCoinBalance(balanceRes.money);
        }
      } catch (error) {
        console.error('Failed to fetch updated balance:', error);
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
    onSuccess: async (res) => {
      alert('환전이 완료되었습니다!');
      // 환전 후 항상 최신 잔액 조회하여 실시간 업데이트
      try {
        const balanceRes = await getBalanceApi();
        if (balanceRes.money !== undefined) {
          updateCoinBalance(balanceRes.money);
        }
      } catch (error) {
        console.error('Failed to fetch updated balance:', error);
      }
    },
    onError: (error) => {
      console.error('Exchange error:', error);
      alert(error.response?.data?.message || '환전에 실패했습니다.');
    },
  });
};

// 잔액 조회 훅
export const useGetBalance = () => {
  const { updateCoinBalance } = useCoin();
  
  return useMutation({
    mutationFn: getBalanceApi,
    onSuccess: (res) => {
      if (res.money !== undefined) {
        updateCoinBalance(res.money);
      }
    },
    onError: (error) => {
      console.error('Get balance error:', error);
    },
  });
};
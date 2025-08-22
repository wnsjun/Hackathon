import axiosInstance from './axiosInstance';

// 충전 API
export const chargeApi = async (money) => {
  try {
    const response = await axiosInstance.patch('/pay/charge', {
      money: money
    });
    return response.data;
  } catch (error) {
    console.error('Charge API error:', error);
    throw error;
  }
};

// 환전 API
export const exchangeApi = async (money) => {
  try {
    const response = await axiosInstance.patch('/pay/exchange', {
      money: money
    });
    return response.data;
  } catch (error) {
    console.error('Exchange API error:', error);
    throw error;
  }
};
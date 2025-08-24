import instance from './instance.js';

export const getBankAccount = async () => {
  try {
    const response = await instance.get('/pay/bank');
    return response.data;
  } catch (error) {
    console.error('계좌 조회 실패:', error);
    throw error;
  }
};
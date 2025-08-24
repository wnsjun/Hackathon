import axiosInstance from './axiosInstance';

// 코인 잔액 조회 API
export const getBalanceApi = async () => {
  try {
    const response = await axiosInstance.get('/pay');
    // /pay 엔드포인트는 숫자만 반환하므로 response.data가 코인 수
    return { money: response.data };
  } catch (error) {
    console.error('Get balance API error:', error);
    throw error;
  }
};

// 충전 API
export const chargeApi = async (money) => {
  try {
    const response = await axiosInstance.patch('/pay/charge', {
      money: money,
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
      money: money,
    });
    return response.data;
  } catch (error) {
    console.error('Exchange API error:', error);
    throw error;
  }
};

// 텃밭 결제 API
export const processPayment = async (farmData, ecoScoreUse = 0) => {
  try {
    const response = await axiosInstance.patch('/pay', {
      id: farmData.id,
      title: farmData.title,
      address: farmData.address,
      size: farmData.size,
      price: farmData.price,
      rentalPeriod: farmData.rentalPeriod,
      theme: farmData.theme,
      description: farmData.description,
      thumbnailUrl: farmData.thumbnailUrl || null,
      imageUrls: farmData.imageUrls || [],
      owner: {
        userId: farmData.owner?.userId,
        nickname: farmData.owner?.nickname
      },
      createdAt: farmData.createdAt,
      updatedTime: farmData.updatedTime,
      available: true,
      ecoScoreUse: ecoScoreUse,
    });
    return response.data;
  } catch (error) {
    console.error('Payment process API error:', error);
    throw error;
  }
};

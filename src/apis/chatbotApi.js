import instance from './instance.js';

export const sendChatbotMessage = async (query) => {
  try {
    const response = await instance.post('/api/chatbot/chat', {
      query: query,
    });
    return response.data;
  } catch (error) {
    console.error('Chatbot API 요청 실패:', error);
    throw error;
  }
};

export const sendChatbotDiagnose = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('plantType', '배추');
    
    const response = await instance.post('/api/chatbot/diagnose', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('병해진단 API 요청 실패:', error);
    throw error;
  }
};

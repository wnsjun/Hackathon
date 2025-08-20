// src/apis/mypage.js
import axiosInstance from './axiosInstance';

// ✅ 프로필 조회
export const getProfile = async () => {
  const { data } = await axiosInstance.get('/mypage/profile');
  return data;
};

// ✅ 유저 정보 수정
export const updateProfile = async (payload) => {
  const { data } = await axiosInstance.patch('/mypage/edit', payload);
  return data;
};

// ✅ 등록한 매물 조회
export const getMyFarms = async () => {
  const { data } = await axiosInstance.get('/mypage/farm');
  return data;
};

// ✅ 내가 빌린 매물
export const getUsedFarms = async () => {
  const { data } = await axiosInstance.get('/mypage/farm/used');
  return data;
};

// ✅ 북마크한 매물 조회
export const getBookmarkedFarms = async () => {
  const { data } = await axiosInstance.get('/mypage/farm/bookmark');
  return data;
};

// ✅ 등록 게시물 조회
export const getMyPosts = async () => {
  const { data } = await axiosInstance.get('/mypage/post');
  return data;
};

// ✅ 좋아요한 게시물 조회
export const getLikedPosts = async () => {
  const { data } = await axiosInstance.get('/mypage/post/like');
  return data;
};

// ✅ 프로필 사진 등록
export const uploadProfileImage = async (formData) => {
  const { data } = await axiosInstance.post('/mypage/edit/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// ✅ 친환경 점수 조회
export const getEcoScore = async () => {
  const { data } = await axiosInstance.get('/mypage/ecoscore');
  return data;
};

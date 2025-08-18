//mypage.js의 코드

import axiosInstance from './axiosInstance';

// 프로필 조회
export const getProfile = async () => {
  const { data } = await axiosInstance.get('/mypage/profile');
  return data;
};

// 내 텃밭 조회
export const getMyFarms = async () => {
  const { data } = await axiosInstance.get('/mypage/farm');
  return data.farms;
};

// 대여중인 텃밭 조회
export const getRentingFarms = async () => {
  const { data } = await axiosInstance.get('/mypage/farm/used');
  return data.farms;
};

// 북마크한 텃밭 조회
export const getBookmarkedFarms = async () => {
  const { data } = await axiosInstance.get('/mypage/farm/bookmark');
  return data.farms;
};

// 작성한 게시물
export const getWrittenPosts = async () => {
  const { data } = await axiosInstance.get('/mypage/post');
  return data;
};

// 좋아요 누른 게시물
export const getLikedPosts = async () => {
  const { data } = await axiosInstance.get('/mypage/post/like');
  return data;
};

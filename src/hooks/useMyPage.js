//hooks 폴더의 useMyPage.js의 코드

import { useQuery } from '@tanstack/react-query';
import {
  getProfile,
  getMyFarms,
  getUsedFarms,
  getBookmarkedFarms,
  getMyPosts,
  getLikedPosts,
  getEcoScore,
} from '../apis/mypage.js';

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

export const useMyFarms = () =>
  useQuery({
    queryKey: ['myFarms'],
    queryFn: getMyFarms,
  });

export const useUsedFarms = () =>
  useQuery({
    queryKey: ['usedFarms'],
    queryFn: getUsedFarms,
  });

export const useBookmarkedFarms = () =>
  useQuery({
    queryKey: ['bookmarkedFarms'],
    queryFn: getBookmarkedFarms,
  });

export const useMyPosts = () =>
  useQuery({
    queryKey: ['myPosts'],
    queryFn: getMyPosts,
  });

export const useLikedPosts = () =>
  useQuery({
    queryKey: ['likedPosts'],
    queryFn: getLikedPosts,
  });

export const useEcoScore = () =>
  useQuery({
    queryKey: ['ecoScore'],
    queryFn: getEcoScore,
  });

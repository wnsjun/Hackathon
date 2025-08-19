import { useQuery } from '@tanstack/react-query';
import {
  getProfile,
  getMyFarms,
  getRentingFarms,
  getBookmarkedFarms,
  getWrittenPosts,
  getLikedPosts,
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

export const useRentingFarms = () =>
  useQuery({
    queryKey: ['rentingFarms'],
    queryFn: getRentingFarms,
  });

export const useBookmarkedFarms = () =>
  useQuery({
    queryKey: ['bookmarkedFarms'],
    queryFn: getBookmarkedFarms,
  });

export const useWrittenPosts = () =>
  useQuery({
    queryKey: ['writtenPosts'],
    queryFn: getWrittenPosts,
  });

export const useLikedPosts = () =>
  useQuery({
    queryKey: ['likedPosts'],
    queryFn: getLikedPosts,
  });

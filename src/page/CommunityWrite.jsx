import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layouts/Navbar';
import ChatbotIcon from '../components/common/ChatbotIcon';
import { createPost } from '../apis/community';

const imgGroup137 = "/assets/f332ac80ce1bb25afbf288fde0eb65b12ba2ab2c.svg";
const img2 = "/assets/4c6f992d46ed8ac3206b03f54022654255248123.svg";

export const CommunityWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // URL 파라미터로 타입 받기 (기본값: certification)
  const searchParams = new URLSearchParams(location.search);
  const postType = searchParams.get('type') || 'certification';
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getPageTitle = () => {
    return postType === 'tips' ? '재배 팁 작성' : '인증 피드 작성';
  };

  const isFormValid = () => {
    return title.trim() !== '' && content.trim() !== '' && images.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // category 결정: tips -> TIP, 그 외 -> FEED
      const category = postType === 'tips' ? 'TIP' : 'FEED';
      
      const postData = {
        title: title.trim(),
        content: content.trim(),
        category: category
      };

      console.log('게시글 데이터:', postData);
      console.log('이미지 개수:', images.length);

      const response = await createPost(postData, images);
      console.log('게시글 작성 성공:', response);

      alert(`${getPageTitle()} 완료!`);
      navigate('/community');
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prevImages => [...prevImages, ...files]);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreviews(prevPreviews => [...prevPreviews, event.target.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const CameraIcon = () => (
    <div className="relative size-full">
      <div className="absolute inset-[18.75%_12.5%]">
        <img alt="camera" className="block max-w-none size-full" src={imgGroup137} />
      </div>
    </div>
  );

  const PlusIcon = () => (
    <div className="overflow-clip relative shrink-0 size-6">
      <div className="absolute inset-[12.5%]">
        <div className="absolute inset-[-4.167%]">
          <img alt="plus" className="block max-w-none size-full" src={img2} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen pt-20 md:pt-32 pb-24 md:pb-8">
        <div className="max-w-[1440px] mx-auto px-4 md:px-40 py-4 md:py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
            <h1 className="text-[24px] md:text-[32px] font-semibold text-black leading-[1.5] tracking-[-0.64px]">
              {getPageTitle()}
            </h1>
            <div className="hidden md:flex items-center gap-4">
              {/* Eco Score Display */}
              {isFormValid() && (
                <div className="flex items-center gap-1 text-[#1aa752]">
                  <span className="text-[16px] font-semibold">친환경 점수 +10</span>
                </div>
              )}
              <button
                onClick={handleSubmit}
                className={`px-7 py-3 rounded-[100px] flex items-center gap-2 transition-colors ${
                  isFormValid() && !isSubmitting
                    ? 'bg-[#1aa752] text-white' 
                    : 'bg-[#f7f7f7] text-[#bbbbbb] cursor-not-allowed'
                }`}
                disabled={!isFormValid() || isSubmitting}
              >
                <span className="text-[24px] tracking-[-0.48px]">
                  {isSubmitting ? '등록 중...' : '등록'}
                </span>
                <PlusIcon />
              </button>
            </div>
          </div>

          {/* Mobile Layout - md 이하에서만 표시 */}
          <div className="md:hidden flex flex-col space-y-6">
            {/* Image Upload - 첫 번째로 위치 */}
            <div className="bg-[#f7f7f7] min-h-[300px] rounded-2xl p-4">
              {imagePreviews.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 h-full">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        className="w-full h-[200px] object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {imagePreviews.length < 4 && (
                    <div 
                      className="border-2 border-dashed border-[#bbbbbb] rounded-lg flex flex-col items-center justify-center cursor-pointer h-[200px] hover:border-[#1aa752] transition-colors"
                      onClick={() => document.getElementById('mobileImageUpload').click()}
                    >
                      <div className="w-8 h-8">
                        <CameraIcon />
                      </div>
                      <p className="text-[12px] text-[#777777] leading-[1.5] tracking-[-0.42px]">
                        + 사진 추가
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div 
                  className="h-[300px] flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById('mobileImageUpload').click()}
                >
                  <div className="w-8 h-8">
                    <CameraIcon />
                  </div>
                  <p className="text-[12px] text-[#777777] leading-[1.5] tracking-[-0.42px]">
                    사진을 선택해주세요. (최대 4장)
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="mobileImageUpload"
              />
            </div>

            {/* Title - 두 번째로 위치 */}
            <div className="border-b border-[#bbbbbb] pb-2">
              <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-[24px] font-semibold text-black tracking-[-0.72px] bg-transparent outline-none placeholder-[#bbbbbb]"
              />
            </div>

            {/* Content - 세 번째로 위치 */}
            <div className="border-b border-[#bbbbbb] pb-2">
              <textarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full text-[16px] text-black tracking-[-0.6px] bg-transparent outline-none placeholder-[#bbbbbb] resize-none h-20"
              />
            </div>

            {/* Mobile Submit Button - 맨 아래 */}
            <div className="flex flex-col gap-4 mt-8">
              {isFormValid() && (
                <div className="flex items-center justify-center gap-1 text-[#1aa752]">
                  <span className="text-[14px] font-semibold">친환경 점수 +10</span>
                </div>
              )}
              <button
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                className={`w-full h-12 rounded-lg text-white font-semibold text-[20px] transition-colors ${
                  isFormValid() && !isSubmitting 
                    ? 'bg-[#1aa752] hover:bg-green-600 cursor-pointer' 
                    : 'bg-[#bbbbbb] cursor-not-allowed'
                }`}
              >
                {isSubmitting ? '등록 중...' : '등록하기'}
              </button>
            </div>
          </div>

          {/* Desktop Layout - md 이상에서만 표시 */}
          <div className="hidden md:flex flex-col gap-12 w-[739px]">
            {/* Image Upload */}
            <div className="bg-[#f7f7f7] min-h-[588px] rounded-2xl p-4">
              {imagePreviews.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 h-full">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        className="w-full h-[280px] object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {imagePreviews.length < 4 && (
                    <div 
                      className="border-2 border-dashed border-[#bbbbbb] rounded-lg flex flex-col items-center justify-center cursor-pointer h-[280px] hover:border-[#1aa752] transition-colors"
                      onClick={() => document.getElementById('imageUpload').click()}
                    >
                      <div className="w-8 h-8">
                        <CameraIcon />
                      </div>
                      <p className="text-[14px] text-[#777777] leading-[1.5] tracking-[-0.42px]">
                        + 사진 추가
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div 
                  className="h-[588px] flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById('imageUpload').click()}
                >
                  <div className="w-8 h-8">
                    <CameraIcon />
                  </div>
                  <p className="text-[14px] text-[#777777] leading-[1.5] tracking-[-0.42px]">
                    사진을 선택해주세요. (최대 4장)
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
            </div>

            {/* Title and Content */}
            <div className="flex flex-col gap-8">
              <div className="border-b border-[#bbbbbb] pb-2">
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-[36px] font-semibold text-black tracking-[-0.72px] bg-transparent outline-none placeholder-[#bbbbbb]"
                />
              </div>
              <div className="border-b border-[#bbbbbb] pb-2">
                <textarea
                  placeholder="내용을 입력하세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full text-[20px] text-black tracking-[-0.6px] bg-transparent outline-none placeholder-[#bbbbbb] resize-none h-20"
                />
              </div>
            </div>
          </div>
        </div>

        <ChatbotIcon />
      </div>
    </>
  );
};

export default CommunityWrite;
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layouts/Navbar';
import ChatbotIcon from '../components/common/ChatbotIcon';

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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const getPageTitle = () => {
    return postType === 'tips' ? '재배 팁 작성' : '인증 피드 작성';
  };

  const isFormValid = () => {
    return title.trim() !== '' && content.trim() !== '' && image !== null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      alert(`${getPageTitle()} 완료!`);
      navigate('/community');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
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
      <div className="bg-white min-h-screen pt-20">
        <div className="max-w-[1440px] mx-auto px-40 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-[32px] font-semibold text-black leading-[1.5] tracking-[-0.64px]">
              {getPageTitle()}
            </h1>
            <div className="flex items-center gap-4">
              {/* Eco Score Display */}
              {isFormValid() && (
                <div className="flex items-center gap-1 text-[#1aa752]">
                  <span className="text-[16px] font-semibold">친환경 점수 +10</span>
                </div>
              )}
              <button
                onClick={handleSubmit}
                className={`px-7 py-3 rounded-[100px] flex items-center gap-2 transition-colors ${
                  isFormValid()
                    ? 'bg-[#1aa752] text-white' 
                    : 'bg-[#f7f7f7] text-[#bbbbbb] cursor-not-allowed'
                }`}
                disabled={!isFormValid()}
              >
                <span className="text-[24px] tracking-[-0.48px]">등록</span>
                <PlusIcon />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-12 w-[739px]">
            {/* Image Upload */}
            <div 
              className="bg-[#f7f7f7] h-[588px] rounded-2xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden" 
              onClick={() => document.getElementById('imageUpload').click()}
            >
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8">
                    <CameraIcon />
                  </div>
                  <p className="text-[14px] text-[#777777] leading-[1.5] tracking-[-0.42px]">
                    사진을 선택해주세요.
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
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
import { useState } from 'react';
import { useParams} from 'react-router-dom';
import ChatbotIcon from '../components/common/ChatbotIcon';
import { Navbar } from '../components/layouts/Navbar';

const CommunityDetail = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [sortOrder, setSortOrder] = useState('register'); // 'register' or 'latest'

  // Assets from Figma design
  const imgEllipse82 = "http://localhost:3845/assets/03eab3ed8c78bad7cdec7c3357374c5806558d02.png";
  const imgRectangle161125945 = "http://localhost:3845/assets/99ed4a5b97b53e3180927bfe5bd3f23c7540750f.png";
  const imgEllipse83 = "http://localhost:3845/assets/08bc8f0fb0393f4fa955e7165c21fdf8b107680f.png";
  const imgVector = "http://localhost:3845/assets/747eb9418c39fe0ea8ada0911673f1cd281d2715.svg";
  const imgIconStroke = "http://localhost:3845/assets/fcf78ba651ba6c64f9aef73aba247eaf75c7443b.svg";
  const imgVector1 = "http://localhost:3845/assets/1b193f7832bcdbddc1ce4e049b217cc1f504e158.svg";
  const img2 = "http://localhost:3845/assets/7cf7e64aface95ddfb54c919d250b988a81ec18c.svg";
  const img3 = "http://localhost:3845/assets/3afd11aeb6e0ae97fee730309097f997072316f4.svg";

  // Mock data matching the Figma design
  const postData = {
    id: id,
    username: '준희',
    timeAgo: '1일 전',
    image: imgRectangle161125945,
    title: '흙 밟고 마음이 맑아졌어요',
    content: `아침 일찍 텃밭 갔다 왔어요.
삽질(?)하면서 잡생각이 사라지는 기분…
도심에서 이런 힐링이 가능하다는 게 참 좋네요 :)

흙 냄새 맡으면서 가만히 앉아있는데, 지나가던 바람도 다르게 느껴지더라고요.
자꾸 바쁘게만 살았던 요즘, 이 작은 텃밭이 제 일상의 속도를 조금 늦춰줬어요.
오늘은 흙 정리만 하고 왔는데도 마음이 꽤나 편안하네요.
주말마다 이 공간이 저에게 잠깐의 자연이자 쉼터가 되어주는 것 같아요.`,
    likes: 15,
    comments: [
      {
        id: 1,
        username: '준희',
        timeAgo: '1시간 전',
        content: '저는 상추랑 루꼴라로 시작했는데, 키우기 쉽고 금방 자라서 성취감도 있더라고요! 도전해보시면 분명 좋아하실 거예요 :)',
        isAuthor: true
      },
      {
        id: 2,
        username: '윤성',
        timeAgo: '1일 전',
        content: '와… 글만 읽어도 힐링되네요! 저도 요즘 스트레스가 많아서 텃밭 시작해보려는데, 처음엔 어떤 작물부터 키우는 게 좋을까요?',
        isAuthor: false
      }
    ]
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      console.log('새 댓글:', newComment);
      setNewComment('');
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };


  const HeartIcon = () => {
    return (
      <div className="relative size-full">
        <div className="absolute inset-0" />
        <div className="absolute inset-[8.33%_2.08%_7.7%_2.08%]">
          <img alt="" className="block max-w-none size-full" src={imgIconStroke} />
        </div>
      </div>
    );
  };

  const SendIcon = () => {
    return (
      <div className="relative size-full">
        <div className="absolute inset-[12.5%_12.5%_11.16%_11.16%]">
          <div className="absolute inset-[-3.07%]">
            <img alt="" className="block max-w-none size-full" src={imgVector1} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white relative min-h-screen font-pretendard">
      <Navbar />

      {/* Main Content */}
      <div className="absolute left-40 top-[116px] w-[739px] flex flex-col gap-6">
        {/* Post Header */}
        <div className="flex flex-row items-end justify-between w-full">
          <div className="flex flex-row items-center justify-between w-[1120px]">
            <div className="flex flex-row gap-4 items-center">
              <div className="flex flex-row gap-3 items-center">
                <div className="size-12">
                  <img alt="" className="block max-w-none size-full" height="48" src={imgEllipse82} width="48" />
                </div>
                <div className="font-semibold text-2xl text-black tracking-[-0.48px]">
                  {postData.username}
                </div>
              </div>
              <div className="font-normal text-xl text-[#777777] tracking-[-0.6px]">
                {postData.timeAgo}
              </div>
            </div>
            <div className="size-6 cursor-pointer" onClick={handleLikeToggle}>
              <HeartIcon />
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="flex flex-col gap-12 w-full">
          <div
            className="bg-center bg-cover bg-no-repeat h-[588px] rounded-2xl w-[739px]"
            style={{ backgroundImage: `url('${postData.image}')` }}
          />
          <div className="flex flex-col gap-8 w-[739px]">
            <div className="flex flex-row gap-8 items-center w-full">
              <div className="font-semibold text-4xl text-[#111111] tracking-[-0.72px] overflow-hidden w-[691px]">
                {postData.title}
              </div>
            </div>
            <div className="flex flex-row gap-8 items-end w-full">
              <div className="font-normal text-xl text-black tracking-[-0.6px] leading-[1.5] w-[739px] whitespace-pre-line">
                {postData.content}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="absolute top-[188px] w-[333px] h-[496px] flex flex-col justify-between" style={{ left: "calc(66.667% - 13px)" }}>
        <div className="flex flex-col gap-2 items-end w-full">
          {/* Sort Options */}
          <div className="flex flex-row gap-4 items-center w-[333px]">
            <div 
              className="flex flex-row gap-1 items-center cursor-pointer"
              onClick={() => handleSortChange('register')}
            >
              <div className="size-1">
                <img alt="" className="block max-w-none size-full" src={img2} />
              </div>
              <div className={`text-sm tracking-[-0.42px] ${
                sortOrder === 'register' ? 'text-neutral-900' : 'text-[#bbbbbb]'
              }`}>
                등록순
              </div>
            </div>
            <div 
              className="flex flex-row gap-1 items-center cursor-pointer"
              onClick={() => handleSortChange('latest')}
            >
              <div className="size-1">
                <img alt="" className="block max-w-none size-full" src={img3} />
              </div>
              <div className={`text-sm tracking-[-0.42px] ${
                sortOrder === 'latest' ? 'text-neutral-900' : 'text-[#bbbbbb]'
              }`}>
                최신순
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="bg-white flex flex-col gap-2 rounded-tl-lg rounded-tr-lg w-[333px]">
            <div className="flex flex-col w-full">
              {postData.comments.map((comment) => (
                <div key={comment.id} className="bg-white flex flex-col gap-2 items-end px-0 py-4 w-full">
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row gap-2 items-center">
                      <div className="size-8">
                        <img alt="" className="block max-w-none size-full" height="32" src={imgEllipse83} width="32" />
                      </div>
                      <div className="flex flex-row gap-2 items-end">
                        <div className="font-semibold text-base text-neutral-900 tracking-[-0.48px]">
                          {comment.username}
                        </div>
                        <div className="flex flex-row gap-1 items-center text-sm tracking-[-0.42px]">
                          {comment.isAuthor && (
                            <>
                              <div className="text-[#1aa752]">작성자</div>
                              <div className="text-[#bbbbbb]">·</div>
                            </>
                          )}
                          <div className="text-[#bbbbbb]">{comment.timeAgo}</div>
                        </div>
                      </div>
                    </div>
                    {comment.isAuthor && (
                      <div className="text-[#777777] text-sm tracking-[-0.42px] cursor-pointer">
                        삭제
                      </div>
                    )}
                  </div>
                  <div className="text-base text-neutral-900 tracking-[-0.48px] leading-[1.5] w-[293px]">
                    {comment.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comment Input */}
        <div className="flex flex-row items-center justify-between pl-8 pr-6 py-0 h-14 rounded-full border border-[#1aa752] w-full">
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요."
            className="flex-1 bg-transparent text-base text-[#bbbbbb] tracking-[-0.48px] border-none outline-none"
          />
          <div className="overflow-clip size-8 cursor-pointer" onClick={handleCommentSubmit}>
            <SendIcon />
          </div>
        </div>
      </div>
      
      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
    </div>
  );
};

export default CommunityDetail;
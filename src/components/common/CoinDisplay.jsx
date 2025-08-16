import { useState, useEffect } from 'react';

function CoinIcon() {
  return (
    <div className="relative size-full">
      <div className="absolute aspect-[180/180] contents left-0 right-0 top-0">
        <div className="absolute aspect-[260/260] left-0 right-0 top-0" />
      </div>
      <div className="absolute aspect-[148/147.625] left-[8.89%] right-[8.89%] top-[2.84px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M12.8007 27.0667V17.104C9.94415 17.104 6.07622 16.5551 4.93359 9.7334C7.40928 9.99477 11.3486 10.8625 13.8298 14.7517C14.7275 12.8698 17.8616 9.7334 22.8891 9.7334C22.4811 13.2619 19.4939 17.104 15.054 17.104" stroke="#1AA752" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.6669 27.0891C6.02755 26.4208 0.844727 20.8158 0.844727 14.0003C0.844727 6.73467 6.73467 0.844727 14.0003 0.844727C21.2659 0.844727 27.1558 6.73467 27.1558 14.0003C27.1558 19.1578 24.188 23.6221 19.8669 25.7785" stroke="#1AA752" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      </div>
    </div>
  );
}

export const CoinDisplay = ({ coinBalance = 50000 }) => {
  const [displayBalance, setDisplayBalance] = useState(coinBalance);

  useEffect(() => {
    setDisplayBalance(coinBalance);
  }, [coinBalance]);

  const formatCoinBalance = (balance) => {
    return balance.toLocaleString();
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-start">
      <div className="relative shrink-0 size-8">
        <CoinIcon />
      </div>
      <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1aa752] text-[20px] text-left text-nowrap tracking-[-0.6px]">
        <p className="block leading-[1.5] whitespace-pre">{formatCoinBalance(displayBalance)}</p>
      </div>
    </div>
  );
};
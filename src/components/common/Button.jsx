// const Button = ({
//   children,
//   onClick,
//   disabled = false,
//   color = 'green',
//   type = 'button',
//   ...props
// }) => {
//   const baseClasses =
//     'px-4 py-2 rounded text-white font-semibold focus:outline-none transition';
//   const colors = {
//     blue: 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300',
//     red: 'bg-red-600 hover:bg-red-700 disabled:bg-red-300',
//     green: 'bg-green-600 hover:bg-green-700 disabled:bg-green-300',
//     gray: 'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300',
//   };
//   const colorClasses = colors[color] || colors.green;

//   return (
//     <button
//       type={type}
//       className={`${baseClasses} ${colorClasses} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
//       onClick={disabled ? undefined : onClick}
//       disabled={disabled}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;

const Button = ({
  children,
  onClick,
  disabled = false,
  color = 'green',
  variant = 'default',
  type = 'button',
  showIcon = true,
  ...props
}) => {
  const baseClasses = 'rounded focus:outline-none transition select-none';

  const colors = {
    blue: 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white',
    red: 'bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white',
    green: 'bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white',
    gray: 'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white',
    next: '', // next 버튼은 별도 처리
    review: '', // review 버튼은 별도 처리
  };

  // next 버튼 스타일
  if (color === 'next') {
    const nextButtonStyle = {
      display: 'flex',
      height: '62px',
      padding: '10px 20px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      alignSelf: 'stretch',
      borderRadius: '8px',
      background: disabled ? '#F7F7F7' : '#1AA752',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
    };

    const nextButtonTextStyle = {
      color: disabled ? '#BBB' : '#FFF',
      textAlign: 'center',
      fontFamily: 'Pretendard',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '-0.6px',
      userSelect: 'none',
    };

    return (
      <button
        type={type}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        style={nextButtonStyle}
        {...props}
      >
        <span style={nextButtonTextStyle}>{children}</span>
      </button>
    );
  }

  // if (variant === 'farm') {
  //   return (
  //     <button
  //       type={type}
  //       onClick={disabled ? undefined : onClick}
  //       disabled={disabled}
  //       className="bg-[#1aa752] hover:bg-green-600 text-white px-7 py-3 rounded-[100px] font-normal text-[24px] leading-[1.5] tracking-[-0.48px] transition-colors shadow-sm flex items-center gap-2"
  //       {...props}
  //     >
  //       {children}
  //       {showIcon && (
  //         <svg
  //           width="24"
  //           height="24"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           className="text-white"
  //         >
  //           <path
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             d="M12 5v14M5 12h14"
  //           />
  //         </svg>
  //       )}
  //     </button>
  //   );
  // }

  if (variant === 'farm') {
    return (
      <button
        type={type}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className="bg-[#1aa752] hover:bg-green-600 text-white px-7 py-3 rounded-[100px] font-normal text-[24px] leading-[1.5] tracking-[-0.48px] transition-colors shadow-sm flex items-center gap-2"
        {...props}
      >
        {children}
        {showIcon && (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14M5 12h14"
            />
          </svg>
        )}
      </button>
    );
  }

  // review 버튼 스타일
  if (color === 'review') {
    const reviewButtonStyle = {
      display: 'flex',
      height: '52px',
      padding: '10px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      alignSelf: 'stretch',
      borderRadius: '12px',
      background: disabled ? '#F7F7F7' : '#1AA752',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      width: '100%',
    };

    const reviewButtonTextStyle = {
      color: disabled ? '#BBB' : '#FFF',
      textAlign: 'center',
      fontFamily: 'Pretendard',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '150%', // 30px
      letterSpacing: '-0.6px',
      userSelect: 'none',
    };

    return (
      <button
        type={type}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        style={reviewButtonStyle}
        {...props}
      >
        <span style={reviewButtonTextStyle}>{children}</span>
      </button>
    );
  }

  // 기본 버튼 (blue, red, green, gray)
  const colorClasses = colors[color] || colors.green;

  return (
    <button
      type={type}
      className={`${baseClasses} px-4 py-2 ${colorClasses} ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

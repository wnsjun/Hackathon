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
  type = 'button',
  ...props
}) => {
  const baseClasses = 'rounded focus:outline-none transition select-none';

  const colors = {
    blue: 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white',
    red: 'bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white',
    green: 'bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white',
    gray: 'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white',
    next: '', // next 버튼은 스타일 직접 지정
  };

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
      background: disabled ? 'var(--F7F7F7, #F7F7F7)' : 'var(--Main, #1AA752)',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: 1,
    };

    const nextButtonTextStyle = {
      color: disabled ? 'var(--BBB, #BBB)' : 'var(--100, #FFF)',
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
        style={nextButtonStyle}
        {...props}
      >
        <span style={nextButtonTextStyle}>{children}</span>
      </button>
    );
  }

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

const Button = ({
  children,
  onClick,
  disabled = false,
  color = 'green',
  type = 'button',
  ...props
}) => {
  const baseClasses =
    'px-4 py-2 rounded text-white font-semibold focus:outline-none transition';
  const colors = {
    blue: 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300',
    red: 'bg-red-600 hover:bg-red-700 disabled:bg-red-300',
    green: 'bg-green-600 hover:bg-green-700 disabled:bg-green-300',
    gray: 'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300',
  };
  const colorClasses = colors[color] || colors.green;

  return (
    <button
      type={type}
      className={`${baseClasses} ${colorClasses} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;


const CheckSquareContained = ({ check = "off" }) => {
  const UncheckedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6.99609 19.9961C5.33924 19.9961 3.99609 18.653 3.99609 16.9961V6.99608C3.99609 5.33923 5.33924 3.99609 6.99609 3.99609H16.9961C18.6529 3.99609 19.9961 5.33923 19.9961 6.99608L19.9961 16.9961C19.9961 18.653 18.6529 19.9961 16.9961 19.9961H6.99609Z" stroke="#BBBBBB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CheckedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14.9961 9.99606L10.5214 13.996L8.99609 12.6326M19.9961 6.99608L19.9961 16.9961C19.9961 18.653 18.6529 19.9961 16.9961 19.9961H6.99609C5.33924 19.9961 3.99609 18.653 3.99609 16.9961V6.99608C3.99609 5.33923 5.33924 3.99609 6.99609 3.99609H16.9961C18.6529 3.99609 19.9961 5.33923 19.9961 6.99608Z" stroke="#1AA752" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 20C5.34315 20 4 18.6569 4 17V6.99998C4 5.34314 5.34315 4 7 4H17C18.6569 4 20 5.34314 20 6.99998L20 17C20 18.6569 18.6569 20 17 20H7Z" fill="#1AA752"/>
      <path d="M15 9.99997L10.5253 13.9999L9 12.6365M14.998 10L10.5233 14L8.99805 12.6365M20 6.99998L20 17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V6.99998C4 5.34314 5.34315 4 7 4H17C18.6569 4 20 5.34314 20 6.99998Z" stroke="#1AA752" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.001 9L10.5277 14.9999L9.00293 12.9547M14.999 9.00005L10.5258 15L9.00098 12.9548" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="size-full">
      {check === "on" ? <CheckedIcon /> : <UncheckedIcon />}
    </div>
  );
};

export default CheckSquareContained;
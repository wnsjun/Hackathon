
const imgIcon = "/assets/0c213fa412158e69c417f7f3f9a33b576fa937fb.svg";
const imgIcon1 = "/assets/63ea9dadaf45f7aeacc39bd3e1fc65988e2c7937.svg";
const imgIcon2 = "/assets/5da0f602dc8ef551c63f5aa938301f9f75bb6c00.svg";
const imgIcon3 = "/assets/ae2623335aca9a1489224341745b5fd505036f41.svg";
const imgIcon4 = "/assets/b8adccf9e22071356fcfe0b130ed938b3de35304.svg";

const CheckSquareContained = ({ check = "off" }) => {
  if (check === "off") {
    return (
      <div className="relative size-full" data-name="check=off">
        <div className="absolute inset-[16.65%_16.68%_16.68%_16.65%]">
          <div className="absolute inset-[-4.69%]">
            <img alt="" className="block max-w-none size-full" src={imgIcon} />
          </div>
        </div>
        <div className="absolute inset-[16.65%_16.68%_16.68%_16.65%]">
          <img alt="" className="block max-w-none size-full" src={imgIcon1} />
        </div>
      </div>
    );
  }
  return (
    <div className="relative size-full" data-name="check=on">
      <div className="absolute inset-[16.65%_16.68%_16.68%_16.65%]">
        <div className="absolute inset-[-6.25%]">
          <img alt="" className="block max-w-none size-full" src={imgIcon2} />
        </div>
      </div>
      <div className="absolute inset-[16.667%]">
        <div className="absolute inset-[-4.69%]">
          <img alt="" className="block max-w-none size-full" src={imgIcon3} />
        </div>
      </div>
      <div className="absolute inset-[37.5%]">
        <div 
          className="absolute inset-[-12.5%]"
          style={{ "--stroke-0": "rgba(255, 255, 255, 1)" }}
        >
          <img alt="" className="block max-w-none size-full" src={imgIcon4} />
        </div>
      </div>
    </div>
  );
};

export default CheckSquareContained;
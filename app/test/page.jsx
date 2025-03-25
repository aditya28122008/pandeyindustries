"use client";
import Slider from "react-slick";
const Test = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHovor: true,
    swipeToSlide: true,
    appendDots: dots => (
      <div
        style={{
          backgroundColor: "#ddd",
          borderRadius: "10px",
          padding: "10px"
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="">
      <Slider {...settings}>
        <div className="rounded-xl h-[200px] w-[1450px] bg-blue-400 mt-10 text-white text-4xl flex flex-col items-center justify-center">
          1
        </div>
        <div className="rounded-xl h-[200px] w-[1450px] bg-blue-400 mt-10 text-white text-4xl flex flex-col items-center justify-center">
          2
        </div>
        <div className="rounded-xl h-[200px] w-[1450px] bg-blue-400 mt-10 text-white text-4xl flex flex-col items-center justify-center">
          3
        </div>
        <div className="rounded-xl h-[200px] w-[1450px] bg-blue-400 mt-10 text-white text-4xl flex flex-col items-center justify-center">
          4
        </div>
        <div className="rounded-xl h-[200px] w-[1450px] bg-blue-400 mt-10 text-white text-4xl flex flex-col items-center justify-center">
          5
        </div>
        <div className="rounded-xl h-[200px] w-[1450px] bg-blue-400 mt-10 text-white text-4xl flex items-center justify-center">
          6
        </div>
        <div className="rounded-xl h-[200px] w-[1450px] bg-blue-400 mt-10 text-white text-4xl flex flex-col items-center justify-center">
          7
        </div>
        <div className="rounded-xl h-[200px] w-[1450px] bg-blue-400 mt-10 text-white text-4xl flex flex-col items-center justify-center">
          8
        </div>
      </Slider>
    </div>
  );
};

export default Test;

import React, { useState } from 'react';
import { MdOutlineEast, MdOutlineWest } from 'react-icons/md';

const images = [
  {
    id: 1,
    img: 'https://www.thespruceeats.com/thmb/4Uxr_CKC7aR-UhEicIvVqLaiO0k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-488636063-5ab2dbd8a8ff48049cfd36e8ad841ae5.jpg',
  },
  {
    id: 2,
    img: 'https://media.istockphoto.com/id/1869158840/photo/close-up-womans-hand-woman-selecting-a-bottle-of-water-from-the-shelf-in-a-grocery-store.jpg?s=1024x1024&w=is&k=20&c=OhhGQIuvab9aFYJO7xtXWZ4p9xhaKJBQ0VNLOeN8Y5E=',
  },
  {
    id: 3,
    img: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const Slider = () => {
  const [slide, setSlide] = useState(0);

  const handlePrevSlide = () => {
    setSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${slide * 100}%)` }}
      >
        {images.map((item) => (
          <div key={item.id} className="min-w-full h-full">
            <img
              src={item?.img}
              alt={`Slide ${item.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute top-[90%] w-full flex justify-evenly  px-4 transform -translate-y-1/2">
      <div>
        <button
          onClick={handlePrevSlide}
          className="bg-gray-800 text-white m-4 p-2 rounded-full hover:bg-gray-600"
        >
          <MdOutlineWest size={28} />
        </button>
        <button
          onClick={handleNextSlide}
          className="bg-gray-800 text-white p-2 m-4  rounded-full hover:bg-gray-600"
        >
          <MdOutlineEast size={28} />
        </button>
      </div>
      </div>
    </div>
  );
};

export default Slider;

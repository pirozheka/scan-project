import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import SliderCard from "./SliderCard";

const sliderData = [
  {
    iconSrc: 'assets/clock.png',
    text: 'Высокая и оперативная скорость обработки заявки'
  },
  {
    iconSrc: 'assets/search.png',
    text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
  },
  {
    iconSrc: 'assets/lock.png',
    text: 'Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству'
  }
];

export default function Slider() {
  return (
    <div className="relative mt-[70px] px-6 flex justify-center h-64">
      <Swiper 
        height={100}
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={5}
        breakpoints={{
          780: { slidesPerView: 2, spaceBetween: 10},
          1024: { slidesPerView: 3, spaceBetween: 20}
        }}
        navigation
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <SliderCard iconSrc={item.iconSrc} text={item.text} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
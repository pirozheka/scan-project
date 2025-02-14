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
    text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'
  }
];

export default function Slider() {
  return (
    <div className="flex mt-[70px] justify-between mx-6">
      {sliderData.map((item, index) => (
        <SliderCard key={index} iconSrc={item.iconSrc} text={item.text} />
      ))}
    </div>
  );
}
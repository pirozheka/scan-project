import Slider from "../../ui/Slider";

export default function Options() {

    return (
        <div className="mt-24 px-14">
            <h2 className="font-ferry font-bold text-4xl lg:text-5xl">Почему именно мы</h2>
                <Slider />
            <img src="assets/large_img.png" alt="Изображение" className="mt-[70px]" />
        </div>
    );
}
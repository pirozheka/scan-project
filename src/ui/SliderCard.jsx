export default function SliderCard({iconSrc, text}) {

    return (
        <div className="flex flex-col px-5 py-8 max-w-[400px] shadow-custom rounded-lg h-52 mt-2">
            <div>
                <img src={iconSrc} alt="" className="w-16 h-16"/>
                <p className="mt-5 text-lg leading-none font-[400]">{text}</p>
            </div>       
        </div>
    );
}
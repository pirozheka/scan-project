export default function SliderCard({iconSrc, text}) {

    return (
        <div className="flex flex-col">
            <div>
                <img src={iconSrc} alt="" />
                <p>{text}</p>
            </div>
            
        </div>
    );
}
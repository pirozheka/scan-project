export default function PricingCard({props}) {

    return (
        <div className="flex flex-col">
          <div>
            <div>
              <p>{props.title}</p>
              <p>{props.subtitle}</p>
            </div>
            <img src={props.iconSrc} alt="" />
          </div>
          <div className="flex gap-2">
            <span className="font-bold">
              {props.currentPrice}  ₽
            </span>
            <span className=""> 
               {props.oldPrice}
            </span>
          </div>
          <div>
            <p>В тариф входит:</p>
            <ul>
              {props.tariffOptions.map((option, index) => (
                <li key={index} className="flex gap-1">
                    <img src="assets/ok_icon.png" alt="" />{option}
                </li>
              ))}
            </ul>
          </div> 
        </div>
      );
    }
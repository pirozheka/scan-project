export default function PricingCard({
  title,
  subtitle,
  iconSrc,
  color,
  currentPrice,
  oldPrice,
  creditDescription,
  tariffOptions,
  isCurrent,
  isLoggedIn
}) {
  // Подставляем классы фона по значению color
  const bgColorClasses = {
    orange: 'bg-orange',
    lightAqua: 'bg-lightAqua',
    black: 'bg-black'
  };

  return (
    <div className="relative flex flex-col w-full max-w-sm border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className={`${bgColorClasses[color] || 'bg-orange'} px-5 py-4 flex h-32 justify-center`}>
        <div className="">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/80">{subtitle}</p>
        </div>
        <img src={iconSrc} alt={`${title} icon`} className="mt-4 w-12 h-12" />
      </div>


      <div className="p-5 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-bold text-black">{currentPrice} ₽</span>
          {oldPrice && (
            <span className="text-gray-400 line-through">{oldPrice} ₽</span>
          )}
        </div>

        {creditDescription && (
          <p className="text-sm text-gray-500 mb-4">{creditDescription}</p>
        )}

        <div>
          <p className="text-base font-medium text-black">В тариф входит:</p>
          <ul className="mt-2 space-y-2 pb-14">
            {tariffOptions.map((option, index) => (
              <li key={index} className="flex items-start gap-2">
                <img
                  src="assets/ok_icon.png"
                  alt="✓"
                  className="w-4 h-4 mt-0.5"
                />
                <span className="text-sm text-black">{option}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          {isCurrent && isLoggedIn ? (
            <button className="w-full bg-black opacity-40 text-white py-2 px-4 rounded-md">
              Перейти в личный кабинет
            </button>
          ) : (
            <button className="w-full bg-violet text-white py-2 px-4 rounded-md">
              Подробнее
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

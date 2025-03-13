import PricingCard from '../../ui/PricingCard';
import { useUser } from '../../context/UserContext';

export default function Pricing({ isLoggedIn }) {
    const { userOption } = useUser();

    const pricingData = [
        {
            title: 'Beginner',
            subtitle: 'Для небольшого исследования',
            iconSrc: 'assets/lamp.png',
            isCurrent: true,
            currentPrice: 799,
            color: 'oranges',
            oldPrice: 1299,
            creditDescription: 'или 150 ₽/мес. при рассрочке на 24 мес.',
            tariffOptions: [
                'Безлимитная история запросов',
                'Безопасная сделка',
                'Поддержка 24/7'
            ]
        },
        {
            title: 'Pro',
            subtitle: 'Для HR и фрилансеров',
            iconSrc: 'assets/goal.png',
            isCurrent: false,
            currentPrice: 1299,
            color: 'lightAqua',
            oldPrice: 2600,
            creditDescription: 'или 279 ₽/мес. при рассрочке на 24 мес.',
            tariffOptions: [
                'Все пункты тарифа Beginner',
                'Экспорт истории',
                'Рекомендации по приоритетам'
            ]
        },
        {
            title: 'Business',
            subtitle: 'Для корпоративных клиентов',
            iconSrc: 'assets/laptop.png',
            isCurrent: false,
            currentPrice: 2379,
            color: 'black',
            oldPrice: 3700,
            creditDescription: '',
            tariffOptions: [
                'Все пункты тарифа Pro',
                'Безлимитное количество запросов',
                'Приоритетная поддержка'
            ]
        }
    ];

    return (
        <div className='mt-24 px-4 md:px-14'>
            <h2 className='font-ferry font-bold text-3xl md:text-4xl lg:text-5xl text-center md:text-left'>
                Наши тарифы
            </h2>
            <div className="flex flex-col md:flex-row mt-8 md:mt-[70px] w-full md:w-10/12 justify-center md:justify-between gap-6 md:gap-10 mb-8 mx-auto">
                {pricingData.map((item, index) => (
                    <PricingCard key={index} {...item} isCurrent={userOption === item.title}  isLoggedIn={isLoggedIn} />
                ))}
            </div>
        </div>
    );
}
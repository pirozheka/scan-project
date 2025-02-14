import PricingCard from '../../ui/PricingCard'

export default function Pricing() {

    const pricingData = [
        {
            title: 'Beginner',
            subtitle: 'Для небольшого исследования',
            iconSrc: 'assets/lamp.png',
            isCurrent: 'True',
            currentPrice: 799,
            color: 'orange',
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
            isCurrent: 'False',
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
            isCurrent: 'False',
            currentPrice: 2379,
            color: 'black',
            oldPrice: 3700,
            creditDescription: ' ',
            tariffOptions: [
                'Все пункты тарифа Pro',
                'Безлимитное количество запросов',
                'Приоритетная поддержка'
            ]
        }
    ]
    return (
        <div className='mt-24 px-14'>
            <h2 className='font-ferry font-bold text-5xl'>Наши тарифы</h2>
            <div className="flex mt-[70px]">
                {pricingData.map((item, index) => (
                    <PricingCard key={index} props={item}/>
                ))}
            </div>
        </div>
    );
}
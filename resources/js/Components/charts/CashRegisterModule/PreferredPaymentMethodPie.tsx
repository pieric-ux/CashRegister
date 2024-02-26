import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarImage } from '../../ui/avatar/avatar';
import { type Transaction } from '@/Shared/Types/TransactionTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { type PaymentMethod } from '@/Shared/Types/PaymentMethodsTypes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_payment_methods: (PaymentMethod & { cr_transactions: Transaction[] })[];
    };
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function PreferredPaymentMethodPie() {
    const { t } = useTranslation();
    const { cashRegisterModule } = usePage<PageProps>().props;

    const CustomLegend = () => {
        return (
            <div className='mt-4 flex items-center justify-center gap-7'>
                {cashRegisterModule.cr_payment_methods.map((paymentMethod, index) => (
                    <div key={index} className='flex items-center justify-center gap-2'>
                        <Avatar variant={'square'} className='h-6 w-6 md:h-10 md:w-10'>
                            <AvatarImage
                                src={paymentMethod.media[0].original_url}
                                alt={paymentMethod.name}
                            />
                        </Avatar>

                        <span
                            className='font-semibold md:text-xl'
                            style={{ color: COLORS[index % COLORS.length] }}
                        >
                            {t(paymentMethod.name)}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    const getCountTransactions = cashRegisterModule.cr_payment_methods.reduce(
        (count, paymentMethod) => count + paymentMethod.cr_transactions.length,
        0,
    );

    const data = cashRegisterModule.cr_payment_methods.map((paymentMethod) => {
        return {
            name: paymentMethod.name,
            value: paymentMethod.cr_transactions.length,
            percentage: (paymentMethod.cr_transactions.length / getCountTransactions) * 100,
        };
    });

    const CustomeLabel = ({ percentage }: { percentage: number }) => {
        const roundedPourcentage = Math.round(percentage);

        return roundedPourcentage === percentage
            ? `${roundedPourcentage}%`
            : `${percentage.toFixed(2)}%`;
    };

    const preferredPaymentMethod = data.reduce((maxPaymentMethod, currentPaymentMethod) => {
        return currentPaymentMethod.value > maxPaymentMethod.value
            ? currentPaymentMethod
            : maxPaymentMethod;
    }, data[0]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('Preferred Payment Methods')}</CardTitle>
                <CardDescription>{t(preferredPaymentMethod.name)}</CardDescription>
            </CardHeader>
            <CardContent className='h-52 items-center justify-center'>
                <ResponsiveContainer>
                    <PieChart title={t('Preferred Payment Methods')} margin={{ top: 20 }}>
                        <Pie
                            data={data}
                            cy='90%'
                            startAngle={180}
                            endAngle={0}
                            innerRadius={60}
                            outerRadius={80}
                            fill='#8884d8'
                            paddingAngle={10}
                            dataKey='value'
                            label={CustomeLabel}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend content={<CustomLegend />} />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

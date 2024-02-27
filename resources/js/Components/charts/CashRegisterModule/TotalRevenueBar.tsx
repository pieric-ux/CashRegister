import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarImage } from '../../ui/avatar/avatar';
import useCurrencyFormatter from '@/Hooks/useCurrencyFormatter';
import { type Transaction } from '@/Shared/Types/TransactionTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { type PaymentMethod } from '@/Shared/Types/PaymentMethodsTypes';
import { Bar, BarChart, Cell, LabelProps, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card/card';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_payment_methods: (PaymentMethod & { cr_transactions: Transaction[] })[];
    };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function TotalRevenueBar() {
    const { t } = useTranslation();
    const { currencySymbol } = useCurrencyFormatter();
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

    const data = cashRegisterModule.cr_payment_methods.map((paymentMethod) => {
        return {
            name: paymentMethod.name,
            value: parseFloat(
                paymentMethod.cr_transactions
                    .reduce((total, transaction) => total + transaction.total * 1, 0)
                    .toFixed(2),
            ),
        };
    });

    const CustomLabel = ({ x, y, width, value, index }: LabelProps) => {
        const { formattedAmount } = useCurrencyFormatter(value as number);

        const validIndex = typeof index === 'number' ? index : 0;
        const validX = typeof x === 'number' ? x : 0;
        const validWidth = typeof width === 'number' ? width : 0;

        return (
            <text
                x={validX + validWidth / 2}
                y={y}
                fill={COLORS[validIndex]}
                textAnchor='middle'
                dy={-6}
                className='text-sm md:text-base'
            >
                {`${formattedAmount}`}
            </text>
        );
    };

    const totalRevenue = data.reduce((total, paymentMethod) => total + paymentMethod.value, 0);
    const { formattedAmount } = useCurrencyFormatter(totalRevenue);

    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>{t('Total Revenue')}</CardTitle>
                    <span>{currencySymbol}</span>
                </div>
                <CardDescription>{formattedAmount}</CardDescription>
            </CardHeader>
            <CardContent className='h-52 items-center justify-center'>
                <ResponsiveContainer>
                    <BarChart title={t('Total Revenue')} data={data} className='mt-5'>
                        <Bar dataKey='value' label={CustomLabel}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    stroke='#fff'
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Bar>
                        <Legend content={<CustomLegend />} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

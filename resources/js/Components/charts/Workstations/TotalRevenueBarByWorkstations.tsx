import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Employee } from '@/Shared/Types/EmployeeTypes';
import { Avatar, AvatarImage } from '../../ui/avatar/avatar';
import useCurrencyFormatter from '@/Hooks/useCurrencyFormatter';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { type Transaction } from '@/Shared/Types/TransactionTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { type PaymentMethod } from '@/Shared/Types/PaymentMethodsTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card/card';
import { Bar, BarChart, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_payment_methods: (PaymentMethod & { cr_transactions: Transaction[] })[];
        cr_workstations: (Workstation & { cr_employees: Employee[] })[];
    };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function TotalRevenueBarByWorkstations() {
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

    const data = cashRegisterModule.cr_workstations.slice(1).map((workstation) => {
        const workstationData = {
            name: workstation.name,
            ...cashRegisterModule.cr_payment_methods.reduce(
                (acc, paymentMethod) => {
                    const totalAmount = paymentMethod.cr_transactions
                        .filter((transaction) => transaction.workstation === workstation.name)
                        .reduce((sum, transaction) => sum + transaction.total * 1, 0);

                    acc[paymentMethod.name] = totalAmount.toFixed(2);
                    return acc;
                },
                {} as { [key: string]: string },
            ),
        };

        return workstationData;
    });

    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>{t('Total Revenue')}</CardTitle>
                    <span>{currencySymbol}</span>
                </div>
            </CardHeader>
            <CardContent className='h-52 items-center justify-center'>
                <ResponsiveContainer>
                    <BarChart title={t('Total Revenue')} data={data} margin={{ top: 20 }}>
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Legend content={<CustomLegend />} />
                        {Object.keys(data[0])
                            .filter((key) => key !== 'name')
                            .map((key, index) => (
                                <Bar
                                    key={`${key}-${index}`}
                                    dataKey={key}
                                    stackId={'a'}
                                    fill={COLORS[index]}
                                >
                                    {data.map((dataIndex) => (
                                        <Cell
                                            key={`cell-${dataIndex}`}
                                            stroke='#fff'
                                            fill={COLORS[index]}
                                        />
                                    ))}
                                </Bar>
                            ))}
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

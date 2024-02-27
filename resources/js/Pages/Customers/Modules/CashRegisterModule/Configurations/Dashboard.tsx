import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import TotalDishes from '@/Components/charts/CashRegisterModule/TotalDishes';
import TotalProducts from '@/Components/charts/CashRegisterModule/TotalProducts';
import TotalEmployees from '@/Components/charts/CashRegisterModule/TotalEmployees';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs/tabs';
import TotalRevenueBar from '@/Components/charts/CashRegisterModule/TotalRevenueBar';
import TotalWorkstations from '@/Components/charts/CashRegisterModule/TotalWorksations';
import TotalTransactions from '@/Components/charts/CashRegisterModule/TotalTransactions';
import TotalCategoriesProducts from '@/Components/charts/CashRegisterModule/TotalCategoriesProducts';
import PreferredPaymentMethodPie from '@/Components/charts/CashRegisterModule/PreferredPaymentMethodPie';
import TotalRevenueBarByWorkstations from '@/Components/charts/Workstations/TotalRevenueBarByWorkstations';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister;
}

export default function Dashboard(): JSX.Element {
    const { t } = useTranslation();
    const { cashRegisterModule } = usePage<PageProps>().props;

    return (
        <>
            <Head title={cashRegisterModule.name} />
            <Tabs defaultValue='Overview'>
                <TabsList className='mb-4 grid grid-cols-2'>
                    <TabsTrigger value='Overview'>{t('Overview')}</TabsTrigger>
                    <TabsTrigger value='Workstations'>{t('Workstations')}</TabsTrigger>
                </TabsList>
                <TabsContent value='Overview' className='flex flex-col gap-4'>
                    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
                        <TotalEmployees />
                        <TotalWorkstations />
                        <TotalCategoriesProducts />
                        <TotalProducts />
                        <TotalDishes />
                        <TotalTransactions />
                    </div>

                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <PreferredPaymentMethodPie />
                        <TotalRevenueBar />
                    </div>
                </TabsContent>
                <TabsContent value='Workstations'>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <TotalRevenueBarByWorkstations />
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
}

Dashboard.layout = (page: JSX.Element) => <CashRegisterConfigurationsLayout children={page} />;

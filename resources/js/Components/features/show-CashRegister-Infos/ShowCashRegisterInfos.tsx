import { Link } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import InfoBlock from '@/Components/features/show-CashRegister-Infos/InfoBlock';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card/card';
import { UpdateModulePosterForm } from '@/Components/forms/Common/UpdateModulePosterForm';
import UpdateCashRegister from '@/Pages/Customers/Modules/CashRegisterModule/Components/UpdateCashRegister';
import DeleteCashRegister from '@/Pages/Customers/Modules/CashRegisterModule/Components/DeleteCashRegister';

export default function ShowCashRegisterInfos({ application }): JSX.Element {
    const { t } = useTranslation();

    return (
        <Card>
            <CardHeader variant={'flex-row'} size={'4xl'} className='relative'>
                <CardTitle>{application.name}</CardTitle>

                <div className='absolute right-4 top-4 flex gap-2'>
                    <Link href={route('cashregisters.show', application.slug)}>
                        <Button size={'icon'} aria-label={t('Configure your app')}>
                            <Svg type={'configure'} />
                        </Button>
                    </Link>

                    <UpdateCashRegister application={application} />
                    <DeleteCashRegister application={application} />
                </div>
            </CardHeader>
            <CardContent variant={'flex-row'} className='items-center gap-10 lg:gap-12'>
                <div className='mt-8 flex items-center justify-center md:mt-0'>
                    <UpdateModulePosterForm application={application} />
                </div>

                <div className='flex flex-1 flex-col gap-2'>
                    <InfoBlock label={t('Description')} value={application.description} />

                    <div className='flex flex-wrap justify-around gap-12 sm:self-start'>
                        <InfoBlock label={t('Start Date')} value={application.start_date} />
                        <InfoBlock label={t('End Date')} value={application.end_date} />
                    </div>

                    <InfoBlock label={t('Location')} value={application.location} />
                    <InfoBlock label={t('Website')} value={application.website} />
                </div>
            </CardContent>
        </Card>
    );
}

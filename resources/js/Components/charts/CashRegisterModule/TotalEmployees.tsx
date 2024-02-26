import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card/card';
import { usePage } from '@inertiajs/react';

interface PageProps extends InertiaPageProps {
    totalEmployees: number;
}

export default function TotalEmployees() {
    const { t } = useTranslation();
    const { totalEmployees } = usePage<PageProps>().props;

    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>{t('Total Employees')}</CardTitle>
                    <Svg type='employees' variant='sideBar' />
                </div>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>{totalEmployees}</div>
            </CardContent>
        </Card>
    );
}

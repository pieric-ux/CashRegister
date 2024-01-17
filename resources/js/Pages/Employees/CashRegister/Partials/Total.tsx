// TODO: Refactor
import { useTranslation } from 'react-i18next';
import { Card, CardHeader } from '@/Components/ui/card/card';

export default function Total({ total }) {
    const { t } = useTranslation();

    return (
        <Card className='self-end'>
            <CardHeader variant={'flex-row'}>
                <span className='mr-2 text-xl font-medium sm:text-2xl'>{t('Total')}:</span>
                <span className='text-xl font-bold sm:text-2xl'>
                    {total} {t('currency_symbol')}
                </span>
            </CardHeader>
        </Card>
    );
}

import { useTranslation } from 'react-i18next';
import { Card, CardHeader } from '@/Components/ui/card/card';
import ShowCashRegisterInfos from '@/Components/features/show-CashRegister-Infos/showCashRegisterInfos';

export default function ShowCashRegisters({ applications }): JSX.Element {
    const { t } = useTranslation();
    return (
        <>
            {applications.length > 0 ? (
                <ul className='space-y-4'>
                    {applications.map((application) => (
                        <li key={application.id}>
                            <ShowCashRegisterInfos application={application} />
                        </li>
                    ))}
                </ul>
            ) : (
                <Card>
                    <CardHeader size={'xl'}>{t('No application found.')}</CardHeader>
                </Card>
            )}
        </>
    );
}

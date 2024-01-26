import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CreateWorkstation from './Components/CreateWorkstation';
import UpdateWorkstation from './Components/UpdateWorkstation';
import DeleteWorkstation from './Components/DeleteWorkstation';
import { Separator } from '@/Components/ui/separator/separator';
import { type WorkstationBkndDatas } from '@/Shared/Types/WorkstationTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card/card';
import DragDropProducts from '@/Components/features/dnd-Workstations/DragDropProducts';
import DragDropEmployees from '@/Components/features/dnd-Workstations/DragDropEmployees';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

export default function Index({ bkndDatas }: { bkndDatas: WorkstationBkndDatas }): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = bkndDatas;
    const workstations = cashRegisterModule?.cr_workstations;

    return (
        <CashRegisterConfigurationsLayout cashRegisterModule={cashRegisterModule}>
            <Head title={cashRegisterModule.name} />

            <CreateWorkstation />

            {workstations.length > 1 ? (
                <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                    {workstations.slice(1).map((workstation) => (
                        <Card key={workstation.id}>
                            <CardHeader variant={'flex-row'} className='justify-between'>
                                <CardTitle>{workstation.name}</CardTitle>
                                <div className='flex gap-2'>
                                    <UpdateWorkstation workstation={workstation} />
                                    <DeleteWorkstation workstation={workstation} />
                                </div>
                            </CardHeader>
                            <Separator />
                            <CardContent>
                                <DragDropEmployees workstation={workstation} />
                                <DragDropProducts workstation={workstation} />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardHeader size={'xl'} className='items-center'>
                        {t('No workstation found.')}
                    </CardHeader>
                </Card>
            )}
        </CashRegisterConfigurationsLayout>
    );
}

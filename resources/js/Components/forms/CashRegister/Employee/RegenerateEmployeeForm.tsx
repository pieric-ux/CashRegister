import { type FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { useToast } from '@/Components/ui/toast/use-toast';

interface RegenerateEmployeeFormProps {
    employee: Employee;
}

export default function RegenerateEmployeeForm({
    employee,
}: RegenerateEmployeeFormProps): JSX.Element {
    const { t } = useTranslation();
    const { toast } = useToast();

    const { patch } = useForm({});

    function regenerateEmployeeActivation(e: FormEvent): void {
        e.preventDefault();

        patch(route('employees.regenerate', employee.id), {
            onSuccess: () => {
                toast({
                    title: t('E-mail sent'),
                    description:
                        t(
                            'A passwordless regeneration email has been successfully sent to the employee at ',
                        ) +
                        employee.email +
                        '.',
                });
            },
        });
    }

    return (
        <Button
            size={'icon'}
            onClick={regenerateEmployeeActivation}
            aria-label={t('Regenerate code for your employee')}
        >
            <Svg type={'regenerate'} />
        </Button>
    );
}

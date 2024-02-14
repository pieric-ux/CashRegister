import { type FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { type Employee } from '@/Shared/Types/EmployeeTypes';

interface RegenerateEmployeeFormProps {
    employee: Employee;
}

export default function RegenerateEmployeeForm({
    employee,
}: RegenerateEmployeeFormProps): JSX.Element {
    const { t } = useTranslation();

    const { patch } = useForm({});

    function regenerateEmployeeActivation(e: FormEvent): void {
        e.preventDefault();

        patch(route('employees.regenerate', employee.id));
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

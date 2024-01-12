import { useForm } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';

export default function RegenerateEmployeeForm({ employee }) {
    const { t } = useTranslation();

    const { patch } = useForm({});

    function regenerateEmployeeActivation(e) {
        e.preventDefault();

        patch(route('employees.regenerate', employee));
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

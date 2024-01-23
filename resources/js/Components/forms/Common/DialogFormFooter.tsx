import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { DialogClose, DialogFooter } from '@/Components/ui/dialog/dialog';

export default function DialogFormFooter({
    closeDialog,
    processing,
    buttonAriaLabel,
    isUpdate,
}: {
    closeDialog: () => void;
    processing: boolean;
    buttonAriaLabel: string;
    isUpdate: boolean;
}): JSX.Element {
    const { t } = useTranslation();

    return (
        <DialogFooter>
            <DialogClose asChild>
                <Button variant={'secondary'} onClick={closeDialog}>
                    {t('Cancel')}
                </Button>
            </DialogClose>

            <Button disabled={processing} aria-label={buttonAriaLabel}>
                {isUpdate ? t('Save') : t('Create')}
            </Button>
        </DialogFooter>
    );
}

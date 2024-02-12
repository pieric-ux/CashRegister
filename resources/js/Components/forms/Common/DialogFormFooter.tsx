import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { DrawerClose } from '@/Components/ui/drawer/drawer';
import { DrawerFooter } from '@/Components/ui/drawer/drawerFooter';
import { DialogClose, DialogFooter } from '@/Components/ui/dialog/dialog';

interface DialogFormFooterProps {
    closeDialog: () => void;
    processing: boolean;
    buttonAriaLabel: string;
    isUpdate: boolean;
}

export default function DialogFormFooter({
    closeDialog,
    processing,
    buttonAriaLabel,
    isUpdate,
}: DialogFormFooterProps): JSX.Element {
    const { t } = useTranslation();
    const { width } = useWindowSize();

    return (
        <>
            {width < 640 ? (
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant={'secondary'} onClick={closeDialog}>
                            {t('Cancel')}
                        </Button>
                    </DrawerClose>

                    <Button disabled={processing} aria-label={buttonAriaLabel}>
                        {isUpdate ? t('Save') : t('Create')}
                    </Button>
                </DrawerFooter>
            ) : (
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
            )}
        </>
    );
}

// TODO: Refactor
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';

export default function Buttons({ isCartVisible, setIsCartVisible }) {
    const { t } = useTranslation();
    return (
        <div className='mt-4'>
            <Button
                variant={'secondary'}
                className='sm:hidden'
                onClick={() => {
                    setIsCartVisible(!isCartVisible);
                }}
            >
                {isCartVisible ? t('Products') : t('Cart')}
            </Button>
        </div>
    );
}

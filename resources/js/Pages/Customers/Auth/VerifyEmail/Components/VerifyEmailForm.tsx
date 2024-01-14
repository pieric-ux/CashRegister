import { type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button/button';
import { CardFooter } from '@/Components/ui/card/cardFooter';

export function VerifyEmailForm(): JSX.Element {
    const { t } = useTranslation();

    const { post, processing } = useForm({});

    const submit = (e: FormEvent): void => {
        e.preventDefault();

        post(route('verification.send'), {
            preserveScroll: true,
        });
    };

    return (
        <form className='mt-4' onSubmit={submit}>
            <CardFooter className='mt-4 flex items-center justify-between p-0'>
                <Button disabled={processing}>{t('Resend Verification Email')}</Button>

                <Button variant={'link'} asChild>
                    <Link href={route('logout')} method='post' as='button'>
                        {t('Logout')}
                    </Link>
                </Button>
            </CardFooter>
        </form>
    );
}

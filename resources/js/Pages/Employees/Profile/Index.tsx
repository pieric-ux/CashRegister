import { Head, usePage } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '@/Components/ui/input/input';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import UpdateUserAvatar from '@/Components/generic/UpdateUserAvatar';
import { formDatas } from '@/Shared/Datas/Forms/EmployeeProfileFormDatas';
import EmployeeLayout from '@/Components/layouts/Auth/Employee/EmployeeLayout';
import { Form, FormField, FormItem, FormLabel } from '@/Components/ui/form/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card/card';

export default function Index(): JSX.Element {
    const { t } = useTranslation();
    const { employee } = usePage<InertiaPageProps>().props;
    const avatarPath = employee.media.find(
        ({ collection_name }) => collection_name === 'avatars-employees',
    )?.original_url;

    const form = useForm<Employee>({
        defaultValues: {
            first_name: employee.first_name || '',
            last_name: employee.last_name || '',
            phone: employee.phone || '',
            email: employee.email || '',
        },
    });

    return (
        <>
            <Head title={t('Profile')} />

            <UpdateUserAvatar avatarPath={avatarPath} isEmployee />

            <section>
                <Card>
                    <CardHeader size={'xl'}>
                        <CardTitle>{t('Profile Information')}</CardTitle>
                        <CardDescription>
                            {t(
                                'Contact your administrator to update your profile information and e-mail address if they are incorrect.',
                            )}
                        </CardDescription>
                    </CardHeader>
                    <CardContent size={'xl'}>
                        <Form {...form}>
                            <form className='space-y-6'>
                                {formDatas.map((formData) => (
                                    <FormField
                                        key={formData.name}
                                        control={form.control}
                                        name={formData.name}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{formData.label}</FormLabel>
                                                <Input
                                                    className='mt-1 block w-full disabled:cursor-not-allowed'
                                                    disabled
                                                    {...field}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </section>
        </>
    );
}

Index.layout = (page: JSX.Element) => <EmployeeLayout children={page} />;

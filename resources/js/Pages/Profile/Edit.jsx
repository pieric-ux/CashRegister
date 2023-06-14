import CustomerLayout from '@/Layouts/CustomerLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const { setData, post, errors, processing } = useForm({
        avatar: '',
    })

    const submit = (e) => {
        e.preventDefault();

        post(route('upload.avatar'));
    };

    return (
        <CustomerLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                    <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                        <div>
                            <InputLabel htmlFor="avatar" value="Avatar" />

                            <TextInput
                                id="avatar"
                                name="avatar"
                                type="file"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('avatar', e.target.files[0])}
                            />

                            <InputError message={errors.avatar} className='mt-2' />

                        </div>
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    </form>
                </div>
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>

        </CustomerLayout>
    );
}

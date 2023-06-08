import { useEffect } from "react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create({ auth, status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    useEffect(() => {
        return () => {
            reset('name');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('applications.store'));
    }

    return (
        <CustomerLayout user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create Applications</h2>}
        >
            <Head title="Create App" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg transition ease-linear duration-300">
                    <div className="p-6 text-gray-900 dark:text-gray-100">

                        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="name" value="Nom de l'application :" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>
                            <div className="mt-4">
                                <PrimaryButton disabled={processing}>
                                    Create
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
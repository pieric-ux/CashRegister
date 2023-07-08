import { useForm } from '@inertiajs/react';
import { useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";

export default function CreateEmployeeForm({ application, className = '' }) {
    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const openModal = () => {
        setOpeningModal(true);
    };

    const closeModal = () => {
        setOpeningModal(false);
        reset();
        setShowErrors(false);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('employees.store', application.slug), {
            preserveScroll: true,
            onError: () => { setShowErrors(true); },
            onSuccess: () => closeModal(),
        });
    }
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">Create an Employee</h1>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Don't have any employee yet? Looking to add another one? Click the 'Create' button to begin.
                </p>
            </header>
            <PrimaryButton onClick={openModal}>Create</PrimaryButton>

            <Modal show={openingModal} onClose={closeModal}>

                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Create Employee
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Ready to create a new employee? Fill out the form below with the required details and hit the "Create" button to get started.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="first_name" value="First Name" />

                        <TextInput
                            id="first_name"
                            name="first_name"
                            className="mt-1 block w-3/4"
                            value={data.first_name}
                            isFocused={true}
                            onChange={(e) => setData('first_name', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.first_name : null} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="last_name" value="Last Name" />

                        <TextInput
                            id="last_name"
                            name="last_name"
                            className="mt-1 block w-3/4"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.last_name : null} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="phone" value="Phone" />

                        <TextInput
                            id="phone"
                            name="phone"
                            className="mt-1 block w-3/4"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.phone : null} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            name="email"
                            className="mt-1 block w-3/4"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.email : null} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-3/4"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.password : null} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-3/4"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.password_confirmation : null} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing}>
                            Create
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
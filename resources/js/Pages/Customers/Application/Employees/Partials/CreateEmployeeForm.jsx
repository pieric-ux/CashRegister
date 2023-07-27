import { useForm } from '@inertiajs/react';
import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";

export default function CreateEmployeeForm({ application, className = '', translations }) {
    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
    });

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

        post(route('employees.register', application.slug), {
            preserveScroll: true,
            onError: () => { setShowErrors(true); },
            onSuccess: () => closeModal(),
        });
    }
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">{translations.createEmployeeTitle}</h1>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {translations.createEmployeeLabel}
                </p>
            </header>
            <PrimaryButton onClick={openModal} aria-label={translations.ariaCreateEmployeeButton}>{translations.buttonCreate}</PrimaryButton>

            <Modal show={openingModal} onClose={closeModal}>

                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {translations.modalCreateEmployeeTitle}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {translations.modalCreateEmployeeLabel}
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="first_name" value={translations.inputFirstNameLabel} />

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
                        <InputLabel htmlFor="last_name" value={translations.inputLastNameLabel} />

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
                        <InputLabel htmlFor="phone" value={translations.inputPhoneLabel} />

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
                        <InputLabel htmlFor="email" value={translations.inputEmailLabel} />

                        <TextInput
                            id="email"
                            name="email"
                            className="mt-1 block w-3/4"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.email : null} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            {translations.buttonCancel}
                        </SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing} aria-label={translations.ariaCreateEmployeeButton}>
                            {translations.buttonCreate}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
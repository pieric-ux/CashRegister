import { useForm } from '@inertiajs/react';
import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";

export default function CreateCategorieProductForm({ application, className = '', translations }) {
    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
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

        post(route('categories.store', application.slug), {
            preserveScroll: true,
            onError: () => { setShowErrors(true); },
            onSuccess: () => closeModal(),
        });
    }
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">{translations.createCategoryTitle}</h1>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {translations.createCategoryLabel}
                </p>
            </header>
            <PrimaryButton onClick={openModal} aria-label={translations.ariaCreateCategoryButton}>{translations.buttonCreate}</PrimaryButton>

            <Modal show={openingModal} onClose={closeModal}>

                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {translations.modalCreateCategoryTitle}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {translations.modalCreateCategoryLabel}
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="name" value={translations.inputNameLabel} />

                        <TextInput
                            id="name"
                            name="name"
                            className="mt-1 block w-3/4"
                            value={data.name}
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.name : null} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            {translations.buttonCancel}
                        </SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing} aria-label={translations.ariaCreateCategoryButton}>
                            {translations.buttonCreate}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
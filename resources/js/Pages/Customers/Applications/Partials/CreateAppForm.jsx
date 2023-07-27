import { useForm } from '@inertiajs/react';
import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";

export default function CreateAppForm({ className = '', translations }) {
    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        website: '',
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

        post(route('applications.store'), {
            preserveScroll: true,
            onError: () => { setShowErrors(true); },
            onSuccess: () => closeModal(),
        });
    }
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">{translations.createApplicationTitle}</h1>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {translations.createApplicationLabel}
                </p>
            </header>
            <PrimaryButton onClick={openModal} aria-label={translations.ariaCreateApplicationButton}>{translations.buttonCreate}</PrimaryButton>

            <Modal show={openingModal} onClose={closeModal}>

                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {translations.modalCreateAppTitle}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {translations.modalCreateAppLabel}
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

                    <div className="mt-6">
                        <InputLabel htmlFor="description" value={translations.inputDescriptionLabel} />

                        <textarea
                            id="description"
                            name="description"
                            className="mt-1 block w-3/4 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-sky-500 dark:focus:border-sky-600 focus:ring-sky-500 dark:focus:ring-sky-600 rounded-md shadow-sm transition ease-linear duration-300"
                            rows={5}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.description : null} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="start_date" value={translations.inputStartDateLabel} />

                        <TextInput
                            id="start_date"
                            name="start_date"
                            type="date"
                            className="mt-1 w-3/4"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.start_date : null} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="end_date" value={translations.inputEndDateLabel} />

                        <TextInput
                            id="end_date"
                            name="end_date"
                            type="date"
                            className="mt-1 w-3/4"
                            value={data.end_date}
                            onChange={(e) => setData('end_date', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.end_date : null} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="location" value={translations.inputLocationLabel} />

                        <TextInput
                            id="location"
                            name="location"
                            className="mt-1 block w-3/4"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.location : null} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="website" value={translations.inputWebsiteLabel} />

                        <TextInput
                            id="website"
                            name="website"
                            placeholder="https://"
                            pattern="https://.*"
                            className="mt-1 block w-3/4"
                            value={data.website}
                            onChange={(e) => setData('website', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.website : null} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            {translations.buttonCancel}
                        </SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing} aria-label={translations.ariaCreateApplicationButton}>
                            {translations.buttonCreate}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
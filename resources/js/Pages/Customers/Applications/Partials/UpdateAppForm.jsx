import { useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";

export default function UpdateAppForm({ application, className = '' }) {
    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const { data, setData, patch, processing, errors } = useForm({
        name: application.name,
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
        setData({
            name: application.name,
            description: application.description,
            start_date: application.start_date,
            end_date: application.end_date,
            location: application.location,
            website: application.website,
        });
        setShowErrors(false);
    };

    useEffect(() => {
        setData({
            name: application.name,
            description: application.description,
            start_date: application.start_date,
            end_date: application.end_date,
            location: application.location,
            website: application.website,
        });
    }, [application]);

    const submit = (e) => {
        e.preventDefault();

        patch(route('applications.update', application.slug), {
            preserveScroll: true,
            onError: () => { setShowErrors(true); },
            onSuccess: () => closeModal(),
        });
    }

    return (
        <section className={`space-y-6 ${className}`}>
            <PrimaryButton onClick={openModal} className='!px-2' aria-label='Edit your app'>
                <svg className="w-5 h-5 text-white dark:text-gray-800" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                </svg>
            </PrimaryButton>

            <Modal show={openingModal} onClose={closeModal}>

                <form onSubmit={submit} className='p-6'>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Edit App
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Ready to update the application? Fill out the form below with the required details and click the 'Save' button to apply the changes.
                    </p>

                    <div className='mt-6'>
                        <InputLabel htmlFor="name" value="Name" />

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
                        <InputLabel htmlFor="description" value="Description" />

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
                        <InputLabel htmlFor="start_date" value="Start Date" />

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
                        <InputLabel htmlFor="end_date" value="End Date" />

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
                        <InputLabel htmlFor="location" value="Location" />

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
                        <InputLabel htmlFor="website" value="Website" />

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
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton className='ml-3' disabled={processing} aria-label='Edit your app'>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
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
    const { data, setData, patch, processing, errors, reset } = useForm({
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
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    }

    return (
        <section className={`space-y-6 ${className}`}>
            <PrimaryButton onClick={openModal} className='!px-2'>
                <svg className="w-5 h-5 text-white dark:text-gray-800" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
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
                        <InputLabel htmlFor="name" value="Application Name :" />

                        <TextInput
                            id="name"
                            name="name"
                            className="mt-1 block w-3/4"
                            value={data.name}
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="description" value="Description :" />

                        <textarea
                            id="description"
                            name="description"
                            className="mt-1 block w-3/4 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-sky-500 dark:focus:border-sky-600 focus:ring-sky-500 dark:focus:ring-sky-600 rounded-md shadow-sm transition ease-linear duration-300"
                            rows={5}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.description} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="start_date" value="Start Date :" />

                        <TextInput
                            id="start_date"
                            name="start_date"
                            type="date"
                            className="mt-1 w-3/4"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.start_date} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="end_date" value="End Date :" />

                        <TextInput
                            id="end_date"
                            name="end_date"
                            type="date"
                            className="mt-1 w-3/4"
                            value={data.end_date}
                            onChange={(e) => setData('end_date', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.end_date} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="location" value="Location :" />

                        <TextInput
                            id="location"
                            name="location"
                            className="mt-1 block w-3/4"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.location} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="website" value="Website :" />

                        <TextInput
                            id="website"
                            name="website"
                            placeholder="https://"
                            pattern="https://.*"
                            className="mt-1 block w-3/4"
                            value={data.website}
                            onChange={(e) => setData('website', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.website} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton className='ml-3' disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
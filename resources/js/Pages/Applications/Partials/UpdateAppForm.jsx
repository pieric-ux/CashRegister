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
    });

    const openModal = () => {
        setOpeningModal(true);
    };

    const closeModal = () => {
        setOpeningModal(false);
        setData({
            ...data,
            name: application.name,
        });
    };

    useEffect(() => {
        setData('name', application.name);
    }, [application.name]);

    const submit = (e) => {
        e.preventDefault();

        patch(route('applications.update', application.slug), {
            preserveScroll: true,
            onSuccess: () => {
                status = "Application updated successfully.";
                closeModal();
            },
            onFinish: () => reset(),
        });
    }

    return (
        <section className={`space-y-6 ${className}`}>
            <PrimaryButton onClick={openModal}>Edit</PrimaryButton>

            <Modal show={openingModal} onClose={closeModal}>

                <form onSubmit={submit} className='p-6'>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Edit App</h2>

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
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />

                        <InputError className="mt-2" message={errors.name} />
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
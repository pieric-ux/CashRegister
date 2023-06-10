import { useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";

export default function CreateAppForm({ className = '' }) {
    const [openingModal, setOpeningModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const openModal = () => {
        setOpeningModal(true);
    };

    const closeModal = () => {
        setOpeningModal(false);

        reset();
    };

    useEffect(() => {
        return () => {
            reset('name');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('applications.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    }
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Create an Application</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Don't have any applications yet? Looking to add another one? Click the 'Create' button to begin.
                </p>
            </header>
            <PrimaryButton onClick={openModal}>Create</PrimaryButton>

            <Modal show={openingModal} onClose={closeModal}>

                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Create App
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Ready to create a new application? Fill out the form below with the required details and hit the "Create" button to get started.
                    </p>

                    <div className="mt-6">
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
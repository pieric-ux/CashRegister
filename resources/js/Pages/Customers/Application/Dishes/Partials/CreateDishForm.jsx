import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import { useTranslation } from "react-i18next";
import Checkbox from "@/Components/Checkbox";

export default function CreateDishForm({ application, className = "" }) {
    const { t } = useTranslation();

    {
        /* State for controlling modal visibility and form errors display */
    }
    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    {
        /* Initialize form data and handle form submission */
    }
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        unit: "",
        client_price: "",
        cost_price: "",
        is_consigned: true,
        is_SoldSeparately: false,
    });

    {
        /* Update client_price when is_consigned changes */
    }
    useEffect(() => {
        if (!data.is_consigned) {
            setData("client_price", "");
        }
    }, [data.is_consigned]);

    {
        /* Open the modal */
    }
    const openModal = () => {
        setOpeningModal(true);
    };

    {
        /* Close the modal and reset form data */
    }
    const closeModal = () => {
        setOpeningModal(false);
        reset();
        setShowErrors(false);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("dishes.store", application.slug), {
            preserveScroll: true,
            onError: () => {
                setShowErrors(true);
            },
            onSuccess: () => closeModal(),
        });
    };
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {t("Create a Dish")}
                </h1>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t(
                        "Don't have any dish yet? Looking to add another one? Click the 'Create' button to begin.",
                    )}
                </p>
            </header>
            <PrimaryButton
                onClick={openModal}
                aria-label={t("Create your dish")}
            >
                {t("Create")}
            </PrimaryButton>

            <Modal show={openingModal} onClose={closeModal}>
                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {t("Create Dish")}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {t(
                            "Ready to create a new dish? Fill out the form below with the required details and hit the 'Create' button to get started.",
                        )}
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="name" value={t("Name")} />

                        <TextInput
                            id="name"
                            name="name"
                            className="mt-1 block w-3/4"
                            value={data.name}
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={showErrors ? errors.name : null}
                        />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="unit" value={t("Unit")} />

                        <TextInput
                            id="unit"
                            name="unit"
                            className="mt-1 block w-3/4"
                            value={data.unit}
                            onChange={(e) => setData("unit", e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={showErrors ? errors.unit : null}
                        />
                    </div>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="client_price"
                            value={t("Client Price")}
                        />

                        <TextInput
                            id="client_price"
                            name="client_price"
                            className="mt-1 block w-3/4 disabled:cursor-not-allowed"
                            value={data.client_price}
                            onChange={(e) =>
                                setData("client_price", e.target.value)
                            }
                            disabled={!data.is_consigned}
                        />

                        <InputError
                            className="mt-2"
                            message={showErrors ? errors.client_price : null}
                        />
                    </div>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="cost_price"
                            value={t("Cost Price")}
                        />

                        <TextInput
                            id="cost_price"
                            name="cost_price"
                            className="mt-1 block w-3/4"
                            value={data.cost_price}
                            onChange={(e) =>
                                setData("cost_price", e.target.value)
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={showErrors ? errors.cost_price : null}
                        />
                    </div>

                    <div className="mt-6">
                        <label className="flex items-center">
                            <Checkbox
                                name="is_consigned"
                                checked={data.is_consigned}
                                onChange={(e) =>
                                    setData("is_consigned", e.target.checked)
                                }
                            />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                {t("Consigned")}
                            </span>
                        </label>
                        <InputError
                            className="mt-2"
                            message={showErrors ? errors.is_consigned : null}
                        />
                    </div>

                    <div className="mt-6">
                        <label className="flex items-center">
                            <Checkbox
                                name="is_SoldSeparately"
                                checked={data.is_SoldSeparately}
                                onChange={(e) =>
                                    setData(
                                        "is_SoldSeparately",
                                        e.target.checked,
                                    )
                                }
                            />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                {t("Sold Separately")}
                            </span>
                        </label>
                        <InputError
                            className="mt-2"
                            message={
                                showErrors ? errors.is_SoldSeparately : null
                            }
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            {t("Cancel")}
                        </SecondaryButton>
                        <PrimaryButton
                            className="ml-3"
                            disabled={processing}
                            aria-label={t("Create your dish")}
                        >
                            {t("Create")}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

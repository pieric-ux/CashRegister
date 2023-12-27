import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";

export default function UpdateProfileInformation({ customer, className = "" }) {
    const { t } = useTranslation();

    {
        /* Initialize form data and handle form submission */
    }
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            company_name: customer.company_name || "",
            first_name: customer.first_name,
            last_name: customer.last_name,
            address: customer.address,
            npa: customer.npa,
            city: customer.city,
            phone: customer.phone || "",
            email: customer.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {t("Profile Information")}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t(
                        "Update your account's profile information and email address.",
                    )}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                    <InputLabel
                        htmlFor="company_name"
                        value={t("Company Name")}
                    />

                    <TextInput
                        id="company_name"
                        name="company_name"
                        value={data.company_name}
                        className="mt-1 block w-full"
                        autoComplete="organization"
                        onChange={(e) =>
                            setData("company_name", e.target.value)
                        }
                    />

                    <InputError
                        className="mt-2"
                        message={errors.company_name}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="first_name" value={t("First Name")} />

                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="given-name"
                        onChange={(e) => setData("first_name", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.first_name} />
                </div>

                <div>
                    <InputLabel htmlFor="last_name" value={t("Last Name")} />

                    <TextInput
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="family-name"
                        onChange={(e) => setData("last_name", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.last_name} />
                </div>

                <div>
                    <InputLabel htmlFor="address" value={t("Address")} />

                    <TextInput
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        autoComplete="street-address"
                        onChange={(e) => setData("address", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div className="flex gap-4">
                    <div className="basis-3/5">
                        <InputLabel htmlFor="city" value={t("City")} />

                        <TextInput
                            id="city"
                            name="city"
                            value={data.city}
                            className="mt-1 block w-full"
                            autoComplete="address-level2"
                            onChange={(e) => setData("city", e.target.value)}
                        />

                        <InputError message={errors.city} className="mt-2" />
                    </div>
                    <div className="basis-2/5">
                        <InputLabel htmlFor="npa" value={t("NPA")} />

                        <TextInput
                            id="npa"
                            name="npa"
                            value={data.npa}
                            className="mt-1 block w-full"
                            autoComplete="postal-code"
                            onChange={(e) => setData("npa", e.target.value)}
                        />

                        <InputError message={errors.npa} className="mt-2" />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="phone" value={t("Phone")} />

                    <TextInput
                        id="phone"
                        name="phone"
                        type="tel"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="tel"
                        onChange={(e) => setData("phone", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value={t("Email")} />

                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}
                        aria-label={t("Save your profile information")}
                    >
                        {t("Save")}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t("Saved.")}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

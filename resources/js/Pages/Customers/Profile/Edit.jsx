import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdateUserAvatar from "./Partials/UpdateUserAvatar";

export default function Edit({
    customerAuth,
    mustVerifyEmail,
    status,
    localization,
}) {
    const { t } = useTranslation();

    return (
        <CustomerLayout auth={customerAuth} localization={localization}>
            <Head title={t("Profile")} />

            {/* Flavien: il y a la classe `container` qui est bien pour centrer du contenu */}
            {/* https://tailwindcss.com/docs/container */}
            <div className="mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear dark:bg-gray-800 sm:p-8">
                    <UpdateUserAvatar
                        className="mx-auto max-w-xl"
                        avatarPath={customerAuth.avatarPath}
                    />

                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="mx-auto mt-6 max-w-xl"
                        customer={customerAuth.customer}
                    />
                </div>
                <div className="rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear dark:bg-gray-800 sm:p-8">
                    <UpdatePasswordForm className="mx-auto max-w-xl" />
                </div>

                <div className="rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear dark:bg-gray-800 sm:p-8">
                    <DeleteUserForm className="mx-auto max-w-xl" />
                </div>
            </div>
        </CustomerLayout>
    );
}

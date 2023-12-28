import { useTranslation } from "react-i18next";
import SecondaryButton from "../../../../Components/SecondaryButton";

// Flavien: le nom de ce composant n'est pas très explicite.
export default function Buttons({ isCartVisible, setIsCartVisible }) {
    const { t } = useTranslation();
    return (
        <div className="mt-4">
            <SecondaryButton
                className="sm:hidden"
                onClick={() => {
                    setIsCartVisible(!isCartVisible);
                }}
            >
                {isCartVisible ? t("Products") : t("Cart")}
            </SecondaryButton>
        </div>
    );
}

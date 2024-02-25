import countryToCurrency from 'country-to-currency';

interface CurrencyFormatResult {
    formattedAmount: string;
    currencySymbol: string;
}

export default function useCurrencyFormatter(amount?: number): CurrencyFormatResult {
    const locale = document.documentElement.lang;

    const codeCountry = locale.split('-')[1];
    // @ts-expect-error : FIXME: countryToCurrency type for codeCountry
    const currencyCode = countryToCurrency[codeCountry];

    const formatted = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    });
    let formattedAmount = '';
    if (amount) {
        formattedAmount = formatted.format(amount);
    }
    const currencySymbol =
        formatted.formatToParts().find((part) => part.type === 'currency')?.value || '';

    return { formattedAmount, currencySymbol };
}

import countryToCurrency from 'country-to-currency';

export default function useCurrencyFormatter(amount: number): string {
    const locale = document.documentElement.lang;

    const codeCountry = locale.split('-')[1];

    const currencyCode = countryToCurrency[codeCountry]; // FIXME: check type with Flavien

    const formatted = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    }).format(amount);

    return formatted;
}

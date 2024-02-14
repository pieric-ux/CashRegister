/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';
import { Input } from '@/Components/ui/input/input';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form/form';

export const GenericFormField = ({
    form,
    data,
    setData,
    errors,
    formData,
}: {
    form: any;
    data?: any;
    setData: any;
    errors: any;
    formData: any;
}): JSX.Element => {
    const { t } = useTranslation();

    return (
        <FormField
            control={form.control}
            name={formData.name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={formData?.srOnly && 'sr-only'}>
                        {t(formData?.label)}{' '}
                        {formData.facultative !== undefined && formData?.facultative && (
                            <small>({t('facultative')})</small>
                        )}
                    </FormLabel>
                    <FormControl>
                        <Input
                            type={formData?.type ?? 'text'}
                            disabled={formData?.canBeDisabled && !data.is_consigned}
                            isFocused={formData.isFocused}
                            autoComplete={formData?.autoComplete}
                            placeholder={t(formData?.placeholder)}
                            pattern={formData?.pattern}
                            {...field}
                            onChange={(e) => {
                                field.onChange(e);
                                setData(formData.name, e.target.value);
                            }}
                        />
                    </FormControl>
                    <FormMessage>{errors[formData.name]}</FormMessage>
                </FormItem>
            )}
        />
    );
};

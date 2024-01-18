import { Input } from '@/Components/ui/input/input';
import { useTranslation } from 'react-i18next';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form/form';
// TODO: check with Flavien how to type this
export const GenericFormField = ({ form, setData, errors, formData }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <FormField
            control={form.control}
            name={formData.name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={formData?.srOnly && 'sr-only'}>
                        {t(formData.label)}{' '}
                        {formData.facultative !== undefined && formData.facultative && (
                            <small>({t('facultative')})</small>
                        )}
                    </FormLabel>
                    <FormControl>
                        <Input
                            type={formData.type ?? 'text'}
                            isFocused={formData.isFocused}
                            autoComplete={formData.autoComplete}
                            placeholder={t(formData.placeholder)}
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

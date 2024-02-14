'use client';

import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { Input } from '@/Components/ui/input/input';
import { Avatar, AvatarImage } from '@/Components/ui/avatar/avatar';
import { useForm as useFormInertia, router } from '@inertiajs/react';
import { ShowCashRegisterInfosContext } from '@/Context/CashRegisterModulesContext';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form/form';

interface FormInput {
    moduleId?: number;
    poster: File | undefined;
}

export default function UpdateModulePosterForm(): JSX.Element {
    const { cashRegisterModule } = useContext(ShowCashRegisterInfosContext);
    const posterPath = cashRegisterModule.media.find(
        ({ collection_name }) => collection_name === 'posters',
    )?.original_url;

    const defaultValues: FormInput = {
        moduleId: cashRegisterModule.id,
        poster: undefined,
    };

    const { data, setData, errors } = useFormInertia(defaultValues);

    const form = useForm<FormInput>({
        defaultValues: data,
    });

    useEffect(() => {
        onSubmit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.poster]);

    function onSubmit(): void {
        if (data.moduleId && data.poster) {
            const formData = new FormData();
            formData.append('moduleId', data.moduleId.toString());
            formData.append('poster', data.poster);

            router.post(route('poster.upload'), formData);
        }
    }

    return (
        <Form {...form}>
            <form>
                <FormField
                    control={form.control}
                    name='poster'
                    render={() => (
                        <FormItem className='relative z-30 mx-auto h-36 w-36 backdrop-blur-md transition duration-300 ease-linear'>
                            <div className='relative h-full w-full drop-shadow-md'>
                                <Avatar variant={'square'} size={'poster'}>
                                    <AvatarImage src={posterPath} alt='poster' />
                                </Avatar>
                                <FormLabel className='absolute -bottom-4 -right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-ring hover:bg-opacity-90'>
                                    <Svg variant={'destructive'} type={'addPicture'} />
                                    <FormControl>
                                        <Input
                                            type='file'
                                            className='sr-only'
                                            onChange={(e) => {
                                                setData('poster', e.target.files?.[0]);
                                            }}
                                        />
                                    </FormControl>
                                </FormLabel>
                            </div>
                            <FormMessage>{errors.poster}</FormMessage>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

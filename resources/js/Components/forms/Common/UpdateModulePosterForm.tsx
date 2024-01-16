'use client';

import { useForm } from 'react-hook-form';
import { Svg } from '@/Components/ui/svg/Svg';
import { Input } from '@/Components/ui/input/input';
import { useEffect, type ChangeEvent } from 'react';
import { useForm as useFormInertia } from '@inertiajs/react';
import { Avatar, AvatarImage } from '@/Components/ui/avatar/avatar';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form/form';

interface FormInput {
    appId: string;
    poster: File | undefined;
}

export function UpdateModulePosterForm({ application }): JSX.Element {
    const defaultValues: FormInput = {
        appId: application.id,
        poster: undefined,
    };

    const { data, setData, post, errors } = useFormInertia(defaultValues);

    const form = useForm<FormInput>({
        defaultValues: data,
    });

    const handlePosterChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setData('poster', e.target.files?.[0]);
    };

    useEffect(() => {
        // FIXME: don't use useEffect to changing data.poster
        if (data.poster !== null && data.poster !== undefined) {
            onSubmit();
        }
    }, [data.poster]);

    function onSubmit(): void {
        if (data.poster !== undefined) {
            const formData = new FormData();
            formData.append('appId', data.appId);
            formData.append('poster', data.poster);

            post(route('poster.upload'), formData);
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
                                    <AvatarImage src={application.posterPath} alt='poster' />
                                </Avatar>
                                <FormLabel className='absolute -bottom-4 -right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-ring hover:bg-opacity-90'>
                                    <Svg variant={'destructive'} type={'addPicture'} />
                                    <FormControl>
                                        <Input
                                            type='file'
                                            className='sr-only'
                                            onChange={handlePosterChange}
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

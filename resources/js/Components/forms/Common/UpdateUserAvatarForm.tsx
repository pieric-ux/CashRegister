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
    avatar: File | undefined;
}

const defaultValues: FormInput = {
    avatar: undefined,
};

export function UpdateUserAvatarForm({
    avatarPath,
    isEmployee = false,
}: {
    avatarPath: string;
    isEmployee?: boolean;
}): JSX.Element {
    const { data, setData, post, errors } = useFormInertia(defaultValues);

    const form = useForm<FormInput>({
        defaultValues: data,
    });

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setData('avatar', e.target.files?.[0]);
    };

    useEffect(() => {
        // FIXME: don't use useEffect to changing data.avatar
        if (data.avatar !== null && data.avatar !== undefined) {
            onSubmit();
        }
    }, [data.avatar]);

    function onSubmit(): void {
        if (data.avatar !== undefined) {
            const formData = new FormData();
            formData.append('avatar', data.avatar);

            isEmployee
                ? post(route('avatar-employee.upload'), formData)
                : post(route('avatar.upload'), formData);
        }
    }

    return (
        <Form {...form}>
            <form>
                <FormField
                    control={form.control}
                    name='avatar'
                    render={() => (
                        <FormItem className='relative z-30 mx-auto h-52 w-52 rounded-full bg-background backdrop-blur-md transition duration-300 ease-linear'>
                            <div className='relative h-full w-full drop-shadow-md'>
                                <Avatar size={'avatar'}>
                                    <AvatarImage src={avatarPath} alt='avatar' />
                                </Avatar>
                                <FormLabel className='absolute bottom-4 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-ring hover:bg-opacity-90'>
                                    <Svg variant={'destructive'} type={'addPicture'} />
                                    <FormControl>
                                        <Input
                                            type='file'
                                            className='sr-only'
                                            onChange={handleAvatarChange}
                                        />
                                    </FormControl>
                                </FormLabel>
                            </div>
                            <FormMessage>{errors.avatar}</FormMessage>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

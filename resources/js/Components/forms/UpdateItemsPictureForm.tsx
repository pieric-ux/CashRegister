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
    itemId: string;
    picture: File | undefined;
}

//FIXME: type item any
export function UpdateItemsPictureForm({ item, route }: { item: any; route: string }): JSX.Element {
    const defaultValues: FormInput = {
        itemId: item.id,
        picture: undefined,
    };

    const { data, setData, post, errors } = useFormInertia(defaultValues);

    const form = useForm<FormInput>({
        defaultValues: data,
    });

    const handlePictureChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setData('picture', e.target.files?.[0]);
    };

    useEffect(() => {
        // FIXME: don't use useEffect to changing data.poster
        if (data.picture !== null && data.picture !== undefined) {
            onSubmit();
        }
    }, [data.picture]);

    function onSubmit(): void {
        if (data.picture !== undefined) {
            const formData = new FormData();
            formData.append('itemId', data.itemId);
            formData.append('picture', data.picture);

            post(route, formData);
        }
    }

    return (
        <Form {...form}>
            <form className='flex h-24 items-center justify-center'>
                <FormField
                    control={form.control}
                    name='picture'
                    render={() => (
                        <FormItem className='flex w-3/4 items-center justify-center'>
                            {item.picturePath ? (
                                <div className='relative z-30 mx-auto h-16 w-16 backdrop-blur-md transition duration-300 ease-linear'>
                                    <div className='relative h-full w-full drop-shadow-md'>
                                        <Avatar variant={'square'} size={'picture'}>
                                            <AvatarImage src={item.picturePath} />
                                        </Avatar>
                                        <FormLabel
                                            className={
                                                'absolute -bottom-4 -right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-ring hover:bg-opacity-90'
                                            }
                                        >
                                            <Svg variant={'destructive'} type={'addPicture'} />
                                            <FormControl>
                                                <Input
                                                    type='file'
                                                    variant={'file'}
                                                    className='sr-only'
                                                    onChange={handlePictureChange}
                                                />
                                            </FormControl>
                                        </FormLabel>
                                    </div>
                                </div>
                            ) : (
                                <FormLabel
                                    className={
                                        'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-ring hover:bg-opacity-90'
                                    }
                                >
                                    <Svg variant={'destructive'} type={'addPicture'} />
                                    <FormControl>
                                        <Input
                                            type='file'
                                            variant={'file'}
                                            className='sr-only'
                                            onChange={handlePictureChange}
                                        />
                                    </FormControl>
                                </FormLabel>
                            )}
                            <FormMessage>{errors.picture}</FormMessage>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
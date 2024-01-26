'use client';

import { useForm } from 'react-hook-form';
import { Svg } from '@/Components/ui/svg/Svg';
import { Input } from '@/Components/ui/input/input';
import { useEffect } from 'react';
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

// TODO: type item with generic type
export function UpdateItemsPictureForm({ item, route }: { item: any; route: string }): JSX.Element {
    const defaultValues: FormInput = {
        itemId: item.id,
        picture: undefined,
    };

    const { data, setData, post, errors } = useFormInertia(defaultValues);

    const form = useForm<FormInput>({
        defaultValues: data,
    });

    useEffect(() => {
        // FIXME: Check with Flavien how i can do without useEffect and without submit button
        onSubmit();
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
                            {item.media[0]?.original_url ? (
                                <div className='relative z-30 mx-auto h-16 w-16 backdrop-blur-md transition duration-300 ease-linear'>
                                    <div className='relative h-full w-full drop-shadow-md'>
                                        <Avatar variant={'square'} size={'picture'}>
                                            <AvatarImage src={item.media[0].original_url} />
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
                                                    onChange={(e) => {
                                                        setData('picture', e.target.files?.[0]);
                                                    }}
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
                                            onChange={(e) => {
                                                setData('picture', e.target.files?.[0]);
                                            }}
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

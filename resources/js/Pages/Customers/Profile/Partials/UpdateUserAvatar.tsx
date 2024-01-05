import { useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Svg } from '@/Components/ui/svg/Svg';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card/card';

export default function UpdateUserAvatar({ avatarPath, className }) {
    const { t } = useTranslation();

    const { data, setData, post, errors } = useForm({
        avatar: '',
    });

    const handleAvatarChange = (e) => {
        setData('avatar', e.target.files[0]);
    };

    useEffect(() => {
        if (data.avatar) {
            submit();
        }
    }, [data.avatar]);

    const submit = () => {
        const formData = new FormData();
        formData.append('avatar', data.avatar);

        post(route('avatar.upload'), formData);
    };

    return (
        <section className={className}>
            <Card>
                <CardHeader size={'xl'}>
                    <CardTitle>{t('Update Avatar')}</CardTitle>
                    <CardDescription>{t("Update your avatar's profile.")}</CardDescription>
                </CardHeader>
                <CardContent size={'xl'}>
                    <form
                        className='flex flex-col items-center justify-center space-y-4'
                        encType='multipart/form-data'
                    >
                        <div className='relative z-30 mx-auto h-52 w-52 rounded-full bg-gray-100 backdrop-blur-md transition duration-300 ease-linear dark:bg-gray-900'>
                            <div className='relative h-full w-full drop-shadow-md'>
                                <img
                                    src={avatarPath}
                                    alt='avatar'
                                    className='absolute ml-2 mt-2 h-48 w-48 rounded-full'
                                />
                                <label
                                    htmlFor='avatar'
                                    className='absolute bottom-8 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-sky-500 text-white hover:bg-opacity-90'
                                >
                                    <Svg type={'addPicture'} />
                                    <TextInput
                                        id='avatar'
                                        name='avatar'
                                        type='file'
                                        className='sr-only'
                                        aria-label={t('Upload your avatar')}
                                        onChange={handleAvatarChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <InputError className='mt-2' message={errors.avatar} />
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}

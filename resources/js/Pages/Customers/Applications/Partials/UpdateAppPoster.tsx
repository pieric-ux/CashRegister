import clsx from 'clsx';
import { useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Svg } from '@/Components/ui/svg/Svg';

export default function UpdateAppPoster({ application, className }) {
    const { t } = useTranslation();

    const { data, setData, post, errors } = useForm({
        appId: application.id,
        poster: '',
    });

    const handlePosterChange = (e) => {
        setData('poster', e.target.files[0]);
    };

    useEffect(() => {
        if (data.poster) {
            submit();
        }
    }, [data.poster]);

    const submit = () => {
        const formData = new FormData();
        formData.append('appId', data.id);
        formData.append('poster', data.poster);

        post(route('poster.upload'), formData);
    };

    return (
        <form
            className={clsx('flex h-52 items-center justify-center', className)}
            encType='multipart/form-data'
        >
            <div className='relative z-30 mx-auto h-36 w-36 backdrop-blur-md transition duration-300 ease-linear'>
                <div className='relative h-full w-full drop-shadow-md'>
                    <img src={application.posterPath} alt='poster' className='h-full w-full' />
                    <label
                        htmlFor={`poster-${application.id}`}
                        className='absolute -bottom-4 -right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-sky-500 text-white hover:bg-opacity-90'
                    >
                        <Svg variant={'destructive'} type={'addPicture'} />
                    </label>
                    <TextInput
                        id={`poster-${application.id}`}
                        name={`poster-${application.id}`}
                        type='file'
                        className='sr-only'
                        aria-label={t("Upload your app's image")}
                        onChange={handlePosterChange}
                    />
                    <InputError className='mt-2' message={errors.poster} />
                </div>
            </div>
        </form>
    );
}

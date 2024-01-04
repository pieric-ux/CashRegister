import { useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Svg } from '@/Components/ui/svg/Svg';

export default function UpdateProdutPicture({ product, className }) {
    const { t } = useTranslation();

    const { data, setData, post, errors } = useForm({
        productId: product.id,
        picture: '',
    });

    const handlePictureChange = (e) => {
        setData('picture', e.target.files[0]);
    };

    useEffect(() => {
        if (data.picture) {
            submit();
        }
    }, [data.picture]);

    const submit = () => {
        const formData = new FormData();
        formData.append('productId', data.id);
        formData.append('picture', data.picture);

        post(route('picture-product.upload'), formData);
    };

    return (
        <form
            className={`flex h-24 items-center justify-center ${className}`}
            encType='multipart/form-data'
        >
            <div className='flex w-3/4 items-center justify-center'>
                {product.picturePath ? (
                    <div className='relative z-30 mx-auto h-16 w-16 backdrop-blur-md transition duration-300 ease-linear'>
                        <div className='relative h-full w-full drop-shadow-md'>
                            <img
                                src={product.picturePath}
                                alt='picture of product'
                                className='h-full w-full'
                            />
                            <label
                                htmlFor={`picture-${product.id}`}
                                className='absolute -bottom-4 -right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-sky-500 text-white hover:bg-opacity-90'
                            >
                                <Svg type={'addPicture'} />
                            </label>
                            <TextInput
                                id={`picture-${product.id}`}
                                name={`picture-${product.id}`}
                                type='file'
                                className='sr-only'
                                aria-label={t("Upload your product's image")}
                                onChange={handlePictureChange}
                            />
                            <InputError className='mt-2' message={errors.picture} />
                        </div>
                    </div>
                ) : (
                    <>
                        <label
                            htmlFor={`picture-${product.id}`}
                            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-sky-500 text-white hover:bg-opacity-90'
                        >
                            <Svg type={'addPicture'} />
                        </label>
                        <TextInput
                            id={`picture-${product.id}`}
                            name={`picture-${product.id}`}
                            type='file'
                            className='sr-only'
                            aria-label={t("Upload your product's image")}
                            onChange={handlePictureChange}
                        />
                        <InputError className='mt-2' message={errors.picture} />
                    </>
                )}
            </div>
        </form>
    );
}

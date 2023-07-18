import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteEmployeeForm({ employee }) {
    const [confirmingEmployeeDeletion, setConfirmingEmployeeDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmEmployeeDeletion = () => {
        setConfirmingEmployeeDeletion(true);
    };

    const deleteEmployee = (e) => {
        e.preventDefault();

        destroy(route('employees.destroy', employee), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingEmployeeDeletion(false);

        reset();
    };

    return (
        <section>
            <DangerButton onClick={confirmEmployeeDeletion} className='!px-2' aria-label='Delete your employee'>
                <svg className='w-5 h-5 text-white' fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430.901 583.409">
                    <g>
                        <path d="M3.339,199.409h384v320c0,35.3-28.7,64-64,64h-256c-35.3,0-64-28.7-64-64V199.409z M99.339,263.409c-8.8,0-16,7.2-16,16
		                        v224c0,8.8,7.2,16,16,16s16-7.2,16-16v-224C115.339,270.609,108.139,263.409,99.339,263.409z M195.339,263.409c-8.8,0-16,7.2-16,16
		                        v224c0,8.8,7.2,16,16,16s16-7.2,16-16v-224C211.339,270.609,204.139,263.409,195.339,263.409z M291.339,263.409
		                        c-8.8,0-16,7.2-16,16v224c0,8.8,7.2,16,16,16s16-7.2,16-16v-224C307.339,270.609,300.139,263.409,291.339,263.409z"/>
                        <path d="M148.166,27.847c8.802-8.396,21.559-10.989,32.929-6.851l113.139,41.179c11.37,4.138,19.475,14.325,20.821,26.414
		                        l1.875,15.9l90.21,32.834c16.633,6.054,25.179,24.382,19.126,41.015c-6.054,16.633-24.382,25.179-41.015,19.126L24.41,66.129
		                        C7.777,60.075-0.769,41.746,5.284,25.114S29.667-0.065,46.299,5.988l90.21,32.834L148.166,27.847z"/>
                    </g>
                </svg>
            </DangerButton>

            <Modal show={confirmingEmployeeDeletion} onClose={closeModal}>
                <form onSubmit={deleteEmployee} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete your employee?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your employee is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your employee.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing} aria-label='Delete your employee'>
                            Delete Employee
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
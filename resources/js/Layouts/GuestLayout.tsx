import { type ReactNode } from 'react';

export default function Guest({ children }: { children: ReactNode }): JSX.Element {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-background'>
            {children}
        </div>
    );
}

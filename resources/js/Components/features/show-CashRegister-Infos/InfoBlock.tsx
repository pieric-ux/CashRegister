import { Label } from '@/Components/ui/label/label';

export default function InfoBlock({ label, value }: { label: string; value: string }): JSX.Element {
    return (
        <div>
            <Label htmlFor={label}>{`${label} :`}</Label>
            <p id={label} className='overflow-hidden text-clip text-foreground'>
                {value}
            </p>
        </div>
    );
}

interface InfoBlockProps {
    label: string;
    value: string;
}

export default function InfoBlock({ label, value }: InfoBlockProps): JSX.Element {
    return (
        <div>
            <p>{`${label} :`}</p>
            <p className='overflow-hidden text-clip text-foreground'>{value}</p>
        </div>
    );
}

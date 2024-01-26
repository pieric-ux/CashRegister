export default function InfoBlock({ label, value }: { label: string; value: string }): JSX.Element {
    return (
        <div>
            <p>{`${label} :`}</p>
            <p className='overflow-hidden text-clip text-foreground'>{value}</p>
        </div>
    );
}

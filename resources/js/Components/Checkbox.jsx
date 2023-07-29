export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'checked:bg-sky-600 dark:checked:bg-sky-500 rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 shadow-sm focus:ring-sky-500 dark:focus:ring-sky-600 dark:focus:ring-offset-gray-800 ' +
                className
            }
        />
    );
}

import React from 'react';
import { Link } from '@inertiajs/react';

const Index = ({ applications }) => {
    return (
        <div>
            <h1>Liste des applications</h1>
            {applications.length > 0 ? (
                <ul>
                    {applications.map((application) => (
                        <li key={application.id}>
                            <Link href={route('applications.show', application.id)}>
                                {application.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucune application trouvée.</p>
            )}
        </div>
    );
};

export default Index;

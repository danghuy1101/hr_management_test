import React from 'react';
import EmployeeList from '../../components/EmployeeList';
import { useRouter } from 'next/router';

const EmployeesPage = () => {
    const router = useRouter();

    const handleCreateClick = () => {
        router.push('/admin/create');
    };

    return (
        <div>
            <h1>
                Employee List
            </h1>
            <button style={{ marginLeft: '0px', marginBottom: '20px' }} onClick={handleCreateClick}>Create</button>
            <EmployeeList />
        </div>
    );
};

export default EmployeesPage;

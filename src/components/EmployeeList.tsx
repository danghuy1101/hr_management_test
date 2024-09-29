import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/table.css';
import { Employee } from '@/interfaces/Employee';
import { Department } from '@/interfaces/Department';

const initialEmployeeState: Employee = {
    EmployeeID: 0,
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    HireDate: '',
    JobTitle: '',
    Salary: 0,
    DepartmentID: 0,
    Password: '',
    DateOfBirth: '',
    IsAdmin: false
};

const EmployeeList = () => {
    const router = useRouter();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [newEmployee, setNewEmployee] = useState<Employee>(initialEmployeeState);

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('/api/employees');
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await fetch('/api/departments');
            const data = await response.json();
            setDepartments(data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleAddEmployee = async () => {
        try {
            await fetch('/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEmployee),
            });
            fetchEmployees();
            setNewEmployee(initialEmployeeState);
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const handleDeleteEmployee = async (id: number) => {
        if (confirm('Do you want to delete this employee ?')) {
            try {
                const response = await fetch(`/api/employees?id=${id}`, { method: 'DELETE' });
                if (response.ok) fetchEmployees();
                else throw new Error('Failed to delete employee');
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const handleDetailClick = (id: number) => router.push(`/admin/detail?id=${id}`);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Job Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.EmployeeID}>
                            <td>{employee.FirstName}</td>
                            <td>{employee.LastName}</td>
                            <td>{employee.Email}</td>
                            <td>{departments.find(dep => dep.DepartmentID === employee.DepartmentID)?.DepartmentName || 'N/A'}</td>
                            <td>{employee.JobTitle}</td>
                            <td>
                                <button style={{ marginRight: '20px', }} onClick={() => handleDetailClick(employee.EmployeeID)}>Detail</button>
                                <button onClick={() => handleDeleteEmployee(employee.EmployeeID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
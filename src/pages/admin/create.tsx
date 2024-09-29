import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const CreateEmployeePage = () => {
    const router = useRouter();
    const [newEmployee, setNewEmployee] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        HireDate: '',
        JobTitle: '',
        Salary: 0,
        Password: '',
        DateOfBirth: '',
        DepartmentID: 0,
    });
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            const response = await fetch('/api/departments');
            const data = await response.json();
            setDepartments(data);
        };
        fetchDepartments();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch('/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmployee),
        });
        router.push('/admin/employees');
    };

    return (
        <div>
            <h1>Add New Employee</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>First Name:</td>
                            <td><input type="text" name="FirstName" value={newEmployee.FirstName} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td><input type="text" name="LastName" value={newEmployee.LastName} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td><input type="email" name="Email" value={newEmployee.Email} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input type="password" name="Password" value={newEmployee.Password} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Phone:</td>
                            <td><input type="text" name="Phone" value={newEmployee.Phone} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Hire Date:</td>
                            <td><input type="date" name="HireDate" value={newEmployee.HireDate} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Date of Birth:</td>
                            <td><input type="date" name="DateOfBirth" value={newEmployee.DateOfBirth} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Department:</td>
                            <td>
                                <select name="DepartmentID" value={newEmployee.DepartmentID} onChange={handleChange} required>
                                    <option value="">Select Department</option>
                                    {departments.map((dept: any) => (
                                        <option key={dept.DepartmentID} value={dept.DepartmentID}>
                                            {dept.DepartmentName}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Job Title:</td>
                            <td><input type="text" name="JobTitle" value={newEmployee.JobTitle} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Salary:</td>
                            <td><input type="number" name="Salary" value={newEmployee.Salary} onChange={handleChange} required /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default CreateEmployeePage;

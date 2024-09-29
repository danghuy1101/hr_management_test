import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../../styles/form.css';
import { Employee } from '@/interfaces/Employee';

const EditEmployee = () => {
    const router = useRouter();
    const { id } = router.query;

    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            if (id) {
                const response = await fetch(`/api/employees?id=${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setEmployee(data);
                } else {
                    console.error('Failed to fetch employee details');
                }
            }
        };
        fetchEmployeeDetails();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (employee) {
            setEmployee({
                ...employee,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSave = async () => {
        if (employee) {
            const response = await fetch(`/api/employees`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employee),
            });

            if (response.ok) {
                router.push('/admin/employees');
            } else {
                console.error('Error saving employee', response);
            }
        }
    };

    if (!employee) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Employee: {employee.LastName}</h1>
            <form className="employee-detail-form">
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="FirstName" value={employee.FirstName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="LastName" value={employee.LastName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="Email" value={employee.Email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input type="text" name="Phone" value={employee.Phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Hire Date:</label>
                    <input type="date" name="HireDate" value={employee.HireDate.split('T')[0]} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Job Title:</label>
                    <input type="text" name="JobTitle" value={employee.JobTitle} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Salary:</label>
                    <input type="number" name="Salary" value={employee.Salary} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Department ID:</label>
                    <input type="number" name="DepartmentID" value={employee.DepartmentID} onChange={handleChange} />
                </div>
                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default EditEmployee;

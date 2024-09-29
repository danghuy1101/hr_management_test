import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../../styles/form.css';
import { Employee } from '@/interfaces/Employee';

const EmployeeDetail = () => {
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


    if (!employee) return <div>Loading...</div>;

    return (
        <div className="employee-detail-container">
            {employee ? (
                <div>
                    <h1 className="employee-detail-heading">Employee information: {employee.LastName}</h1>
                    <form className="employee-detail-form">
                        <div className="form-group">
                            <label>First Name:</label>
                            <input type="text" value={employee.FirstName} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input type="text" value={employee.LastName} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" value={employee.Email} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="text" value={employee.Phone} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Hire Date:</label>
                            <input type="date" value={employee.HireDate.split('T')[0]} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Job Title:</label>
                            <input type="text" value={employee.JobTitle} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Salary:</label>
                            <input type="number" value={employee.Salary} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Department ID:</label>
                            <input type="number" value={employee.DepartmentID} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth:</label>
                            <input type="date" value={employee.DateOfBirth.split('T')[0]} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" value={employee.Password} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Is Admin:</label>
                            <input type="text" value={employee.IsAdmin ? "Yes" : "No"} readOnly />
                        </div>
                    </form>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <button onClick={() => router.push(`/admin/edit?id=${employee.EmployeeID}`)}>Edit</button>
                    </div>
                </div>
            ) : (
                <p>Loading employee details...</p>
            )}
        </div>
    );
};

export default EmployeeDetail;

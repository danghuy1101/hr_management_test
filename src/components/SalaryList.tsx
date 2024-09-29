import { useEffect, useState } from 'react';
import '../styles/table.css';
import { Salary } from '@/interfaces/Salary';

const SalaryList = () => {
    const [salaries, setSalaries] = useState<Salary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSalaries = async () => {
            const res = await fetch('/api/salaries');
            const data = await res.json();
            setSalaries(data);
            setLoading(false);
        };
        fetchSalaries();
    }, []);

    return (
        <div>
            <h2>Salary List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee ID</th>
                        <th>Base Salary</th>
                        <th>Bonus</th>
                    </tr>
                </thead>
                <tbody>
                    {salaries.map(salary => (
                        <tr key={salary.SalaryID}>
                            <td>{salary.SalaryID}</td>
                            <td>{salary.EmployeeID}</td>
                            <td>{salary.BaseSalary}</td>
                            <td>{salary.Bonus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalaryList;

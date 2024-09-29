import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const pool = await connectToDatabase();

    switch (req.method) {
        case 'GET':
            if (!req.query.id) {
                try {
                    const employees = await pool.request().query('SELECT * FROM Employees');
                    res.status(200).json(employees.recordset);
                } catch (error) {
                    res.status(500).json({ message: 'Error fetching employees', error });
                }
            } else {
                const { id } = req.query;
                try {
                    const employee = await pool.request()
                        .input('EmployeeID', id)
                        .query('SELECT * FROM Employees WHERE EmployeeID = @EmployeeID');
                    res.status(200).json(employee.recordset[0]);
                } catch (error) {
                    res.status(500).json({ message: 'Error fetching employee', error });
                }
            }
            break;

        case 'POST':
            try {
                const { FirstName, LastName, Email, Phone, HireDate, DepartmentID, JobTitle, Salary, Password, DateOfBirth } = req.body;

                const IsAdmin = false;

                await pool.request()
                    .input('FirstName', FirstName)
                    .input('LastName', LastName)
                    .input('Email', Email)
                    .input('Phone', Phone)
                    .input('HireDate', HireDate)
                    .input('DepartmentID', DepartmentID)
                    .input('JobTitle', JobTitle)
                    .input('Salary', Salary)
                    .input('IsAdmin', IsAdmin)
                    .input('Password', Password)
                    .input('DateOfBirth', DateOfBirth)
                    .query('INSERT INTO Employees (FirstName, LastName, Email, Phone, HireDate, DepartmentID, JobTitle, Salary, IsAdmin, Password, DateOfBirth) VALUES (@FirstName, @LastName, @Email, @Phone, @HireDate, @DepartmentID, @JobTitle, @Salary, @IsAdmin, @Password, @DateOfBirth)');

                res.status(201).json({ message: 'Employee added' });
            } catch (error) {
                res.status(500).json({ message: 'Error adding employee', error });
            }
            break;

        case 'PUT':
            try {
                const { EmployeeID, ...updateFields } = req.body;
                await pool.request()
                    .input('EmployeeID', EmployeeID)
                    .input('FirstName', updateFields.FirstName)
                    .input('LastName', updateFields.LastName)
                    .input('Email', updateFields.Email)
                    .input('Phone', updateFields.Phone)
                    .input('DepartmentID', updateFields.DepartmentID)
                    .input('JobTitle', updateFields.JobTitle)
                    .input('Salary', updateFields.Salary)
                    .query('UPDATE Employees SET FirstName = @FirstName, LastName = @LastName, Email = @Email, Phone = @Phone, DepartmentID = @DepartmentID, JobTitle = @JobTitle, Salary = @Salary WHERE EmployeeID = @EmployeeID');
                res.status(200).json({ message: 'Employee updated' });
            } catch (error) {
                res.status(500).json({ message: 'Error updating employee', error });
            }
            break;

        case 'DELETE':
            try {
                const { id } = req.query;
                await pool.request()
                    .input('EmployeeID', id)
                    .query('DELETE FROM Employees WHERE EmployeeID = @EmployeeID');
                res.status(200).json({ message: 'Employee deleted' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting employee', error });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const pool = await connectToDatabase();

    switch (req.method) {
        case 'GET':
            const salaries = await pool.request().query('SELECT * FROM Salaries');
            res.status(200).json(salaries.recordset);
            break;

        case 'PUT':
            const { SalaryID, BaseSalary, Bonus } = req.body;
            await pool.request()
                .input('SalaryID', SalaryID)
                .input('BaseSalary', BaseSalary)
                .input('Bonus', Bonus)
                .query('UPDATE Salaries SET BaseSalary = @BaseSalary, Bonus = @Bonus WHERE SalaryID = @SalaryID');
            res.status(200).json({ message: 'Salary updated' });
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

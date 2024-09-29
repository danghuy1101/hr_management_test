import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const pool = await connectToDatabase();

    switch (req.method) {
        case 'GET':
            try {
                const departments = await pool.request().query('SELECT * FROM Departments');
                res.status(200).json(departments.recordset);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching departments', error });
            }
            break;

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

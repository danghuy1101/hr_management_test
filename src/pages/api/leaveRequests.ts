import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const pool = await connectToDatabase();

    switch (req.method) {
        case 'GET':
            const leaveRequests = await pool.request().query('SELECT * FROM LeaveRequests');
            res.status(200).json(leaveRequests.recordset);
            break;

        case 'POST':
            const { EmployeeID, StartDate, EndDate, Reason } = req.body;
            await pool.request()
                .input('EmployeeID', EmployeeID)
                .input('StartDate', StartDate)
                .input('EndDate', EndDate)
                .input('Reason', Reason)
                .query('INSERT INTO LeaveRequests (EmployeeID, StartDate, EndDate, Reason) VALUES (@EmployeeID, @StartDate, @EndDate, @Reason)');
            res.status(201).json({ message: 'Leave request submitted' });
            break;

        case 'PUT':
            const { LeaveRequestID, Status } = req.body;
            await pool.request()
                .input('LeaveRequestID', LeaveRequestID)
                .input('Status', Status)
                .query('UPDATE LeaveRequests SET Status = @Status WHERE LeaveRequestID = @LeaveRequestID');
            res.status(200).json({ message: 'Leave request updated' });
            break;

        case 'DELETE':
            const { id } = req.query;
            await pool.request()
                .input('LeaveRequestID', id)
                .query('DELETE FROM LeaveRequests WHERE LeaveRequestID = @LeaveRequestID');
            res.status(200).json({ message: 'Leave request deleted' });
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

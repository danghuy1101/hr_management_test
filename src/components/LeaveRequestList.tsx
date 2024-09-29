import { useEffect, useState } from 'react';
import '../styles/table.css';
import { LeaveRequest } from '@/interfaces/LeaveRequest';

const LeaveRequestList = () => {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            const res = await fetch('/api/leaveRequests');
            const data = await res.json();
            setLeaveRequests(data);
            setLoading(false);
        };
        fetchLeaveRequests();
    }, []);

    return (
        <div>
            <h2>Leave Request List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map(request => (
                        <tr key={request.LeaveRequestID}>
                            <td>{request.LeaveRequestID}</td>
                            <td>{request.EmployeeID}</td>
                            <td>{request.StartDate}</td>
                            <td>{request.EndDate}</td>
                            <td>{request.Reason}</td>
                            <td>{request.Status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveRequestList;

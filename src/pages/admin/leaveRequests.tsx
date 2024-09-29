// src/pages/admin/leaveRequests.tsx
import React from 'react';
import LeaveRequestList from '../../components/LeaveRequestList';

const LeaveRequestsPage = () => {
    return (
        <div>
            <h1>Leave Requests</h1>
            <LeaveRequestList />
        </div>
    );
};

export default LeaveRequestsPage;

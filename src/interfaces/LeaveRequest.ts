export interface LeaveRequest {
    LeaveRequestID: number;
    EmployeeID: number;
    StartDate: string;
    EndDate: string;
    Reason: string;
    Status: string;
}
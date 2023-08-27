export type TimeOff = {
    id: number;
    description: string;
    startDate: Date;
    endDate: Date;
    totalDays: number;
    status: string;
    createdAt: Date;
    userId: string;
};

export enum TimeOffStates {
    PENDING = 'Pending',
    APPROVED = 'Approved',
    REJECTED = 'Rejected',
    CANCELLED = 'Cancelled',
    CANCEL_REQUESTED = 'Cancel Requested',
    CANCEL_REJECTED = 'Cancel Rejected'
}
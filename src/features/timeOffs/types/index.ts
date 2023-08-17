export type TimeOff = {
    id: number;
    description: string;
    startDate: Date;
    endDate: Date;
    totalDays: number;
    isPending: boolean;
    isApproved: boolean;
    isCancelled: boolean;
    createdAt: Date;
    hasCancelRequest: boolean;
};
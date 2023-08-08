export interface IAuthLogin {
    username: string;
    password: string;
}

export interface IAuthRegister {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    hireDate: Date;
    phoneNumber: string;
    address: string;
}

export interface ITimeOff {
    id: number;
    description: string;
    startDate: Date;
    endDate: Date;
    totalDays: number;
    isPending: boolean;
    isApproved: boolean;
    createdAt: Date;
    isCancelled: boolean;
    userId: string;
    hasCancelRequest?: boolean;
}

export interface ITimeOffRequest {
    description: string;
    startDate: Date;
    endDate: Date;
}

export interface ITimeOffUpdate {
    id: number;
    description: string;
    startDate: Date;
    endDate: Date;
}

export interface ITimeOffCancel {
    timeOffId: number;
}

export interface IUser {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    hireDate: Date;
    phoneNumber: string;
    address: string;
    annualTimeOffs: number;
    remainingAnnualTimeOffs: number;
}

export interface IUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    hireDate: Date;
    address: string;
    phoneNumber: string;
    annualTimeOffs: number;
    remainingAnnualTimeOffs: number;
    roles?: string[];
}

export interface IUserCreate {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    hireDate: Date;
    phoneNumber: string;
}

export interface IUserUpdate {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
}

export interface IUserChangePassword {
    oldPassword: string;
    newPassword: string;
}
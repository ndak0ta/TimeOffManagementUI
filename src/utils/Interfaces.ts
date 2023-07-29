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
}

export interface ITimeOffRequest {
    description: string;
    startDate: Date;
    endDate: Date;
}

export interface IUser {
    id: number;
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
    dateOfBirth: Date;
    hireDate: Date;
    address: string;
    annualTimeOffs: number;
    remainingAnnualTimeOffs: number;
    email: string;
    phoneNumber: string;
    role?: string;
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
export type User = {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: Date;
    hireDate: Date;
    annualTimeOffs: number;
    remainingAnnualTimeOffs: number;
    roles: string[];
}; // TODO base entity oluşturulabilir

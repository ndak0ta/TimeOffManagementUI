export type AuthUser = {
    id: string;
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
  };
  
  export type UserResponse = {
    jwt: string;
    userInfo: AuthUser;
  };
  
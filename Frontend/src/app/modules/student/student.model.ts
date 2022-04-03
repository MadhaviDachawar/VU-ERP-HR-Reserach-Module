export interface Student {
    _id?: string;
    userName?: string;
    userType?: number;
    aadharNumber: string;
    pan: string;
    drivingLicense: string;
    passport: string;
    srnNumber: string;
    prnNumber: string;
    name: Name[];
    email: string[];
    gender: string;
    mobileNumber: string[];
    address: Address[];
    bloodGroup: string[];
    landline: string;
    religion: string;
    caste: string;
    category: string;
    numberOfChildren: number;
    vuEmail: string;
    vuInsurance: InsuranceDetails[];
    joiningDate: Date;
    joiningDesignation: string;
    maritalStatus: string;
    department: any[];
    school: any[];
    faculty: any[];
    qualificationDetails: Qualification[];
    experienceDetails: Experience[];
    bankDetails: BankDetails[];
    documents: Document[];
    emergencyDetails: EmergencyDetails[];
    spouseDetails: SpouseDetails[];
    otherInformation: OtherInformation[];
}

interface InsuranceDetails {
    accidentClaim: boolean;
    medicalClaim: boolean;
    termInsurance: boolean;
}

interface Name {
    firstName: string;
    middleName: string;
    lastName: string;
}

interface Address {
    _id?: string;
    addressType: string;
    houseNumber: string;
    streeName: string;
    landmark: string;
    pincode: string;
    state: string;
    district: string;
    tehsil: string;
    village: string;
}

interface Qualification {
    _id?: string;
    university: string;
    passingYear: number;
    marks: number;
    maxMarks: number;
    percentage: number;
    grade: string;
    class: string;
    specialization: string;
    remarks: string;
}

interface Experience {
    _id?: string;
    employer: string;
    position: string;
    salaryDrawn: number;
    from: Date;
    to: Date;
    experienceType: string;
    rolesAndresponsibility: string;
    additionalInfo: string;
    remarks: string;
}

interface BankDetails {
    _id?: string;
    bankName: string;
    accountNumber: string;
    branch: string;
    ifsc: string;
    nominee: string;
}

interface Document {
    _id?: string;
    docName: string;
    details: string;
    path: string;
}

interface EmergencyDetails {
    _id?: string;
    name: string;
    relation: string;
    mobileNumber: string;
    email: string;
    address: string;
}

interface SpouseDetails {
    _id?: string;
    name: string;
    working: boolean;
    mobileNumber: string;
    email: string;
    company: string;
}

interface OtherInformation {
    _id?: string;
    infoType: string;
    details: string;
    remarks: string;
}
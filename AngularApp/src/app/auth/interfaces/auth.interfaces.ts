export interface ErrorResponse {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

export interface EmployeeRegistrationForm {
  first_name: string;
  last_name: string;
  password: string;
  repeat_password: string;
}

export interface RecruiterRegistrationForm extends EmployeeRegistrationForm {
  company_name: string;
  company_url: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  role: {
    id: number;
    name: string;
  };
}

export interface AuthResponse {
  token: string;
  user_details: {
    user: User;
  };
}

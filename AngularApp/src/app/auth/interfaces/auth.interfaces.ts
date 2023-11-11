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

import { User } from 'src/app/auth/interfaces/auth.interfaces';

export const ROLE_RECRUITER = 'recruiter';
export const ROLE_EMPLOYEE = 'employee';

export interface Skill {
  id: number;
  name: string;
  level: number;
}

export const SkillProperties: Skill = {
  id: undefined,
  name: undefined,
  level: undefined,
};

export interface WorkExperience {
  id: number;
  company_name: string;
  start_date: string;
  end_date: string;
  position: string;
  description: string;
}

export const WorkExperienceProperties: WorkExperience = {
  id: undefined,
  company_name: undefined,
  start_date: undefined,
  end_date: undefined,
  position: undefined,
  description: undefined,
};

export interface Education {
  id: number;
  university_name: string;
  start_date: string;
  end_date: string;
  field_of_study: string;
  description: string;
}

export const EducationProperties: Education = {
  id: undefined,
  university_name: undefined,
  start_date: undefined,
  end_date: undefined,
  field_of_study: undefined,
  description: undefined,
};

export interface Languages {
  id: number;
  name: string;
  proficiency: string;
}

export const LanguagesProperties: Languages = {
  id: undefined,
  name: undefined,
  proficiency: undefined,
};

export interface Employee {
  id: number;
  views: number;
  location: string | null;
  bio: string | null;
  expected_salary: string;
  portfolio: string | null;
  user: User;
}

export const EmployeeProperties: Employee = {
  id: undefined,
  views: undefined,
  location: undefined,
  bio: undefined,
  expected_salary: undefined,
  portfolio: undefined,
  user: undefined,
};

export interface EmployeeProfile {
  employee: Employee;
  skills: Skill[];
  work_experiences: WorkExperience[];
  educations: Education[];
  languages: Languages[];
}

export interface ProfileSections {
  [key: string]: boolean;
}

export interface ModalModes {
  [key: string]: 'add' | 'edit';
}

export interface ModalsData {
  [key: string]: number | null;
}

export interface SkillPayload {
  name: string;
  level: number;
}

export interface UserPayload {
  email: string;
  first_name: string;
  last_name: string;
}

export interface EmployeePayload {
  bio: string;
  location: string;
  expected_salary: string;
  portfolio: string;
}

export interface WorkExperiencePayload {
  company_name: string;
  start_date: string;
  end_date: string;
  position: string;
  description: string;
}

export interface EducationPayload {
  university_name: string;
  start_date: string;
  end_date: string;
  fos: string;
  description: string;
}

export interface LanguagePayload {
  name: string;
  proficiency: string;
}

export interface Preferences {
  id: number;
  field_name: string;
  visibility: string;
}

export interface PreferencesPayload {
  field_name: string;
  visibility: string;
}

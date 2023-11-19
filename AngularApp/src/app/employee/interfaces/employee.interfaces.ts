import { User } from 'src/app/auth/interfaces/auth.interfaces';

interface Skill {
  id?: number;
  employee_id?: number;
  name?: string;
  level?: number;
}

interface WorkExperience {
  id?: number;
  employee_id: number;
  company_name?: string;
  start_date?: string;
  end_date?: string;
  position?: string;
  description?: string;
}

interface Education {
  id?: number;
  employee_id?: number;
  university_name?: string;
  start_date?: string;
  end_date?: string;
  field_of_study?: string;
  description?: string;
}

interface Languages {
  id?: number;
  employee_id?: number;
  name?: string;
  proficiency?: string;
}

export interface EmployeeProfile {
  employee: {
    id?: number;
    views?: number;
    location?: string | null;
    bio?: string | null;
    expected_salary?: string;
    portfolio?: string | null;
    user: User;
  };
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

export interface SummaryPayload {
  bio?: string;
  location?: string;
  expected_salary?: string;
  portfolio?: string;
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

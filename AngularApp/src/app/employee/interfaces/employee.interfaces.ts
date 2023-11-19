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
  fos?: string;
  description?: string;
}

interface Languages {
  id?: number;
  employee_id?: number;
  name?: string;
  proficiency?: number;
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
  work_experience: WorkExperience[];
  education: Education[];
  languages: Languages[];
}

export interface ProfileSections {
  [key: string]: boolean;
}

export interface AddSkillPayload {
  name: string;
  level: string;
}

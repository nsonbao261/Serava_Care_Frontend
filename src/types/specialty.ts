import { Doctor } from "./doctor";

export interface SpecialtyCard {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  doctorCount: string;
}

export interface SpecialtyWithCategory extends SpecialtyCard {
  category: "noi-khoa" | "ngoai-khoa" | "can-lam-sang" | "phuc-hoi";
}

export interface SpecialtyPageData {
  name: string;
  description: string;
  doctors: Doctor[];
}

export interface DoctorDetail extends Doctor {
  about: string;
  education: string[];
  achievements: string[];
  languages: string[];
  workingHours: string;
  phoneNumber: string;
  email: string;
  articles: Array<{
    id: string;
    title: string;
    publishDate: string;
    readTime: string;
  }>;
}

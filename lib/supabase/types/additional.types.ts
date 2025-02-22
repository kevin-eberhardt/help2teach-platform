import { Database, Tables } from "./database.types";

export type SchoolClass = Tables<"classes">;
export type School = Tables<"schools">;
export type SchoolClassWithSchool = SchoolClass & {
  school: School | null;
};
export type Teacher = Tables<"teachers">;
export type Student = Tables<"students">;
export type User = Database["auth"]["Tables"]["users"]["Row"] & {
  user_metadata: {
    full_name: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
};

export type SeatingPlan = Tables<"seating_plans">;

export type Course = {
  code: string;
  title: string;
  unit: number;
  grade: "A" | "B" | "C" | "D" | "E" | "F";
  score: number;
};

export type Semester = {
  session: string;
  semester: "First" | "Second";
  level: string;
  courses: Course[];
};

export type Student = {
  matricNo: string;
  password: string;
  name: string;
  department: string;
  faculty: string;
  level: string;
  email: string;
  semesters: Semester[];
};

export const gradePoint = (g: Course["grade"]) =>
  ({ A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 })[g];

export const gradeFromScore = (s: number): Course["grade"] =>
  s >= 70 ? "A" : s >= 60 ? "B" : s >= 50 ? "C" : s >= 45 ? "D" : s >= 40 ? "E" : "F";

export const students: Student[] = [
  {
    matricNo: "CSC/2021/001",
    password: "student123",
    name: "Adaeze Okafor",
    department: "Computer Science",
    faculty: "Faculty of Science",
    level: "300",
    email: "adaeze.okafor@school.edu",
    semesters: [
      {
        session: "2023/2024",
        semester: "First",
        level: "300",
        courses: [
          { code: "CSC 301", title: "Data Structures", unit: 3, score: 78, grade: "A" },
          { code: "CSC 303", title: "Operating Systems", unit: 3, score: 65, grade: "B" },
          { code: "CSC 305", title: "Web Development", unit: 2, score: 82, grade: "A" },
          { code: "MTH 301", title: "Linear Algebra", unit: 3, score: 58, grade: "C" },
          { code: "GST 301", title: "Entrepreneurship", unit: 2, score: 71, grade: "A" },
        ],
      },
      {
        session: "2023/2024",
        semester: "Second",
        level: "300",
        courses: [
          { code: "CSC 302", title: "Algorithms", unit: 3, score: 74, grade: "A" },
          { code: "CSC 304", title: "Database Systems", unit: 3, score: 68, grade: "B" },
          { code: "CSC 306", title: "Software Engineering", unit: 3, score: 80, grade: "A" },
          { code: "MTH 302", title: "Numerical Methods", unit: 3, score: 55, grade: "C" },
        ],
      },
    ],
  },
  {
    matricNo: "CSC/2021/002",
    password: "student123",
    name: "Tunde Bakare",
    department: "Computer Science",
    faculty: "Faculty of Science",
    level: "300",
    email: "tunde.bakare@school.edu",
    semesters: [
      {
        session: "2023/2024",
        semester: "First",
        level: "300",
        courses: [
          { code: "CSC 301", title: "Data Structures", unit: 3, score: 62, grade: "B" },
          { code: "CSC 303", title: "Operating Systems", unit: 3, score: 71, grade: "A" },
          { code: "CSC 305", title: "Web Development", unit: 2, score: 55, grade: "C" },
          { code: "MTH 301", title: "Linear Algebra", unit: 3, score: 48, grade: "D" },
          { code: "GST 301", title: "Entrepreneurship", unit: 2, score: 66, grade: "B" },
        ],
      },
    ],
  },
  {
    matricNo: "EEE/2022/015",
    password: "student123",
    name: "Fatima Yusuf",
    department: "Electrical Engineering",
    faculty: "Faculty of Engineering",
    level: "200",
    email: "fatima.yusuf@school.edu",
    semesters: [
      {
        session: "2023/2024",
        semester: "First",
        level: "200",
        courses: [
          { code: "EEE 201", title: "Circuit Theory", unit: 3, score: 85, grade: "A" },
          { code: "EEE 203", title: "Electronics I", unit: 3, score: 72, grade: "A" },
          { code: "MTH 201", title: "Calculus II", unit: 3, score: 60, grade: "B" },
          { code: "PHY 201", title: "Modern Physics", unit: 2, score: 54, grade: "C" },
        ],
      },
    ],
  },
];

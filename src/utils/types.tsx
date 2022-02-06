export interface ExamSession {
    term: string;
    course: string;
    section: string;
    title: string;
    type?: string;
    start: string;
    end: string;
    building?: string;
    room?: string;
    row?: string;
    from?: string;
    to?: string;
  }

export interface Course {
  course: string;
  title: string;
  section: string;
}
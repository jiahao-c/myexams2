import { Course, ExamSession } from "./types";

export function parseDateTime(datetimeStr: string) {
    //datetimeStr original format "15-Dec-2021 at 2:00 PM"
    datetimeStr = datetimeStr.replace(" at ", " ");
    datetimeStr += " EST";
    return new Date(datetimeStr);
  }

  

export function filterGroups(groups: string[], lastname:string) : string{
    function isIngroup(group: string){
        let [start,end] = group.split('-')
        start = start.trim()
        end = end.trim()
        return lastname>start && lastname<end;
    }
    return groups.filter(isIngroup)[0]
}

export function examsToCourses(examData: ExamSession[]): Course[]{
    return Array.from(new Set(examData.map(exam => ({
        course: exam.course, 
        title: exam.title,
        section:exam.section
    }))))
}
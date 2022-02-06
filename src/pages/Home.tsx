import { ExamCards } from "@/components/exam-cards";
import { Navbar } from "@/components/NavBar";
import { PublicGoogleSheetsParser } from "@/utils/API";
import { Course, CourseSection, ExamSession } from "@/utils/types";
import { examsToCourses, parseDateTime } from "@/utils/util";
import {
  Button,
  Divider,
  Input,
  Layout,
  Select,
  Space,
  Tag,
  Timeline,
  Typography
} from "@arco-design/web-react";
import { IconCheckCircleFill, IconDownload } from "@arco-design/web-react/icon";
import ical from "ical-generator";
import { useEffect, useState } from "react";
const Content = Layout.Content;
const TimelineItem = Timeline.Item;
const spreadsheetId = "1uVQRsMX77oopByZxLjK3uDPfFAWoW8ZSKwyzYuKmJHI";

export function Home() {
  //string format: "ABCD123-001"
  const [inputCourseNumbers, setInputCourseNumbers] = useState<string[]>([]);
  const [examsResult, setExamsResult] = useState<ExamSession[]>([]);
  const [coursesOptions, setCoursesOptions] = useState<Course[]>([]);
  const [examData, setExamData] = useState<ExamSession[]>([]);

  const [buttonIcon, setButtonIcon] = useState(<IconDownload />);

  const handleExport = () => {
    const calendar = ical({ name: "exam schedules" });
    examsResult.forEach((exam) => {
      calendar.createEvent({
        start: parseDateTime(exam.start),
        end: parseDateTime(exam.end),
        summary: exam.course,
        description: exam.title,
        ...(exam.building && {
          location: `${exam.building} ${exam.room && exam.room} ${
            exam.row && exam.row
          }`,
        }),
      });
    });

    const objectURL = calendar.toURL();
    const link = document.createElement("a");
    link.href = objectURL;
    link.download = `exams.ics`;
    link.click();

    //changing the export icon to a checkmark for 5 seconds
    setButtonIcon(<IconCheckCircleFill />);
    setTimeout(() => {
      setButtonIcon(<IconDownload />);
    }, 5000);
  };

  useEffect(() => {
    const parser = new PublicGoogleSheetsParser(spreadsheetId);
    parser.parse().then((data: ExamSession[]) => {
      setExamData(data);
      setCoursesOptions(examsToCourses(data));
    });
  }, []);

  const handleFilter = (lastname: string) => {
    const filteredExams = examsResult.filter((exam) => 
      (exam.from && exam.to ? lastname > exam.from && lastname < exam.to : true)
    );
    setExamsResult(filteredExams);
  };

  useEffect(()=>{
    const typedInputCourseNumbers:CourseSection[] = inputCourseNumbers.map(courseNumber=>{
      const [course, section] = courseNumber.split('-');
      return {course,section}
    })
    setExamsResult(examData.filter(exam=>(typedInputCourseNumbers.some((courseSection)=>(
      courseSection.course === exam.course.replace(/\s/g, '') &&
      courseSection.section === exam.section.toString()
    )))))
  },[inputCourseNumbers])

  return (
    <Layout className="w-full z-50">
      <Navbar />
      <Content className="mt-8 mb-8 pr-8 pl-8 blue-gray-100">
        <section className="flex place-content-center">
          <Space
            direction="vertical"
            size="mini"
            className="min-w-md max-w-screen-lg">
            <div className="-mt-4">
              <Typography.Title heading={5}>
                Winter 2022 Final Schdules
              </Typography.Title>
            </div>
            <Timeline
              labelPosition="relative"
              direction="horizontal"
              // @ts-ignore
              mode="bottom">
              <TimelineItem label="Late Janurary" lineType="solid">
                <Tag color="green">Tentative</Tag>
              </TimelineItem>
              <TimelineItem
                label="Early Feburary"
                lineType="dashed">
                <Tag color="green">Final Schedule</Tag>
              </TimelineItem>
              <TimelineItem
                label="Early April"
                dotType="hollow"
                dotColor="grey">
                <Tag color="gray">Schedule with Location</Tag>
              </TimelineItem>
            </Timeline>
            <Typography.Title heading={5}>Add courses </Typography.Title>
            Course sessions:
            <Select
              className="min-w-xs max-w-screen-2xl"
              onChange={setInputCourseNumbers}
              value={inputCourseNumbers}
              size="large"
              filterOption={true}
              mode="multiple"
              placeholder="Select Courses">
              {coursesOptions.map((course,idx) => (
                <Select.Option
                  key={idx}
                  value={`${course.course.replace(/\s/g, "")}-${
                    course.section
                  }`}>
                  {`${course.course.replace(/\s/g, "")}-${(course.section).toString().padStart(3, '0')} ${
                    course.title
                  }`}
                </Select.Option>
              ))}
            </Select>
            Last name:{" "}
            <Input allowClear placeholder="AAA" onChange={handleFilter} />
            <Divider />
            <Space align="center" size="medium" className="-mt-20">
              <div className="-mt-4">
                <Typography.Title heading={5}>Your schedule</Typography.Title>
              </div>
              {examsResult.length > 0 && (
                <div className="-mt-2">
                  <Button
                    icon={buttonIcon}
                    type="primary"
                    onClick={handleExport}>
                    {`Export ${examsResult.length} exams to Calendar`}
                  </Button>
                </div>
              )}
            </Space>
            <ExamCards exams={examsResult} />
          </Space>
        </section>
      </Content>
    </Layout>
  );
}

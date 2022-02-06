import { parser } from "@/API/API";
import { ExamCards } from "@/components/exam-cards";
import { Navbar } from "@/components/NavBar";
import { Course, ExamSession } from "@/utils/types";
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
import { useSessionStorageState } from "ahooks";
import ical from "ical-generator";
import { useEffect, useState } from "react";
const Content = Layout.Content;
const TimelineItem = Timeline.Item;

export function Home() {
  //string format: "ABCD123-001"
  const [inputCourseNumbers, setInputCourseNumbers] = useState<string[]>([]);
  // const debouncedInputCourseNumbers = useDebounce(inputCourseNumbers, {
  //   wait: 200,
  // });
  // const lastname = useState<string>();
  const [exams, setExams] = useState<ExamSession[]>([]);
  const [coursesOptions, setCoursesOptions] = useState<Course[]>([]);
  const [examData, setExamData] = useSessionStorageState<Course[]>(
    "myExams-data",
    { defaultValue: [] },
  );

  const [buttonIcon, setButtonIcon] = useState(<IconDownload />);

  const handleExport = () => {
    const calendar = ical({ name: "exam schedules" });
    exams.forEach((exam) => {
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

  const queryExamSessions = async () => {
    const rows = await parser.parse();
    console.log("fetched: ", rows);
    setExamData(rows);
    setCoursesOptions(examsToCourses(rows));
  };

  useEffect(() => {
    if (examData.length === 0) {
      queryExamSessions();
    }
  }, []);


  // // course_numbers needs to be "XXXX 000"
  // const queryExamSessions = async () => {
  //   if (debouncedInputCourseNumbers.length === 0) {
  //     return;
  //   }
  //   const sessions_per_course = await Promise.all(
  //     debouncedInputCourseNumbers.map(async (course_number) => {
  //       try {
  //         const subj_number =
  //           course_number.slice(0, 4) + " " + course_number.slice(4, 7);
  //         const course_section = course_number.split("-")[1];
  //         const examsResult = await DataStore.query(ExamSession, (session) =>
  //           session.course("eq", subj_number).section("eq", course_section),
  //         );
  //         return examsResult;
  //       } catch (error) {
  //         console.log("Error retrieving exams", error);
  //         return [];
  //       }
  //     }),
  //   );
  //   setExams(sessions_per_course.flat());
  // };

  const handleFilter = (lastname: string) => {
    const filteredExams = exams.filter((exam) => {
      exam.from && exam.to ? lastname > exam.from && lastname < exam.to : true;
    });
    setExams(filteredExams);
  };

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
              <TimelineItem label="Late Janurary" lineType="dashed">
                <Tag color="green">Tentative</Tag>
              </TimelineItem>
              <TimelineItem
                label="Mid March"
                dotType="hollow"
                dotColor="grey"
                lineType="dashed">
                <Tag color="gray">Final Schedule</Tag>
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
              {coursesOptions.map((course) => (
                <Select.Option
                  key={course.course}
                  value={`${course.course.replace(/\s/g, "")}-${
                    course.section
                  }`}>
                  {`${course.course.replace(/\s/g, "")}-${course.section} ${
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
              {exams.length > 0 && (
                <div className="-mt-2">
                  <Button
                    icon={buttonIcon}
                    type="primary"
                    onClick={handleExport}>
                    {`Export ${exams.length} exams to Calendar`}
                  </Button>
                </div>
              )}
            </Space>
            <ExamCards exams={exams} />
          </Space>
        </section>
      </Content>
    </Layout>
  );
}

import { ExamCards } from "@/components/exam-cards";
import { listExamSelectOptions } from "@/graphql/queries";
import { ExamSession } from "@/models";
import {
  Button,
  Checkbox,
  Divider,
  Layout,
  Select,
  Space,
  Tag,
  Timeline,
  Typography
} from "@arco-design/web-react";
import { API, GraphQLResult } from "@aws-amplify/api";
import { DataStore } from "@aws-amplify/datastore";
import { useDebounce, useLocalStorageState } from "ahooks";
import { useEffect, useState } from "react";
const Content = Layout.Content;
const TimelineItem = Timeline.Item;
interface Course {
  course: string;
  title: string;
}

export function Home() {
  const [inputCourseNumbers, setInputCourseNumbers] = useState<string[]>([]);
  const debouncedInputCourseNumbers = useDebounce(inputCourseNumbers, {
    wait: 300,
  });
  const [exams, setExams] = useState<ExamSession[]>([]);
  const [coursesOptions, setCoursesOptions] = useLocalStorageState<Course[]>(
    "myExams-courses-list",
    { defaultValue: [] },
  );
  const {
    selected,
    selectAll,
    isSelected,
    unSelectAll,
    isAllSelected,
    isPartialSelected,
    setValueSelected,
  } = Checkbox.useCheckbox(exams.map((exam) => exam.id));

  const queryCourses = async () => {
    const query_result = (
      (await API.graphql({
        query: listExamSelectOptions,
        variables: { limit: 1000 },
      })) as GraphQLResult<any>
    ).data.listExamSessions.items as Course[];
    // filter duplicate in query result
    const result_no_duplicate = [
      ...new Map(query_result.map((v) => [v.course, v])).values(),
    ];
    setCoursesOptions(result_no_duplicate);
    console.log("fetched courses", { result_no_duplicate });
  };

  useEffect(() => {
    // fetch the courses list on component mount
    if (coursesOptions.length === 0) {
      queryCourses();
    }
  }, []);

  useEffect(() => {
    // fetch the exam sessions
    if (debouncedInputCourseNumbers.length > 0) {
      queryExamSessions();
    } else {
      setExams([]);
    }
  }, [debouncedInputCourseNumbers]);

  // course_numbers needs to be "XXXX 000"
  const queryExamSessions = async () => {
    if (debouncedInputCourseNumbers.length === 0) {
      return;
    }
    const sessions_per_course = await Promise.all(
      debouncedInputCourseNumbers.map(async (course_number) => {
        try {
          const examsResult = await DataStore.query(ExamSession, (session) =>
            session.course("eq", course_number),
          );
          return examsResult;
        } catch (error) {
          console.log("Error retrieving exams", error);
          return [];
        }
      }),
    );
    setExams(sessions_per_course.flat());
  };

  return (
    <Content className="mb-8 pr-8 pl-8 blue-gray-100">
      <section className="flex place-content-center">
        <Space
          direction="vertical"
          size="mini"
          className="min-w-md max-w-screen-lg">
          <Space size="medium" align="center">
            <div className="-mt-4">
              <Typography.Title heading={5}>Current Semester</Typography.Title>
            </div>
            <Tag color="arcoblue">Winter - 2022</Tag>
          </Space>
          <Timeline direction="horizontal" mode="bottom">
            <TimelineItem lineType="dashed">
              <Space direction="vertical" size="mini">
                <Typography.Text>Tentative Schedule</Typography.Text>
                <Typography.Text type="secondary">
                  Late Janurary{" "}
                </Typography.Text>
              </Space>
            </TimelineItem>
            <TimelineItem dotType="hollow" dotColor="grey" lineType="dashed">
              <Space direction="vertical" size="mini">
                <Typography.Text>Final Schedule</Typography.Text>
                <Typography.Text type="secondary">Mid March </Typography.Text>
              </Space>
            </TimelineItem>
            <TimelineItem dotType="hollow" dotColor="grey">
              <Space direction="vertical" size="mini">
                <Typography.Text>Final Schedule with Location</Typography.Text>
                <Typography.Text type="secondary">Early April</Typography.Text>
              </Space>
            </TimelineItem>
          </Timeline>
          <Typography.Title heading={5}>Select Your Courses </Typography.Title>
          <Select
            className="min-w-xs max-w-screen-2xl"
            onChange={setInputCourseNumbers}
            value={inputCourseNumbers}
            size="large"
            filterOption={true}
            mode="multiple"
            placeholder="Select Courses">
            {coursesOptions.map((course) => (
              <Select.Option key={course.course} value={`${course.course}`}>
                {`${course.course.replace(/\s/g, "")} ${course.title}`}
              </Select.Option>
            ))}
          </Select>
          <Divider />
          <Space align="center" size="medium" className="-mt-20">
            <div className="-mt-4">
              <Typography.Title heading={5}>Your schedule</Typography.Title>
            </div>
            {exams.length > 0 && !isAllSelected() && (
              <Button type="primary" onClick={selectAll}>
                Select All
              </Button>
            )}
            {exams.length > 0 && (isPartialSelected() || isAllSelected()) && (
              <Button type="secondary" onClick={unSelectAll}>
                Unselect All
              </Button>
            )}
            {selected.length > 0 && (
              <Button type="outline">{`Export ${selected.length} exams to Calendar`}</Button>
            )}
          </Space>
          <ExamCards
            exams={exams}
            isSelected={isSelected}
            setValueSelected={setValueSelected}
          />
        </Space>
      </section>
    </Content>
  );
}

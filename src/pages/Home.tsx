import { Button, Layout, Space, Checkbox, Typography, Divider } from '@arco-design/web-react';
import { Select } from '@arco-design/web-react';
import { API, GraphQLResult } from '@aws-amplify/api';
import { DataStore } from '@aws-amplify/datastore';
import { useEffect, useState } from 'react';
import { useBoolean, useDebounce, useLocalStorageState } from 'ahooks';
import { ExamSession } from '@/models';
import { listExamSelectOptions } from '@/graphql/queries';
import { ExamCards } from '@/components/exam-cards';
import layoutStyles from '@/style/layout.module.less';

const Content = Layout.Content;
const Footer = Layout.Footer;

interface Course {
  course: string;
  title: string;
}

export function Home() {
  const [inputCourseNumbers, setInputCourseNumbers] = useState<string[]>([]);
  const [collapsed, { toggle: toggle_collapsed, set, setTrue, setFalse }] = useBoolean(false);
  const debouncedInputCourseNumbers = useDebounce(inputCourseNumbers, {
    wait: 300,
  });
  const [exams, setExams] = useState<ExamSession[]>([]);
  const [courses, setCourses] = useLocalStorageState<Course[]>(
    'myExams-courses-list',
    { defaultValue: [] },
  );
  const {
    selected,
    selectAll,
    isSelected,
    unSelectAll,
    isAllSelected,
    setValueSelected,
  } = Checkbox.useCheckbox(
    exams.map((exam) => exam.id)
  );

  const queryCourses = async () => {
    const query_result = (
      (await API.graphql({
        query: listExamSelectOptions,
        variables: { limit: 1000 },
      })) as GraphQLResult<any>
    ).data.listExamSessions.items as Course[];
    // filter duplicate in query result
    const result_no_duplicate = [
      ...new Map(query_result.map(v => [v.course, v])).values(),
    ];
    setCourses(result_no_duplicate);
    console.log('fetched courses', { result_no_duplicate });
  };

  useEffect(() => {
    // fetch the courses list on component mount
    if (courses.length === 0) {
      queryCourses();
    }
  }, []);

  useEffect(() => {
    // fetch the exam sessions
    queryExamSessions();
  }, [debouncedInputCourseNumbers]);

  // course_numbers needs to be "XXXX 000"
  const queryExamSessions = async () => {
    if (debouncedInputCourseNumbers.length === 0) {
      return;
    }
    const sessions_per_course = await Promise.all(
      debouncedInputCourseNumbers.map(async course_number => {
        try {
          const examsResult = await DataStore.query(ExamSession, session =>
            session.course('eq', course_number),
          );
          return examsResult;
        } catch (error) {
          console.log('Error retrieving exams', error);
          return [];
        }
      }),
    );
    setExams(sessions_per_course.flat());
  };

  return (
    <Layout
      className={layoutStyles['layout-content']}
    >
      <Content
        className={layoutStyles['content']}
      >
        <Space direction='vertical'>
          <Typography.Title heading={6}>Select Your Courses </Typography.Title>
          <Select
            style={{ width: '18em' }}
            onChange={setInputCourseNumbers}
            value={inputCourseNumbers}
            size="large"
            filterOption={true}
            mode="multiple"
            placeholder="Select Courses">
            {courses.map(course => (
              <Select.Option key={course.course} value={`${course.course}`}>
                {`${course.course.replace(/\s/g, '')} ${course.title}`}
              </Select.Option>
            ))}
          </Select>
          <Divider />
          <Typography.Title heading={5}>Your schedule</Typography.Title>
          <ExamCards exams={exams} isSelected={isSelected} setValueSelected={setValueSelected} />
          <Space>
            {(exams.length > 0) && (isAllSelected() ? <Button type="outline" size="large" onClick={unSelectAll}>Unselect All</Button> : <Button type="primary" size="large" onClick={selectAll}>Select All</Button>)}
            {selected.length > 0 && <Button type="primary" size="large">{`Export ${selected.length} exams to Calendar`}</Button>}
          </Space>
        </Space>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
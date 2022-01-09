import { Button, Layout, Space, Checkbox, Input } from '@arco-design/web-react';
import { Select } from '@arco-design/web-react';
import { API, GraphQLResult } from '@aws-amplify/api';
import { DataStore } from '@aws-amplify/datastore';
import { useEffect, useState } from 'react';
import { useDebounce, useLocalStorageState } from 'ahooks';
import { ExamSession } from '@/models';
import { listExamSelectOptions } from '@/graphql/queries';
import { ExamCards } from '@/components/exam-cards';
import layoutStyles from '@/style/layout.module.less';
import componentStyles from '@/style/components.module.less';

const Sider = Layout.Sider;
const Content = Layout.Content;


interface Course {
  course: string;
  title: string;
}

export function Home() {
  const [inputCourseNumbers, setInputCourseNumbers] = useState<string[]>([]);
  const debouncedInputCourseNumbers = useDebounce(inputCourseNumbers, {
    wait: 500,
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
    <Layout>
      <Sider
      >
        <div className={layoutStyles['layout-sider']}>
          <h1>Step 1: Select Your Courses</h1>
          <Select
            onChange={setInputCourseNumbers}
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
          <h1>Step 2: Filter Results</h1>
          <h2>By Last Name</h2>
          <Input
            style={{ width: '5em' }}
            allowClear
            placeholder='AAA'
          />
          <h2>By Course Section</h2>
          <span>
            COMP 251: <Select>
              <Select.Option value="001">001</Select.Option>
              <Select.Option value="002">002</Select.Option>
            </Select>
          </span>
        </div>
      </Sider>
      <Content
        className={layoutStyles['layout-content']}
      >
        <h1>Step 3: View, Export, or print schedule</h1>
        <ExamCards exams={exams} isSelected={isSelected} setValueSelected={setValueSelected} />
        <Space>
          {isAllSelected() ? <Button type="secondary" size="large" onClick={unSelectAll}>Unselect All</Button> : <Button type="secondary" size="large" onClick={selectAll}>Select All</Button>}
          {selected.length > 0 && <Button type="primary" size="large">{`Export ${selected.length} exams to Calendar`}</Button>}

        </Space>
      </Content>
    </Layout>
  );
}
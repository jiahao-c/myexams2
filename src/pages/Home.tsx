import { ExamCards } from '@/components/exam-cards';
import { listExamSelectOptions } from '@/graphql/queries';
import { ExamSession } from '@/models';
import { Button, Checkbox, Divider, Layout, Select, Space, Typography } from '@arco-design/web-react';
import { API, GraphQLResult } from '@aws-amplify/api';
import { DataStore } from '@aws-amplify/datastore';
import { useDebounce, useLocalStorageState } from 'ahooks';
import { useEffect, useState } from 'react';
const Content = Layout.Content;

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
    'myExams-courses-list',
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
    setCoursesOptions(result_no_duplicate);
    console.log('fetched courses', { result_no_duplicate });
  };

  useEffect(() => {
    // fetch the courses list on component mount
    if (coursesOptions.length === 0) {
      queryCourses();
    }
  }, []);

  useEffect(() => {
    // fetch the exam sessions
    if(debouncedInputCourseNumbers.length>0){
      queryExamSessions();
    }
    else{
      setExams([])
    }
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
    <Content
      className='mb-8  pl-4 blue-gray-100'
    >
      <section
        className='flex flex-col'
        >
        <section 
        className='place-self-center'
        >
      <Space 
      direction='vertical'
      size='mini'
      >

        <Typography.Title
          className='-mt-100'
          heading={5}>Select Your Courses </Typography.Title>
        <Select
          className='w-xs'
          onChange={setInputCourseNumbers}
          value={inputCourseNumbers}
          size="large"
          filterOption={true}
          mode="multiple"
          placeholder="Select Courses">
          {coursesOptions.map(course => (
            <Select.Option key={course.course} value={`${course.course}`}>
              {`${course.course.replace(/\s/g, '')} ${course.title}`}
            </Select.Option>
          ))}
        </Select>
        <Divider 
        // className='w-screen'
        />
        <Typography.Title heading={5}>Your schedule</Typography.Title>
        <ExamCards exams={exams} isSelected={isSelected} setValueSelected={setValueSelected} />
        <Space wrap>
          {((exams.length > 0) && !isAllSelected()) && <Button type="primary" size="large" onClick={selectAll}>Select All</Button>}
          {((exams.length > 0) && (isPartialSelected() || isAllSelected())) && <Button type="secondary" size="large" onClick={unSelectAll}>Unselect All</Button>}
          {selected.length > 0 && <Button type="outline" size="large">{`Export ${selected.length} exams to Calendar`}</Button>}
        </Space>
      </Space>
      </section>
        </section>
    </Content>
  );
}
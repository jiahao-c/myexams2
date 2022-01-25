import { ExamSession } from '@/models';
import {
  Card, Empty, Space, Tabs, Typography
} from '@arco-design/web-react';
import {
  IconArrowRight,
  IconCalendarClock, IconClockCircle, IconHome, IconInfoCircle, IconLocation, IconSchedule, IconUserGroup
} from '@arco-design/web-react/icon';



const { Text } = Typography;
const { Meta } = Card;
const { TabPane } = Tabs;



export const ExamCards = ({ exams,
  isSelected,
  setValueSelected }: {
    exams: ExamSession[],
    isSelected: (value: string) => boolean,
    setValueSelected: (value: string, selected?: boolean) => void
  }) => {

  if (!exams || exams.length === 0) {
    return (
      <>
        <Empty
        description='Nothing here. Please select your courses.'
        />
      </>
    )
  };

  return (
    <Space wrap size='medium'>
      {exams.map(exam => (
        <Card
          className='w-80 pt-2 h-auto hover:scale-150 h-45'
          key={exam.id} // ${exam.from} - ${exam.to})
          hoverable={true}
          headerStyle={
            {
              height: '4em'
            }
          }
          title={
            <Meta
              title={
                `${exam.course} - ${exam.section} (${exam.from ? exam.from : ''
                } - ${exam.to ? exam.to : ''})`
              }
              description={
                <Text
                  style={
                    {
                      fontSize: '0.8em',
                    }
                  }
                  type="secondary" >
                  {exam.title}
                </Text>
              }
            />
          }
          // extra={<Checkbox
          //   key={exam.id}
          //   checked={isSelected(exam.id)}
          //   value={exam.id}
          //   onChange={(checked) => {
          //     setValueSelected(exam.id, checked);
          //   }}
          // />}
          >
          <Tabs
            type="line"
            style={{
              marginTop: -20,

            }}>
            <TabPane
              title={
                <>
                  <IconCalendarClock />
                  Time
                </>
              }
              style={{
                marginTop: -5,
                marginBottom: 5,
              }}
              key="time">
              <Space>
                <IconClockCircle />
                <Text>{exam.start.replace(' at', ',')}</Text>
                <IconArrowRight />
                <IconSchedule />
                <Text>{exam.end.replace(' at', ',')}</Text>
              </Space>
            </TabPane>
            {exam.building && <TabPane
              title={
                <>
                  <IconLocation />
                  Location
                </>
              }
              key="Location">
              <Space>
                <IconHome />
                <Space>
                  <Text>{exam.building}</Text>
                  <Text>{exam.room}</Text>
                </Space>
              </Space>
            </TabPane>}
            <TabPane
              title={
                <>
                  <IconInfoCircle />
                  Type
                </>
              }
              key="type">
              <Space>
                <IconUserGroup />
                <Text>{exam.type}</Text>
              </Space>
            </TabPane>
          </Tabs>
        </Card>
      ))}
    </Space>
  );
};

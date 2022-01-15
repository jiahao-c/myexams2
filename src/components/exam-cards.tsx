import { ExamSession } from '@/models';
import {
  Card,
  Checkbox, Skeleton, Space, Tabs, Typography
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
      <Space wrap size='medium'>
        {[1, 2, 3, 4].map(i => (<Card
          key={i}
          bordered={true}
          title={
            <Meta
              title={<Skeleton style={{ marginTop: 0 }} text={{ rows: 1, width: 180 }} />}
              description={<Skeleton text={{ rows: 1, width: 120 }} />}
            />
          }

        >
          <Tabs
            type="line"
            style={{
              marginTop: -20,
              marginBottom: -20,
            }}>
            <TabPane
              title={
                <Skeleton text={{ rows: 1, width: 42 }} />
              }
              style={{
                marginTop: 5,
                marginBottom: 5,
              }}
              key="time">
              <Space>
                <Skeleton text={{ rows: 2, width: 200 }} />
              </Space>
            </TabPane>
            <TabPane
              title={
                <Skeleton text={{ rows: 1, width: 42 }} />
              }
              key="Location">
              <Space>
              </Space>
            </TabPane>
            <TabPane
              title={
                <Skeleton text={{ rows: 1, width: 42 }} />
              }
              key="type">
              <Space>
                <Skeleton text={{ rows: 2, width: 200 }} />
              </Space>
            </TabPane>
          </Tabs>
        </Card >))}
      </Space>)
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
          extra={<Checkbox
            key={exam.id}
            checked={isSelected(exam.id)}
            value={exam.id}
            onChange={(checked) => {
              setValueSelected(exam.id, checked);
            }}
          />}>
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

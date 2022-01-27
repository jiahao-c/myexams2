import { ExamSession } from "@/models";
import { Button, Form, Input, Layout, Space, Spin, Typography } from "@arco-design/web-react";
import { DataStore } from "@aws-amplify/datastore";
import { useState } from "react";
import ReactJson from "react-json-view";
const Content = Layout.Content;

interface BlankJSON {
  message: string;
}

interface InfoJSON {
  exams: ExamSession[];
}

export function Admin() {
  const [loading, setLoading] = useState(false);
  const [parsedJSON, setParsedJSON] = useState<InfoJSON | BlankJSON>({
    message: "no data yet",
  });
  const [dbContent, setDBcontent] = useState<InfoJSON | BlankJSON>({
    message: "no data yet",
  });

  const handleDBupload = async () => {
    try {
      (parsedJSON as InfoJSON).exams.map(async (exam) => {
        await DataStore.save(new ExamSession(exam));
      });
      console.log("All ExamSession saved successfully!");
    } catch (error) {
      console.log("Error saving ExamSession", error);
    }
  };

  const handleViewDB = async () => {
    try {
      const posts = await DataStore.query(ExamSession);
      setDBcontent({exams:posts})
    } catch (error) {
      console.log("Error retrieving posts", error);
    }
  };

  const handleFormSubmit = async (values: Record<string, string>) => {
    const url = values.url.trim();
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    const requestInit: RequestInit = {
      method: "POST",
      headers: requestHeaders,
      mode: "cors",
      body: JSON.stringify({ url }),
    };
    const request = new Request(process.env.API_URL!, requestInit);
    setLoading(true);
    const response = await fetch(request);
    const data = await response.json();
    setParsedJSON(data);
    setLoading(false);
  };
  return (
    <Layout>
      <Content>
        <Space direction="vertical" align="start">
          <div>
            <Typography.Title
            heading={4}
            >View Current Database</Typography.Title>
            <Button>View</Button>
          </div>
          <div>
            <Typography.Title
            heading={4}
            >Update Database</Typography.Title>

            <Typography.Paragraph>
            <ol>
              <li>
                Provide URl to the EXAM PDF (e.g.
                https://www.mcgill.ca/exams/files/exams/december_2021_final_exam_schedule_-_with_rooms_v7.pdf)
              </li>
              <li>
                It will call the backend lambda function to parse the PDF into
                JSON. Note that it may take two tries, since the first
                invocation may timeout due to cold start. (it would say service
                unavailable)
              </li>
              <li>
                Then we will display the JSON. After verifying the JSON it good,
                we can update it in Amplify Data Store. The uploading may take a
                while...see network tab.
              </li>
            </ol>
            </Typography.Paragraph>
            <div>
            <Form 
            
            onSubmit={handleFormSubmit}>
          <Form.Item 
              field="url" label="URL" >
          <Input 
                    className='w-20'
          placeholder='please enter the url' />
              </Form.Item>
              <Button 
              className='w-20'
              htmlType="submit">Parse</Button>
            </Form>
            </div>
          </div>
          <div>
            <h2>Parse Result</h2>
            <Spin loading={loading} >
            <Space direction="vertical" align="start">
              <ReactJson
                src={parsedJSON}
                enableClipboard={false}
                theme="ocean"
                displayDataTypes={false}
              />
              <Button onClick={handleDBupload}>Upload to DB</Button>
            </Space>
            </Spin>
          </div>
          <div>
            <h2>View DB</h2>
            <Space align="start">
              See DB in console
              <Button onClick={handleViewDB}>View DB</Button>
            </Space>
              <ReactJson
                src={dbContent}
                enableClipboard={false}
                theme="ocean"
                displayDataTypes={false}
              />
          </div>
        </Space>
      </Content>
    </Layout>
  );
}

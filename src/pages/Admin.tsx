import { Button, Space, Form, Spin } from '@arco-design/web-react';
import { Layout } from '@arco-design/web-react';
import { ExamSession } from '@/models';
import { DataStore } from '@aws-amplify/datastore';
import { useState } from 'react';
import ReactJson from 'react-json-view';
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
        message: 'no data yet',
    });

    const handleDBupload = async () => {
        try {
            (parsedJSON as InfoJSON).exams.map(async exam => {
                await DataStore.save(new ExamSession(exam));
            });
            console.log('All ExamSession saved successfully!');
        } catch (error) {
            console.log('Error saving ExamSession', error);
        }
    };

    const handleViewDB = async () => {
        try {
            const posts = await DataStore.query(ExamSession);
            console.log(
                'ExamSession retrieved successfully!\n',
                JSON.stringify(posts, null, 2),
            );
        } catch (error) {
            console.log('Error retrieving posts', error);
        }
    };

    const handleFormSubmit = async (values: Record<string, string>) => {
        const url = values.url.trim();
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Content-Type', 'application/json');
        const requestInit: RequestInit = {
            method: 'POST',
            headers: requestHeaders,
            mode: 'cors',
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
                        <h2>View Current Database</h2>
                        <Button>View</Button>
                    </div>
                    <div>
                        <h2>Update Database</h2>
                        <ol>
                            <li>
                                Provide URl to the EXAM PDF (e.g.
                                https://www.mcgill.ca/exams/files/exams/december_2021_final_exam_schedule_-_with_rooms_v7.pdf)
                            </li>
                            <li>
                                It will call the backend lambda function to parse the PDF into JSON.
                                Note that it may take two tries, since the first invocation may
                                timeout due to cold start. (it would say service unavailable)
                            </li>
                            <li>
                                Then we will display the JSON. After verifying the JSON it good, we
                                can update it in Amplify Data Store. The uploading may take a
                                while...see network tab.
                            </li>
                        </ol>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Item field="url" label="URL" />
                            <Button htmlType="submit">Parse</Button>
                            <Spin loading={loading} />
                        </Form>
                    </div>
                    <div>
                        <h2>Parse Result</h2>
                        <Space direction="vertical" align="start">
                            <ReactJson
                                src={parsedJSON}
                                enableClipboard={false}
                                theme="ocean"
                                displayDataTypes={false}
                            />
                            <Button onClick={handleDBupload}>Upload to DB</Button>
                        </Space>
                    </div>
                    <div>
                        <h2>View DB</h2>
                        <Space align="start">
                            See DB in console
                            <Button onClick={handleViewDB}>View DB</Button>
                            <Button onClick={() => DataStore.clear()}>Clear local DB</Button>
                        </Space>
                    </div>
                </Space>
            </Content>
        </Layout>
    );
}
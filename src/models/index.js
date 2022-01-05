// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ExamSession } = initSchema(schema);

export {
  ExamSession
};
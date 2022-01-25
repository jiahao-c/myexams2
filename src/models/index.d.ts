import { ModelInit, MutableModel } from "@aws-amplify/datastore";





type ExamSessionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class ExamSession {
  readonly id: string;
  readonly term: string;
  readonly course: string;
  readonly section: string;
  readonly title: string;
  readonly type?: string;
  readonly start: string;
  readonly end: string;
  readonly building?: string;
  readonly room?: string;
  readonly row?: string;
  readonly from?: string;
  readonly to?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ExamSession, ExamSessionMetaData>);
  static copyOf(source: ExamSession, mutator: (draft: MutableModel<ExamSession, ExamSessionMetaData>) => MutableModel<ExamSession, ExamSessionMetaData> | void): ExamSession;
}
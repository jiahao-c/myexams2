/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateExamSessionInput = {
  id?: string | null,
  term: string,
  course: string,
  section: string,
  title: string,
  type?: string | null,
  start: string,
  end: string,
  building?: string | null,
  room?: string | null,
  row?: string | null,
  from?: string | null,
  to?: string | null,
};

export type ModelExamSessionConditionInput = {
  term?: ModelStringInput | null,
  course?: ModelStringInput | null,
  section?: ModelStringInput | null,
  title?: ModelStringInput | null,
  type?: ModelStringInput | null,
  start?: ModelStringInput | null,
  end?: ModelStringInput | null,
  building?: ModelStringInput | null,
  room?: ModelStringInput | null,
  row?: ModelStringInput | null,
  from?: ModelStringInput | null,
  to?: ModelStringInput | null,
  and?: Array< ModelExamSessionConditionInput | null > | null,
  or?: Array< ModelExamSessionConditionInput | null > | null,
  not?: ModelExamSessionConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ExamSession = {
  __typename: "ExamSession",
  id: string,
  term: string,
  course: string,
  section: string,
  title: string,
  type?: string | null,
  start: string,
  end: string,
  building?: string | null,
  room?: string | null,
  row?: string | null,
  from?: string | null,
  to?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateExamSessionInput = {
  id: string,
  term?: string | null,
  course?: string | null,
  section?: string | null,
  title?: string | null,
  type?: string | null,
  start?: string | null,
  end?: string | null,
  building?: string | null,
  room?: string | null,
  row?: string | null,
  from?: string | null,
  to?: string | null,
};

export type DeleteExamSessionInput = {
  id: string,
};

export type SearchableExamSessionFilterInput = {
  id?: SearchableIDFilterInput | null,
  term?: SearchableStringFilterInput | null,
  course?: SearchableStringFilterInput | null,
  section?: SearchableStringFilterInput | null,
  title?: SearchableStringFilterInput | null,
  type?: SearchableStringFilterInput | null,
  start?: SearchableStringFilterInput | null,
  end?: SearchableStringFilterInput | null,
  building?: SearchableStringFilterInput | null,
  room?: SearchableStringFilterInput | null,
  row?: SearchableStringFilterInput | null,
  from?: SearchableStringFilterInput | null,
  to?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableExamSessionFilterInput | null > | null,
  or?: Array< SearchableExamSessionFilterInput | null > | null,
  not?: SearchableExamSessionFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableExamSessionSortInput = {
  field?: SearchableExamSessionSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableExamSessionSortableFields {
  id = "id",
  term = "term",
  course = "course",
  section = "section",
  title = "title",
  type = "type",
  start = "start",
  end = "end",
  building = "building",
  room = "room",
  row = "row",
  from = "from",
  to = "to",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableExamSessionAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableExamSessionAggregateField,
};

export enum SearchableAggregateType {
  terms = "terms",
  avg = "avg",
  min = "min",
  max = "max",
  sum = "sum",
}


export enum SearchableExamSessionAggregateField {
  id = "id",
  term = "term",
  course = "course",
  section = "section",
  title = "title",
  type = "type",
  start = "start",
  end = "end",
  building = "building",
  room = "room",
  row = "row",
  from = "from",
  to = "to",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableExamSessionConnection = {
  __typename: "SearchableExamSessionConnection",
  items:  Array<ExamSession | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableAggregateResult = {
  __typename: "SearchableAggregateResult",
  name: string,
  result?: SearchableAggregateGenericResult | null,
};

export type SearchableAggregateGenericResult = SearchableAggregateScalarResult | SearchableAggregateBucketResult


export type SearchableAggregateScalarResult = {
  __typename: "SearchableAggregateScalarResult",
  value: number,
};

export type SearchableAggregateBucketResult = {
  __typename: "SearchableAggregateBucketResult",
  buckets?:  Array<SearchableAggregateBucketResultItem | null > | null,
};

export type SearchableAggregateBucketResultItem = {
  __typename: "SearchableAggregateBucketResultItem",
  key: string,
  doc_count: number,
};

export type ModelExamSessionFilterInput = {
  id?: ModelIDInput | null,
  term?: ModelStringInput | null,
  course?: ModelStringInput | null,
  section?: ModelStringInput | null,
  title?: ModelStringInput | null,
  type?: ModelStringInput | null,
  start?: ModelStringInput | null,
  end?: ModelStringInput | null,
  building?: ModelStringInput | null,
  room?: ModelStringInput | null,
  row?: ModelStringInput | null,
  from?: ModelStringInput | null,
  to?: ModelStringInput | null,
  and?: Array< ModelExamSessionFilterInput | null > | null,
  or?: Array< ModelExamSessionFilterInput | null > | null,
  not?: ModelExamSessionFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelExamSessionConnection = {
  __typename: "ModelExamSessionConnection",
  items:  Array<ExamSession | null >,
  nextToken?: string | null,
};

export type CreateExamSessionMutationVariables = {
  input: CreateExamSessionInput,
  condition?: ModelExamSessionConditionInput | null,
};

export type CreateExamSessionMutation = {
  createExamSession?:  {
    __typename: "ExamSession",
    id: string,
    term: string,
    course: string,
    section: string,
    title: string,
    type?: string | null,
    start: string,
    end: string,
    building?: string | null,
    room?: string | null,
    row?: string | null,
    from?: string | null,
    to?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateExamSessionMutationVariables = {
  input: UpdateExamSessionInput,
  condition?: ModelExamSessionConditionInput | null,
};

export type UpdateExamSessionMutation = {
  updateExamSession?:  {
    __typename: "ExamSession",
    id: string,
    term: string,
    course: string,
    section: string,
    title: string,
    type?: string | null,
    start: string,
    end: string,
    building?: string | null,
    room?: string | null,
    row?: string | null,
    from?: string | null,
    to?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteExamSessionMutationVariables = {
  input: DeleteExamSessionInput,
  condition?: ModelExamSessionConditionInput | null,
};

export type DeleteExamSessionMutation = {
  deleteExamSession?:  {
    __typename: "ExamSession",
    id: string,
    term: string,
    course: string,
    section: string,
    title: string,
    type?: string | null,
    start: string,
    end: string,
    building?: string | null,
    room?: string | null,
    row?: string | null,
    from?: string | null,
    to?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SearchExamSessionsQueryVariables = {
  filter?: SearchableExamSessionFilterInput | null,
  sort?: Array< SearchableExamSessionSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableExamSessionAggregationInput | null > | null,
};

export type SearchExamSessionsQuery = {
  searchExamSessions?:  {
    __typename: "SearchableExamSessionConnection",
    items:  Array< {
      __typename: "ExamSession",
      id: string,
      term: string,
      course: string,
      section: string,
      title: string,
      type?: string | null,
      start: string,
      end: string,
      building?: string | null,
      room?: string | null,
      row?: string | null,
      from?: string | null,
      to?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetExamSessionQueryVariables = {
  id: string,
};

export type GetExamSessionQuery = {
  getExamSession?:  {
    __typename: "ExamSession",
    id: string,
    term: string,
    course: string,
    section: string,
    title: string,
    type?: string | null,
    start: string,
    end: string,
    building?: string | null,
    room?: string | null,
    row?: string | null,
    from?: string | null,
    to?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListExamSessionsQueryVariables = {
  filter?: ModelExamSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExamSessionsQuery = {
  listExamSessions?:  {
    __typename: "ModelExamSessionConnection",
    items:  Array< {
      __typename: "ExamSession",
      id: string,
      term: string,
      course: string,
      section: string,
      title: string,
      type?: string | null,
      start: string,
      end: string,
      building?: string | null,
      room?: string | null,
      row?: string | null,
      from?: string | null,
      to?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateExamSessionSubscription = {
  onCreateExamSession?:  {
    __typename: "ExamSession",
    id: string,
    term: string,
    course: string,
    section: string,
    title: string,
    type?: string | null,
    start: string,
    end: string,
    building?: string | null,
    room?: string | null,
    row?: string | null,
    from?: string | null,
    to?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateExamSessionSubscription = {
  onUpdateExamSession?:  {
    __typename: "ExamSession",
    id: string,
    term: string,
    course: string,
    section: string,
    title: string,
    type?: string | null,
    start: string,
    end: string,
    building?: string | null,
    room?: string | null,
    row?: string | null,
    from?: string | null,
    to?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteExamSessionSubscription = {
  onDeleteExamSession?:  {
    __typename: "ExamSession",
    id: string,
    term: string,
    course: string,
    section: string,
    title: string,
    type?: string | null,
    start: string,
    end: string,
    building?: string | null,
    room?: string | null,
    row?: string | null,
    from?: string | null,
    to?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

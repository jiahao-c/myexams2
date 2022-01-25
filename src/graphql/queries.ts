/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchExamSessions = /* GraphQL */ `
  query SearchExamSessions(
    $filter: SearchableExamSessionFilterInput
    $sort: [SearchableExamSessionSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableExamSessionAggregationInput]
  ) {
    searchExamSessions(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        term
        course
        section
        title
        type
        start
        end
        building
        room
        row
        from
        to
        createdAt
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getExamSession = /* GraphQL */ `
  query GetExamSession($id: ID!) {
    getExamSession(id: $id) {
      id
      term
      course
      section
      title
      type
      start
      end
      building
      room
      row
      from
      to
      createdAt
      updatedAt
    }
  }
`;
export const listExamSessions = /* GraphQL */ `
  query ListExamSessions(
    $filter: ModelExamSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExamSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        term
        course
        section
        title
        type
        start
        end
        building
        room
        row
        from
        to
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;



export const listExamSelectOptions = /* GraphQL */ `
  query listExamSelectOptions(
    $limit: Int
  ) {
    listExamSessions(limit: $limit) {
      items {
        course,
        title,
        section,
      }
    }
  }
`;

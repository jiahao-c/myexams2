/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createExamSession = /* GraphQL */ `
  mutation CreateExamSession(
    $input: CreateExamSessionInput!
    $condition: ModelExamSessionConditionInput
  ) {
    createExamSession(input: $input, condition: $condition) {
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
export const updateExamSession = /* GraphQL */ `
  mutation UpdateExamSession(
    $input: UpdateExamSessionInput!
    $condition: ModelExamSessionConditionInput
  ) {
    updateExamSession(input: $input, condition: $condition) {
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
export const deleteExamSession = /* GraphQL */ `
  mutation DeleteExamSession(
    $input: DeleteExamSessionInput!
    $condition: ModelExamSessionConditionInput
  ) {
    deleteExamSession(input: $input, condition: $condition) {
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

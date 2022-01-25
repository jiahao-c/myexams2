
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

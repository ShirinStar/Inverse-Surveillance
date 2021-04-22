export function organizeTableFields(tableFields) {
  return _.sortBy(
    _.groupBy(tableFields, (row) => row.row_idx),
    (row) => row.row_idx);
}

export function extractTableHeaders(tableFields) {
  const sortedFields = organizeTableFields(tableFields);
  return sortedFields.length > 0 ? (
    _.sortBy(sortedFields[0], (input) => input.col_idx)) : (
      []
    );
}

export function convertToInputs(tableFields) {
  const fields = _.values(_.groupBy(tableFields, (row) => row.row_idx))
    .map(row => ({
      id: row[0].row_idx,
      inputs: row,
    }));

  console.log('output: ', fields);
  return fields;
}

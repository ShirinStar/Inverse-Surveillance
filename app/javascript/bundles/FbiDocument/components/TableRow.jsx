import React from 'react';

import { extractTableHeaders, organizeTableFields } from './table';

export default function TableRow({ field, fieldEdit, isEditing }) {
  const { table_fields } = field;
  const headers = extractTableHeaders(table_fields);
  const inputs = organizeTableFields(table_fields);

  function renderTablePreview() {
    return (
      <>
        <table className='tableform'>
          <thead>
            <tr>
              {headers.map((input, idx) => (
                <th className={input.is_redacted ? "redacted" : ""}key={idx}>{input.value}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inputs.slice(1).map((row, rowIdx) => (
              <tr key={rowIdx}>
                {_.sortBy(row, (el) => el.col_idx).map(col => (
                  <td className={col.is_redacted ? "redacted" : ""} key={col.id}>{col.value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }


  function renderTableEdit() {
    return (
      <div>Editing</div>
    )
  }
  if (fieldEdit && field.id === fieldEdit.id) {
    return renderTableEdit();
  } else {
    return renderTablePreview();
  }
  
}

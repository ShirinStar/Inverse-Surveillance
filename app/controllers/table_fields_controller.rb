class TableFieldsController < ApplicationController
  def create
    table_fields = []
    field_params[:table_fields].each.with_index do |row, row_idx|
      row[:inputs].each.with_index do |input, col_idx|

        table_fields.push(TableField.new({
          row_idx: row_idx,
          col_idx: col_idx,
          value: input[:value],
          is_redacted: input[:is_redacted],
        }))
      end
    end

    field = Field.new({
      page_number: field_params[:page_number],
      serial_number: field_params[:serial_number],
      digital_document_id: field_params[:digital_document_id],
      field_type: Field::TABLE_TYPE,
      table_fields: table_fields,
    })

    if field.save
      render json: field.to_json({ include: :table_fields })
    else
      render json: field.errors, status: 400
    end
  end

  private

  def field_params
    params.permit(
      :id,
      :turk_document_id,
      :page_number,
      :serial_number,
      :digital_document_id,
      :turk_document_id,
      :table_fields => [
        :id,
        :inputs => [
          :is_redacted,
          :value
        ],
      ],
    )
  end
end

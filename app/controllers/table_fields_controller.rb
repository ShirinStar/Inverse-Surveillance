class TableFieldsController < ApplicationController
  def update
    table_fields = build_table_fields(update_field_params["inputRows"])
    field_id = update_field_params["id"]
    field = Field.find(field_id)
    field.update!(table_fields: table_fields)
    render json: field.table_fields
  end

  def create
    table_fields = build_table_fields(field_params[:table_fields])

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

  def build_table_fields(fields)
    table_fields = []
    fields.each.with_index do |row, row_idx|
      row[:inputs].each.with_index do |input, col_idx|

        table_fields.push(TableField.new({
          row_idx: row_idx,
          col_idx: col_idx,
          value: input[:value],
          is_redacted: input[:is_redacted],
        }))
      end
    end

    table_fields
  end

  def update_field_params
    params.permit(
      :id,
      inputRows: [
        :id,
        :inputs => [
          :id,
          :is_redacted,
          :row_idx,
          :col_idx,
          :value
        ],
      ]
    )
  end


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

class TableFieldsController < ApplicationController
  def create
    field = Field.new({
      page_number: field_params[:page_number],
      serial_number: field_params[:serial_number],
      digital_document_id: field_params[:turk_document_id],
      field_type: Field::TABLE_TYPE,
    })

    if field.save
      render json: field
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
      :turk_document_id
    )
  end
end

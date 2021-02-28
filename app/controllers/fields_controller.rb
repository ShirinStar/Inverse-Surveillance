class FieldsController < ApplicationController
  def create
    field = Field.create!(
      label: field_params[:label],
      text_body: field_params[:text_body],
      digital_document_id: field_params[:turk_document_id],
    )
    render json: field
  end

  def field_params
    params.permit(:label, :text_body, :turk_document_id)
  end
end

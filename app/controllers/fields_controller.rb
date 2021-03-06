class FieldsController < ApplicationController
  def create
    body = field_params[:parsed_body]

    matches = body.scan(/\/\/\/REDACTION: ([\w\- ]+) \|\| SIZE: ([\w\- ]+) \|\| UUID: ([\w\- ]+)\/\/\//)
      .map { |match| { code: match[0], size: match[1], client_id: match[2] } }
    p matches

    field = Field.create!(
      label: field_params[:label].downcase,
      page_number: field_params[:page_number],
      serial_number: field_params[:serialNumber],
      text_body: field_params[:text_body],
      digital_document_id: field_params[:turk_document_id],
    )
    render json: field
  end

  def field_params
    params.permit(
      :label,
      :parsed_body,
      :raw_html,
      :turk_document_id,
      :pageSerialNumber,
      :page_number
    )
  end
end

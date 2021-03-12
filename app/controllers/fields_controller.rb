class FieldsController < ApplicationController
  def create
    body = field_params[:parsed_body]

    redactions = body.scan(/\/\/\/REDACTION: ([\w\- ]+) \|\| SIZE: ([\w\- ]+) \|\| UUID: ([\w\- ]+)\/\/\//)
      .map { |match| Redaction.new( code: match[0], size: match[1], client_id: match[2] ) }

    field = Field.create!(
      label: field_params[:label].downcase,
      page_number: field_params[:page_number],
      serial_number: field_params[:pageSerialNumber],
      text_body: field_params[:parsed_body],
      raw_html: field_params[:raw_html],
      digital_document_id: field_params[:turk_document_id],
      redactions: redactions,
    )
    
    render json: field
  end

  def update
    body = field_params[:parsed_body]
    p body

    render status: 200
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

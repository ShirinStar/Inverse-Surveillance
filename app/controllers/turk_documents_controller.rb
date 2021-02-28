class TurkDocumentsController < ApplicationController
  def new
    doc = Document.first
    @doc_url = doc.give_public_url
    @doc_id = doc.id
  end

  def create
    p doc_params
    doc = DigitalDocument.create!(
      document_number: doc_params[:document_serial_number],
      document_date: doc_params[:document_date],
      document_id: doc_params[:doc_id]
    )
    render json: true

  end

  private
  def doc_params
    params.permit(:document_date, :document_serial_number, :doc_id)
  end
end

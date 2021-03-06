class TurkDocumentsController < ApplicationController
  def new
    doc = Document.last
    @doc_url = doc.give_public_url
    @doc_id = doc.id
    @page_count = doc.page_length
    @labels = Field.pluck(:label).uniq.compact
  end

  def create
    doc = DigitalDocument.create!(
      document_date: doc_params[:document_date],
      document_id: doc_params[:docId]
    )
    render json: doc

  end

  private
  def doc_params
    params.permit(:document_date, :docId)
  end
end

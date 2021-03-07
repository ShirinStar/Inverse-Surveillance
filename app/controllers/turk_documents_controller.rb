class TurkDocumentsController < ApplicationController
  def new
    doc = Document.last
    @doc_url = doc.give_public_url
    @doc_id = doc.id
    @page_count = doc.page_length
    @labels = Field.pluck(:label).uniq.compact
  end

  def complete
    doc = Document.find(complete_params[:doc_id])
    digital_doc = doc.digital_document
    digital_doc.complete

    redirect_to "/"
  end

  def create
    parent_doc = Document.find(doc_params[:docId])
    digital_doc = parent_doc.digital_document
    if !digital_doc.nil?
      digital_doc.destroy
    end
    doc = DigitalDocument.create!(
      document_date: doc_params[:document_date],
      document_id: doc_params[:docId]
    )
    doc.document.update!(status: 'In Progress')
    render json: doc

  end

  private
  def doc_params
    params.permit(:document_date, :docId)
  end

  def complete_params
    params.permit(:doc_id)
  end
end

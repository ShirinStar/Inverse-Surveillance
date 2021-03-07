class TurkDocumentsController < ApplicationController
  def new
    doc = Document.last
    redirect_to edit_turk_document_path(doc.public_id)
  end

  def edit
    doc = Document.find_by(public_id: edit_params[:id])
    @doc_url = doc.give_public_url
    @doc_id = doc.id
    @page_count = doc.page_length
    @labels = Field.pluck(:label).uniq.compact

    render "turk_documents/new"
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

  def edit_params
    params.permit(:id)
  end
end

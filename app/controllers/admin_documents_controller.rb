class AdminDocumentsController < ApplicationController
  def index
    docs = Document.all.map do |doc|
      doc.to_admin_json
    end

    @props = {
      docs: docs
    }
  end

  def login 
    if admin_params[:admin_password] == '123'
      redirect_to('/admin/documents')
  end
end

def review
  @page =  reviews_params[:page]&.to_i || 1
  doc = Document
    .includes(:digital_document)
    .find(reviews_params[:id])
  @date = doc.digital_document.document_date
  @fields = doc.digital_document
    .fields
    .where(page_number: @page)
    .to_json({ include: :table_fields })
  @page_count = doc.page_length
  @doc_url = doc.give_public_url
  @doc_id = doc.id
end

def approve
  doc = Document.find(reviews_params[:id])
  doc.approve

  redirect_to admin_documents_path
end

def reject
  doc = Document.find(reviews_params[:id])
  doc.reject

  redirect_to admin_documents_path
end

  def admin_params
    params.permit(:admin_password)
  end 

  def reviews_params
    params.permit(:id, :page)
  end
end

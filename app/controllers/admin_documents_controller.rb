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
  p reviews_params[:id]
  doc = Document.find(reviews_params[:id])
  @date = doc.digital_document.document_date
  @fields = doc.digital_document.fields.to_json
end

  def admin_params
    params.permit(:admin_password)
  end 

  def reviews_params
    params.permit(:id)
  end
end

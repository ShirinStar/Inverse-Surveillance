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

  def admin_params
    params.permit(:admin_password)
  end 
end

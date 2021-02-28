class AdminDocumentsController < ApplicationController
  def index
    docs = Document.all.map do |doc|
      doc.to_admin_json
    end

    @props = {
      docs: docs
    }
  end
end

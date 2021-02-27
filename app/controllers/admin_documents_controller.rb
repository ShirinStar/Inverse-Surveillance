class AdminDocumentsController < ApplicationController
  def index
    p Document.count
    docs = Document.all.map do |doc|
      doc.to_json
    end

    @props = {
      docs: docs
    }
  end
end

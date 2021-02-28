class RemoveSerialFromDigitalDocuments < ActiveRecord::Migration[6.0]
  def change
    remove_column :digital_documents, :document_number
  end
end

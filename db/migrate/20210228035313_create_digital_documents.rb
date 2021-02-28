class CreateDigitalDocuments < ActiveRecord::Migration[6.0]
  def change
    create_table :digital_documents do |t|
      t.string :document_number, null: false
      t.date :document_date, null: false

      t.references :document

      t.timestamps
    end
  end
end

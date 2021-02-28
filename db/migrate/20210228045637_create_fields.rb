class CreateFields < ActiveRecord::Migration[6.0]
  def change
    create_table :fields do |t|
      t.string :serial_number
      t.string :text_body
      t.string :label
      t.boolean :is_redacted
      t.references :digital_document

      t.timestamps
    end
  end
end

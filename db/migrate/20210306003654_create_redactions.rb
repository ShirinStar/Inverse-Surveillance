class CreateRedactions < ActiveRecord::Migration[6.0]
  def change
    create_table :redactions do |t|
      t.integer :client_id
      t.string :code
      t.string :size

      t.references :field

      t.timestamps
    end
  end
end

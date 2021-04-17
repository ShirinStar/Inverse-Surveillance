class CreatetableFields < ActiveRecord::Migration[6.0]
  def change
    create_table :table_fields do |t|
      t.integer :row_idx
      t.integer :col_idx
      t.text :value
      t.boolean :is_redacted

      t.references :field
    end
  end
end

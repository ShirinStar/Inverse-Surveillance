class AddFieldTypeToFields < ActiveRecord::Migration[6.0]
  def change
    add_column :fields, :field_type, :string

    Field.update(field_type: "INPUT")
    change_column_null :fields, :field_type, false

  end
end

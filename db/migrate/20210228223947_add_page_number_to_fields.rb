class AddPageNumberToFields < ActiveRecord::Migration[6.0]
  def change
    add_column(:fields, :page_number, :integer)
  end
end

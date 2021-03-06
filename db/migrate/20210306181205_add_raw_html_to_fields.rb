class AddRawHtmlToFields < ActiveRecord::Migration[6.0]
  def change
    add_column :fields, :raw_html, :string
  end
end

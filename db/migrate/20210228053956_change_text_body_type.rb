class ChangeTextBodyType < ActiveRecord::Migration[6.0]
  def change
    change_column(:fields, :text_body, :text)
  end
end

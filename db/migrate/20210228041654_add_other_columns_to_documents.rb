class AddOtherColumnsToDocuments < ActiveRecord::Migration[6.0]
  def change
    change_table :documents do |t|
      t.string :category
      t.string :status
    end
  end
end

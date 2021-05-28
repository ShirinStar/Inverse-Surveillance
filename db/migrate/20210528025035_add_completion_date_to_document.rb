class AddCompletionDateToDocument < ActiveRecord::Migration[6.0]
  def change
    add_column :documents, :completion_date, :datetime
  end
end

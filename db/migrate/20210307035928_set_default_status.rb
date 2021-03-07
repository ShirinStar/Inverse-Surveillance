class SetDefaultStatus < ActiveRecord::Migration[6.0]
  def change
    change_column_default(
      :documents,
      :status,
      "Not Started"
    )
  end
end

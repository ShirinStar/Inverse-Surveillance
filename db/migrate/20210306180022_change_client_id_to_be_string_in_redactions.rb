class ChangeClientIdToBeStringInRedactions < ActiveRecord::Migration[6.0]
  def change
    change_column :redactions, :client_id, :string
  end
end

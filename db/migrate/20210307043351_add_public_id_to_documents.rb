class AddPublicIdToDocuments < ActiveRecord::Migration[6.0]
  def change
    add_column :documents, :public_id, :uuid, unique: true, null: false, default: "uuid_generate_v4()"
  end
end

class AddStartSerialNumberToDigitalDocument < ActiveRecord::Migration[6.0]
  def change
    add_column :digital_documents, :start_serial_number, :string
  end
end

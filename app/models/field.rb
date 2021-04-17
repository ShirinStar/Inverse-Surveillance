class Field < ApplicationRecord
  belongs_to :digital_document
  has_many :redactions
  has_many :table_fields
  validates_presence_of :field_type, :serial_number

  TABLE_TYPE = "TABLE"
  INPUT_TYPE = "INPUT"
end

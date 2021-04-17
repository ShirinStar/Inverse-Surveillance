class Field < ApplicationRecord
  belongs_to :digital_document
  has_many :redactions
  has_many :table_fields

  # TODO: un-comment out.  this is temporarily disabled
  # since the regular field request does not always pass
  # in a serial number
  #validates_presence_of :field_type, :serial_number

  TABLE_TYPE = "TABLE"
  INPUT_TYPE = "INPUT"
end

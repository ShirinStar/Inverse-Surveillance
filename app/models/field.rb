class Field < ApplicationRecord
  belongs_to :digital_document
  has_many :redactions
  validates_presence_of :field_type

  TABLE_TYPE = "TABLE"
  INPUT_TYPE = "INPUT"
end

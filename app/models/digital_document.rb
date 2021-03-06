class DigitalDocument < ApplicationRecord
  belongs_to :document
  has_many :fields
  has_many :redactions, through: :fields
end

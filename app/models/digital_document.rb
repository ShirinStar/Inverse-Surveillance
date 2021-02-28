class DigitalDocument < ApplicationRecord
  belongs_to :document
  has_many :fields
end

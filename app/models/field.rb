class Field < ApplicationRecord
  belongs_to :digital_document
  has_many :redactions
end

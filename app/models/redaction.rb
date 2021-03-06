class Redaction < ApplicationRecord
  belongs_to :field
  delegate :digital_document, :to => :field
end

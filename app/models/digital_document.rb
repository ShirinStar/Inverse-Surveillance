class DigitalDocument < ApplicationRecord
  belongs_to :document
  has_many :fields
  has_many :redactions, through: :fields

  def complete
    document.update!(status: "Complete")
  end
end

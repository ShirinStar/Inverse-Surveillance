class DigitalDocument < ApplicationRecord
  belongs_to :document
  has_many :fields, dependent: :destroy
  has_many :redactions, through: :fields, dependent: :destroy
  validates_uniqueness_of :document_id

  def complete
    document.update!(status: "Complete")
  end

end

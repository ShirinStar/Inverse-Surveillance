class DigitalDocument < ApplicationRecord
  belongs_to :document
  has_many :fields, dependent: :destroy
  has_many :redactions, through: :fields, dependent: :destroy
  validates_uniqueness_of :document_id

  def complete
    Time.zone = 'Central Time (US & Canada)'
    now = Time.current

    document.update!(status: "Complete", completion_date: now)
  end

end

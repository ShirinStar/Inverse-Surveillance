class Document < ApplicationRecord
  has_one_attached :doc_file
  has_one :digital_document
  attribute :public_id, :uuid, default: -> { SecureRandom.uuid }
  validates :public_id, uniqueness: true, presence: true

  def self.ingest_document(file_name)
    page_count = PDF::Reader.new(file_name)
      .page_count

    doc = Document.new()
    doc.page_length = page_count
    doc.name = File.basename(file_name)
    doc.doc_file.attach(io: 
                        File.open(file_name),
                        filename: File.basename(file_name))

    doc.save!
  end

  def give_public_url
    doc_file.blob.service_url
  end

  def reject
    digital_document&.destroy!
    update!(status: "Not Started")
  end

  def approve
    update!(status: "Approve")
  end

  def to_admin_json
    {
      id: id,
      category: category,
      name: name,
      page_length: page_length,
      original_doc_url: give_public_url,
      digital_doc_url: "/admin/documents/#{id}/approval",
      public_id: public_id,
      status: status,
  }.to_json
  end
=begin
  fetch documents from s3 with:
  doc.doc_file.blob.service_url
=end
end

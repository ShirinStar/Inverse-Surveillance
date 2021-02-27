class Document < ApplicationRecord
  has_one_attached :doc_file

  def self.ingest_document(file_name)
    page_count = PDF::Reader.new(file_name)
      .page_count

    doc = Document.new()
    doc.page_length = page_count
    doc.doc_file.attach(io: 
                        File.open(file_name),
                        filename: File.basename(file_name))

    doc.save!
  end
=begin
  fetch documents from s3 with:
  doc.doc_file.blob.service_url
=end
end

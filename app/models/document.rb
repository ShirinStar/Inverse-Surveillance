class Document < ApplicationRecord
  has_one_attached :doc_file

=begin
  fetch documents from s3 with:
  doc.doc_file.blob.service_url
=end
end

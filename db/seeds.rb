Document.create!([
  {name: "17-cv-04782 - 8158-8167.PDF", page_length: 9, category: "GEN", status: "In Progress", public_id: "eabb27aa-7f1f-4839-82a8-91e4d93e20f3"},
  {name: "17-cv-04782 -8258-8286.pdf", page_length: 6, category: "GEN", status: "In Progress", public_id: "654c1f71-c7f7-4505-9036-b37a5c69b709"},
])
DigitalDocument.create!([
  {document_date: "2021-04-14", document_id: Document.first.id},
  {document_date: "2021-03-30", document_id: Document.second.id},
])

ActiveStorage::Blob.create!([
  {key: "rsdgpj236qfzltlumi6de2rfh7qh", filename: "17-cv-04782 - 8158-8167.PDF", content_type: "application/pdf", metadata: {"identified"=>true, "analyzed"=>true}, byte_size: 237614, checksum: "4QrjXAfqCtcWGfBG9yuR3Q=="},
  {key: "1tr4dteo3mr7f2emzd9xhdxctvb3", filename: "17-cv-04782 -8258-8286.pdf", content_type: "application/pdf", metadata: {"identified"=>true, "analyzed"=>true}, byte_size: 235640, checksum: "cC9i93AS370UJ3WTWox+vg=="},
])

ActiveStorage::Attachment.create!([
  {name: "doc_file", record_type: "Document", record_id: 1, blob_id: ActiveStorage::Blob.first.id},
  {name: "doc_file", record_type: "Document", record_id: 2, blob_id: ActiveStorage::Blob.second.id},
])

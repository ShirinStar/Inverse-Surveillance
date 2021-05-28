require 'rails_helper'

RSpec.describe DigitalDocument, type: :model do
  it "completes with current date" do

    doc = Document.first
    doc.digital_document.complete

    expect(doc.completion_date).not_to be_nil
  end
end

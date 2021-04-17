require 'rails_helper'

RSpec.describe "TableFields", type: :request do
  let(:headers) {
    {
      "CONTENT-TYPE": "application/json", "ACCEPT": "application/json"
    }
  }

  let(:payload) {
    {
      digital_document_id: DigitalDocument.first.id,
      table_fields: [
        {
          id: 0,
          inputs: [
            {
              is_redacted: false,
              value: "nothing to hide here"
            },
            {
              is_redacted: true,
              value: "ez0"
            }
          ]
        },
        {
          id: 1,
          digital_document_id: DigitalDocument.first.id,
          inputs: [
            {
              is_redacted: true,
              value: "CTR"
            },
            {
              is_redacted: false,
              value: "Very Not-Secret Statement"
            }
          ]
        }
      ]
    }
  }

  it "can create a table field" do
    post "/table_fields", params: payload.to_json, headers: headers
    expect(response).to be_ok
  end

  it "changes the field count" do
    expect do
      post "/table_fields", params: payload.to_json, headers: headers
      expect(response).to be_ok
    end.to change { Field.count }.by(1)
  end

  it "changes table rows count" do
    expect do
      post "/table_fields", params: payload.to_json, headers: headers
    end.to change { TableField.count }.by(4)
  end

  it "creates the correct table field" do
    post "/table_fields", params: payload.to_json, headers: headers
    expect(response).to be_ok
    field = TableField.last
    expect(field.is_redacted).to be false
    expect(field.value).to match "Not-Secret"
    expect(field.row_idx).to be 1
    expect(field.col_idx).to be 1

    second = TableField.last(2).first
    expect(second.row_idx).to be 1
    expect(second.col_idx).to be 0
  end
end

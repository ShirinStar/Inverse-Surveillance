require 'rails_helper'

RSpec.describe "TableFields", type: :request do
  before(:all) do

  end
  let(:payload) {
    {
      inputs: [
        {
          is_redacted: false,
          value: "nothing to hide here"
        },
        {
          is_redacted: true,
          value: "here's the secret"
        }
      ]
    }
  }

  it "can create a table field" do
    headers = { "CONTENT-TYPE": "application/json", "ACCEPT": "application/json" }
    debugger
    post "/table_fields", params: payload.to_json, headers: headers
    expect(response).to be_ok
  end

  it "changes the field count" do
    expect do
      post "/table_fields", params: payload.to_json, headers: headers
    end.to change { Field.count }.by(1)
  end

end

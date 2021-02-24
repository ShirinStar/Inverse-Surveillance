require 'rails_helper'

RSpec.describe "Foos", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/foo/index"
      expect(response).to have_http_status(:success)
    end
  end

end

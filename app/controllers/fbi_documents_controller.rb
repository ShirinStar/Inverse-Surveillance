class FbiDocumentsController < ApplicationController
  def index
    @props = {

    }
    @favorite_person = "shirin"
    @not_favorite_people = [
      "Brian",
      "Drakey",
      "Mommy"
    ]
  end
end

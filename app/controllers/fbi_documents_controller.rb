class FbiDocumentsController < ApplicationController
  def index
    @favorite_person = "shirin"
    @not_favorite_people = [
      "Brian",
      "Drakey",
      "Mommy"
    ]
  end
end

class AuthController < ApplicationController
  def show
    resp = %{
    BCCAB17CAA3E5C67E0682CCE8202880E8B140CCF0255010830979C2369922F93
    comodoca.com
    eb607abc6428e51
}
    render plain: resp, content_type: 'text/plain'
  end
end

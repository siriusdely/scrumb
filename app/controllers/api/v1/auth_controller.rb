class Api::V1::AuthController < ApiController
  skip_before_action :authorize_request, only: :login

  # return auth token once user is authenticated
  def login
    auth_token =
      AuthenticateUser.new(auth_params[:email], auth_params[:password]).call
    json_response(auth_token: auth_token)
  end

  private

  def auth_params
    params.permit(:email, :password)
  end
end

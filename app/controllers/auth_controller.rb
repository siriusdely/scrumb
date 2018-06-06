class AuthController < ApplicationController

  def is_signed_in?
    puts "current_user: #{current_user.inspect}"
    if user_signed_in?
      render :json => { "signed_in" => true, "user" => current_user }.to_json
    else
      render :json => { "signed_in" => false }.to_json
    end
  end
end

# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      header_array = request.headers[:HTTP_SEC_WEBSOCKET_PROTOCOL].split(',')
      token = header_array[header_array.length - 1]
      header = { 'Authorization' => token }
      AuthorizeApiRequest.new(header).call[:user]
    rescue StandardError => e
      puts "ApplicationCable::Connection => #{e.inspect}"
      reject_unauthorized_connection
    end
  end
end

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  has_many :messages
  has_many :topics, through: :messages

  def avatar_url
    "//www.gravatar.com/avatar/#{Digest::MD5.hexdigest(email.strip.downcase)}?d=robohash&s=60"
  end
end

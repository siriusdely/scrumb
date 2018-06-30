class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  has_many :memberships, dependent: :destroy
  has_many :scrums, through: :memberships
  has_many :tasks

  has_many :messages
  has_many :discussions, through: :messages

  def avatar_url
    "//www.gravatar.com/avatar/#{Digest::MD5.hexdigest(email.strip.downcase)}?d=robohash&s=60"
  end
end

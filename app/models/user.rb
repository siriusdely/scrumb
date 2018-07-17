class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  validates_presence_of :first_name, :last_name

  has_many :memberships, dependent: :destroy
  has_many :scrums, through: :memberships
  has_many :tasks

  has_many :rotations
  has_many :todos, through: :rotations, class_name: 'Task', foreign_key: 'user_id'

  has_many :messages
  has_many :discussions, through: :messages

  def avatar_url
    "//www.gravatar.com/avatar/#{Digest::MD5.hexdigest(email.strip.downcase)}?d=robohash&s=60"
  end
end

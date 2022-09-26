# frozen_string_literal: true

class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,:validatable
  include DeviseTokenAuth::Concerns::User

  validates :name, length: { maximum: 30 }, presence: true
  has_many :users_sections, class_name: 'UserSection', dependent: :destroy
  has_many :sections, through: :users_sections
end

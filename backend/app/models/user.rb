# frozen_string_literal: true

class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,:validatable
  include DeviseTokenAuth::Concerns::User

  validates :name, length: { maximum: 30 }, presence: true
  has_many :user_sections, dependent: :destroy
  has_many :sections, through: :user_sections
  has_many :news
  has_many :events, dependent: :destroy
  has_many :footprints, dependent: :destroy
  has_many :visited_news, through: :footprints, source: :news

  scope :search_with_name_or_email, -> (word){
    return [] if word.blank?
    where(['name like ? or email like ?',"%#{word}%","%#{word}%"])
  }

end

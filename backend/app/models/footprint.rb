class Footprint < ApplicationRecord
  belongs_to :news
  belongs_to :user

  validates :news_id, uniqueness: { scope: :user_id }
end

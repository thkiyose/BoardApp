class Footprint < ApplicationRecord
  belongs_to :news
  belongs_to :user

  validates :user_id, uniqueness: { scope: :news_id }
end

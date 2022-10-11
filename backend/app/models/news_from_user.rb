class NewsFromUser < ApplicationRecord
  belongs_to :news
  belongs_to :user
end

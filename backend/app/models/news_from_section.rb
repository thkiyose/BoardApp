class NewsFromSection < ApplicationRecord
  belongs_to :news
  belongs_to :section
end

class Event < ApplicationRecord
    validates :title, presence: true, length: { maximum: 30}
    validates :start, presence: true
    validates :end, presence: true
end

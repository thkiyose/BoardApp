class News < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 30}
  validates :content, presence: true
  has_many :news_to_sections, dependent: :destroy
  has_many :news_from_sections, dependent: :destroy
  has_many :to_sections, through: :news_to_sections, source: :section
  has_many :from_sections, through: :news_from_sections, source: :section
  accepts_nested_attributes_for :news_to_sections, allow_destroy: true
  accepts_nested_attributes_for :news_from_sections, allow_destroy: true
end

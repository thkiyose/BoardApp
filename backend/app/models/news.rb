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

  scope :search_to_with_section_id, -> (id){
    return if id.blank?
    joins(:to_sections).where(sections:{id: id})
  }

  scope :search_from_with_section_id, -> (id){
    return if id.blank?
    joins(:from_sections).where(sections:{id: id})
  }

  scope :search_with_section_only, -> (section,type){
    return if section.blank? || type.blank?
    if type === "to"
      joins(:to_sections).where(sections:{sections: section})
    elsif type === "from"
      joins(:from_sections).where(sections:{sections: section})
    end
  }


  scope :search_with_area_only, -> (section,type){
    return if section.blank? || type.blank?
    if type === "to"
      joins(:to_sections).where(sections:{areas: area})
    elsif type === "from"
      joins(:from_sections).where(sections:{areas: area})
    end
  }
end

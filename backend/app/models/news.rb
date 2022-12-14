class News < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 30}
  validates :content, presence: true
  has_many :news_to_sections, dependent: :destroy
  has_many :news_from_sections, dependent: :destroy
  has_many :to_sections, through: :news_to_sections, source: :section
  has_many :from_sections, through: :news_from_sections, source: :section
  has_many :news_to_users, dependent: :destroy
  has_many :to_users, through: :news_to_users, source: :user
  has_many :news_from_users, dependent: :destroy
  has_many :from_users, through: :news_from_users, source: :user
  has_many :footprints, dependent: :destroy
  has_many :visitors, through: :footprints, source: :user
  has_many :notifications, dependent: :destroy
  accepts_nested_attributes_for :news_to_sections, allow_destroy: true
  accepts_nested_attributes_for :news_from_sections, allow_destroy: true

  scope :search_to_with_affiliation, -> (secIds, userId){
    return if secIds.blank? && userId.blank?
    if secIds && userId.blank?
     joins(:to_sections).where(sections:{id: secIds})
    elsif secIds.blank? && userId
      joins(:to_users).where(users: { id: userId })
    elsif secIds && userId
      left_joins(:to_sections).left_joins(:to_users).where(sections:{id: secIds}).or(News.where(users: { id: userId }))
    end
      
  }

  scope :search_from_with_affiliation, -> (secIds, userId){
    return if secIds.blank? && userId.blank?
    if secIds && userId.blank?
     joins(:from_sections).where(sections:{id: secIds})
    elsif secIds.blank? && userId
      joins(:from_users).where(users: { id: userId })
    elsif secIds && userId
      left_joins(:from_sections).left_joins(:from_users).where(sections:{id: secIds}).or(News.where(users: { id: userId }))
    end
  }

  scope :search_with_title, -> (title){
    return if title.blank?
    where(['title like ?',"%#{title}%"])
  }

  scope :search_with_content, -> (content){
    return if content.blank?
    where(['content like ?',"%#{content}%"])
  }

  scope :search_with_date, -> (date_array){
    return if date_array.nil? || ( date_array[0].blank? && date_array[1].blank? )
    if date_array[0] && date_array[1].blank?
      where('created_at >= ?', date_array[0])
    elsif date_array[0].blank? && date_array[1]
      where('created_at <= ?', date_array[1].to_date + 1)
    else
      where(created_at: date_array[0].to_date..(date_array[1].to_date + 1))
    end
  }

  scope :search_with_section_only, -> (section,type){
    return if section.blank? || type.blank?
    if type === "to"
      joins(:to_sections).where(sections:{sections: section.capitalize } )
    elsif type === "from"
      joins(:from_sections).where(sections:{sections: section.capitalize})
    end
  }


  scope :search_with_area_only, -> (area,type){
    return if area.blank? || type.blank?
    if type === "to"
      joins(:to_sections).where(sections:{areas: area.capitalize })
    elsif type === "from"
      joins(:from_sections).where(sections:{areas: area.capitalize})
    end
  }

  scope :search_with_to_users, -> ( to_id ){
    return if to_id.blank?
    joins(:to_users).where(users: {id: to_id})
  }

  scope :search_with_from_users, -> ( from_id ){
    return if from_id.blank?
    joins(:from_users).where(users: {id: from_id })
  }
end

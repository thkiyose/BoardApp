class Api::V1::NewsController < ApplicationController
  def index
    news = News.all.order(created_at: :desc)
    render json: { news: news }
  end

  def show
    news = News.find_by(id: params[:id]);
    puts params
    to = news.to_sections.group_by{ |s| s.sections }
    from = news.from_sections.group_by{ |s| s.sections }
    render json: { news: news, to: to.values, from: from.values}
  end

  def create
    news = News.new(news_params)
    selected_from = params[:selected_area_from]
    selected_to = params[:selected_area_to]
    selected_from.each do |x|
        split = x.split(",")
        section = Section.find_by(sections: Section.sections[split[0].capitalize], areas: Section.areas[split[1]])
        if section
          news.news_from_sections.build(section_id: section.id)
        end
    end
    selected_to.each do |x|
      split = x.split(",")
      section = Section.find_by(sections: Section.sections[split[0].capitalize], areas: Section.areas[split[1]])
      if section
        news.news_to_sections.build(section_id: section.id)
      end
  end
    if news.save
      render json: { status:"success" }
    else
      render json: { errors: news.errors}
    end
  end

  def edit
    news = news.find_by_id(params[:id])
    to = news.to_sections.group_by{ |s| s.sections }
    from = news.from_sections.group_by{ |s| s.sections }
    render json: { news: news, to: to, from: from}}
  end

  def update
    news = News.find_by_id(params[:id])
    selected_from = params[:selected_area_from]
    selected_to = params[:selected_area_to]
    to = news.news_to_sections
    from = news.news_from_sections
    to.destroy_all
    from.detryoy_all

    selected_from.each do |x|
      split = x.split(",")
      section = Section.find_by(sections: Section.sections[split[0].capitalize], areas: Section.areas[split[1]])
      if section
        news.news_from_sections.create!(section_id: section.id)
      end
    end
    selected_to.each do |x|
      split = x.split(",")
      section = Section.find_by(sections: Section.sections[split[0].capitalize], areas: Section.areas[split[1]])
      if section
        news.news_to_sections.create!(section_id: section.id)
      end
    if news.update(news_params)
      render json: { status: "SUCCESS"}
    else
      render json:  review.errors, status: 422
    end
  end

  private

  def news_params
    params.require(:news).permit(:title,:content,:user_id,:selected_area_from,:selected_area_to)
  end
end

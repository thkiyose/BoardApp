class Api::V1::NewsController < ApplicationController
  def index
    news = News.where(is_archived: false).order(created_at: :desc)
    render json: { news: news }
  end

  def show
    news = News.find_by(id: params[:id]);
    create_footprint(params[:user_id], params[:id])
    to_sec = news.to_sections.group_by{ |s| s.sections }
    from_sec = news.from_sections.group_by{ |s| s.sections }
    to_users = news.to_users
    from_users = news.from_users
    visitors = ( params[:admin] === "true" ? news.visitors.select(:name, :email) : nil)
    count = news.visitors.count
    render json: { news: news, to_sec: to_sec.values, from_sec: from_sec.values, to_users: to_users, from_users: from_users, visitors: visitors, count: count }
  end

  def create
    news = News.new(news_params)
    selected_from = params[:selected_area_from]
    selected_to = params[:selected_area_to]
    user_from = params[:selected_user_from]
    user_to = params[:selected_user_to]

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

    user_from&.each do |x|
        news.news_from_users.build(user_id: x[:id])
    end

    user_to&.each do |x|
      news.news_to_users.build(user_id: x[:id])
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
    render json: { news: news, to: to, from: from}
  end

  def update
    news = News.find_by_id(params[:id])
    selected_from = params[:selected_area_from]
    selected_to = params[:selected_area_to]
    user_from = params[:selected_user_from]
    user_to = params[:selected_user_to]
    news.news_to_sections.destroy_all
    news.news_from_sections.destroy_all
    news.news_to_users.destroy_all
    news.news_from_users.destroy_all

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
    end

    user_from.each do |x|
      news.news_from_users.build(user_id: x[:id])
    end

    user_to.each do |x|
      news.news_to_users.build(user_id: x[:id])
    end

    if news.update(news_params)
      render json: { status: "SUCCESS"}
    else
      render json:  news.errors, status: 422
    end
  end

  def destroy
    news = News.find_by_id(params[:id])
    if news.destroy
      render json: { status: "SUCCESS"}
    else
      render json: news.errors, status: 422
    end
  end

  def search
    news = News.search_to_with_affiliation(params[:to_ids],params[:to_users])
    .search_from_with_affiliation(params[:from_ids],params[:from_users])
    .search_with_title(params[:title]).search_with_content(params[:content])
    .search_with_date(params[:date])
    .search_with_section_only(params[:to_section],"to").search_with_area_only(params[:to_area],"to")
    .search_with_section_only(params[:from_section],"from").search_with_area_only(params[:from_area],"from")
    .search_with_to_users(params[:to_user][0]).search_with_from_users(params[:from_user][0])
    .where(is_archived: false)
    .distinct
    .order(created_at: :desc)
    render json: { news: news }
  end

  def user_news
    user = User.find_by(id: params[:id])
    news = user.news.where(is_archived: false).order(created_at: :desc)
    render json: { news: news }
  end

  def user_archive_list
    user = User.find_by(id: params[:id])
    news = user.news.where(is_archived: true).order(created_at: :desc)
    render json: { news: news }
  end

  def archive
    news = News.find_by(id: params[:id])
    if news.update(is_archived: !news.is_archived )
      render json: { status: "SUCCESS" }
    else
      render json:  news.errors, status: 422
    end
  end


  private

  def news_params
    params.require(:news).permit(:title,:content,:user_id,:selected_area_from,:selected_area_to)
  end

  def create_footprint(user_id, news_id)
    Footprint.create(user_id: user_id, news_id: news_id )
  end
end

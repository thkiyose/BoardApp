class Api::V1::NewsController < ApplicationController
  def index
  end

  def create
    news = News.new(news_params)
    if news.save
      render json: { status:"success" }
    else
      render json { errors: news.errors}
    end
    
  end

  private

  def news_params
    params.require(:news).permit(:title,:content,:user_id)
  end
end

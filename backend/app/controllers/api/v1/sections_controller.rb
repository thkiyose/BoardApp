class Api::V1::SectionsController < ApplicationController
    def index
        render json: { sections: Section.all.group_by { |s| s.sections }} 
    end

    def create
        user = User.find_by(id: params[:id])
        selected = params[:selected]
        selected.each do |x|
         put x
        end
    end
end

class Api::V1::SectionsController < ApplicationController
    def index
        render json: { sections: Section.all.group_by { |s| s.sections }} 
    end
end

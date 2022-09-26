class Api::V1::SectionsController < ApplicationController
    def index
        render json: { sections: Sections.all.group_by { |s| s.sections }} 
    end
end

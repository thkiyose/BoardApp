class Api::V1::SectionsController < ApplicationController
    def index
        render json: { sections: Section.all.group_by { |s| s.sections }} 
    end

    def raw_sections
        render json: { sections: Section.sections, areas: Section.areas }
    end

    def create
        user = User.find_by(id: params[:id])
        selected = params[:selected]
        selected.each do |x|
            split = x.split(",")
            section = Section.find_by(sections: Section.sections[split[0].capitalize], areas: Section.areas[split[1]])
            if section
              user.user_sections.create!(section_id: section.id )
            end
        end
        render json: {status: "success", sections: user.sections.group_by { |s| s.sections }}
    end

    def show
        user = User.find_by(id: params[:id])
        render json: {sections: user.sections.group_by { |s| s.sections }}
    end
end

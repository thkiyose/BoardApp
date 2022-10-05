class Api::V1::EventsController < ApplicationController
    def index
        events = Event.all
        render json: { events: events }
    end

    def create
        user= User.find_by(id: params[:id])
        if user.admin === true
            event = user.events.build
            event.title = params[:event][:title]
            event.start = ActiveSupport::TimeZone[Time.zone].parse(params[:event][:start_date] + " " + params[:event][:start_time])
            event.end = ActiveSupport::TimeZone[Time.zone].parse(params[:event][:end_date] + " " + params[:event][:end_time])
            event.all_day = params[:event][:all_day]
            event.description = params[:event][:description]

            selected = params[:sections]
            selected.each do |x|
                split = x.split(",")
                section = Section.find_by(sections: Section.sections[split[0].capitalize], areas: Section.areas[split[1]])
                if section
                  event.event_sections.build(section_id: section.id)
                end
            end
            if event.save
                render json: { status: "success" }
            else
                render json: { errors: event.errors.full_messages }
            end
        end
    end

    def show
        event = Event.find_by(id: params[:id])
        sections = (event ? event.sections.group_by{ |s| s.sections } : nil)
        render json: { event: { event: event, user: event&.user, sections: sections&.values } }
    end

    def destroy
        event = Event.find_by(id: params[:id])
        if event.destroy
            render json: { status: "success" }
        else
            render json: { errors: event.errors.full_messages }
        end
    end

    def search
        events = Event.search_with_title(params[:title])
        .search_with_section_only(params[:section]).search_with_area_only(params[:area])
        render json: { events: events }
    end
end

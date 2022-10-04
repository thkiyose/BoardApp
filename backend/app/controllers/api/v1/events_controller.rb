class Api::V1::EventsController < ApplicationController
    def index
        events = Event.all
        render json: { events: events }
    end

    def create
        user= User.find_by(id: params[:user_id])
        if user.admin === true
            event = user.events.build
            event.title = params[:title]
            event.start = ActiveSupport::TimeZone[Time.zone].parse(params[:start_date] + " " + params[:start_time])
            event.end = ActiveSupport::TimeZone[Time.zone].parse(params[:end_date] + " " + params[:end_time])
            event.all_day = params[:all_day]
            event.description = params[:description]
            if event.save
                render json: { status: "success" }
            else
                render json: { errors: event.errors.full_messages }
            end
        end
    end

    def show
        event = Event.find_by(id: params[:id])
        render json: { event: { event: event, user: event&.user } }
    end
end

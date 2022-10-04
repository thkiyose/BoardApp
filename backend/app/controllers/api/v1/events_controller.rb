class Api::V1::EventsController < ApplicationController
    def index
        render json: { events: Event.all}
    end

    def create
        event = Event.new()
        event.title = params[:title]
        event.start = DateTime.parse(params[:start_date] + " " + params[:start_time])
        event.end = DateTime.parse(params[:end_date] + " " + params[:end_time])
        event.all_day = params[:all_day]
        event.description = params[:description]
        if event.save
            render json: { status: "success" }
        else
            render json: { errors: event.errors.full_messages }
        end
    end
end

class Api::V1::EventsController < ApplicationController

    def create
        event = Event.new(event_params)
        if event.save
            render json: { status: "success" }
        else
            render json: { error: event.error }
        end
    end

    private

    def event_params
        params.require(:events).permit(:title,:start,:end,:description,:all_day)
    end
end

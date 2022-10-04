class Api::V1::EventsController < ApplicationController
    def index
        render json: { events: Event.all}
    end

    def create
        event = Event.new(event_params)
        p params
        # if event.save
        #     render json: { status: "success" }
        # else
        #     render json: { error: event.error }
        # end
    end

    private

    def event_params
        params.require(:event).permit(:title,:start,:end,:description,:all_day)
    end
end

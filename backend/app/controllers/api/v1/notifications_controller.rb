class Api::V1::NotificationsController < ApplicationController
    def index
        notifications = Notification.joins(:news).where(visited_id: params[:id]).where(checked: false).select('notifications.*, news.title')
        render json: { notifications: notifications }
    end

    def check
        ids = params[:notifications]
        ids.each do |id|
          Notification.find_by(id: id).update(checked: true)
        end
        render json: { status: "success" }
    end
end

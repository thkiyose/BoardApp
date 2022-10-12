class Api::V1::NotificationsController < ApplicationController
    def index
        notifications = Notification.where(visited_id: params[:id]).where(checked: false)
        render json: { notifications: notifications }
        # notifications.each do |notification|
        #   notification.update(checked: true)
        # end
      end
end

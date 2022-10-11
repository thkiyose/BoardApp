class Api::V1::UsersController < ApplicationController
    def search
        users = User.search_with_name_or_email(params[:word])
        render json: { users: users }
    end
end

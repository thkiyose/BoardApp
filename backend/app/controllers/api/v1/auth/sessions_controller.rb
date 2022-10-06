class Api::V1::Auth::SessionsController < ApplicationController
    def index
      if current_user
        render json: { is_login: true, data: { user: current_user, sections: current_user.sections.group_by { |s| s.sections }}, raw_sections: Section.sections, raw_areas: Section.areas }
      else
        render json: { is_login: false, message: "ユーザーが存在しません" }
      end
    end
end

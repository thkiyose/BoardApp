# frozen_string_literal: true

class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable,:validatable
  include DeviseTokenAuth::Concerns::User
end

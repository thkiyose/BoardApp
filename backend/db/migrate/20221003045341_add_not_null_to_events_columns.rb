class AddNotNullToEventsColumns < ActiveRecord::Migration[7.0]
  def change
    change_column_null :events, :title, false
    change_column_null :events, :start, false
    change_column_null :events, :end, false
  end
end

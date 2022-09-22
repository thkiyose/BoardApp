class AddNotNullToSectionsColumns < ActiveRecord::Migration[7.0]
  def change
    change_column_null :sections, :sections, false
    change_column_null :sections, :areas, false
  end
end

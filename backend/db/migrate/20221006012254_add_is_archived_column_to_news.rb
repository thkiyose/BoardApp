class AddIsArchivedColumnToNews < ActiveRecord::Migration[7.0]
  def change
    add_column :news, :is_archived, :boolean, default: false, null:false
  end
end

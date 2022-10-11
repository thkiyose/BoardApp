class AddIndexToUserIdAndNewsId < ActiveRecord::Migration[7.0]
  def change
    add_index :footprints, [:user_id, :news_id], unique: true
  end
end

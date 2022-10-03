class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :title
      t.time :start
      t.time :end
      t.boolean :all_day
      t.text :description

      t.timestamps
    end
  end
end

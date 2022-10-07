class CreateFootprints < ActiveRecord::Migration[7.0]
  def change
    create_table :footprints do |t|
      t.references :news, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

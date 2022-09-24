class CreateUserSections < ActiveRecord::Migration[7.0]
  def change
    create_table :users_sections do |t|
      t.references :user, null: false, foreign_key: true
      t.references :section, null: false, foreign_key: true

      t.timestamps
    end
  end
end

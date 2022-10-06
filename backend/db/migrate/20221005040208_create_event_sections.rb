class CreateEventSections < ActiveRecord::Migration[7.0]
  def change
    create_table :event_sections do |t|
      t.references :event, null: false, foreign_key: true
      t.references :section, null: false, foreign_key: true

      t.timestamps
    end
  end
end

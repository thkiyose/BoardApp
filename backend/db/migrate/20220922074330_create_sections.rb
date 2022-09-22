class CreateSections < ActiveRecord::Migration[7.0]
  def change
    create_table :sections do |t|
      t.integer :sections
      t.integer :areas

      t.timestamps
    end
  end
end

class CreateSections < ActiveRecord::Migration[7.0]
  def change
    create_table :sections do |t|
      t.integer :section
      t.integer :area

      t.timestamps
    end
  end
end

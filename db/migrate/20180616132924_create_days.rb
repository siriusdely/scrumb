class CreateDays < ActiveRecord::Migration[5.1]
  def change
    create_table :days do |t|
      t.references :scrum, foreign_key: true, null: false

      t.timestamps
    end
  end
end

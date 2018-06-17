class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.references :scrum, foreign_key: true, null: false
      t.string :description

      t.timestamps
    end
  end
end

class CreateRotations < ActiveRecord::Migration[5.1]
  def change
    create_table :rotations do |t|
      t.references :day, foreign_key: true, null: false
      t.references :task, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end

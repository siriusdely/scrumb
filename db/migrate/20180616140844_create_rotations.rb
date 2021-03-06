# frozen_string_literal: true

class CreateRotations < ActiveRecord::Migration[5.1]
  def change
    create_table :rotations do |t|
      t.references :day, foreign_key: true, null: false
      t.references :task, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: false
      t.integer :types_mask, null: false
      t.integer :order, null: false

      t.timestamps
    end
    add_index :rotations, :types_mask
    add_index :rotations, %i[order day_id user_id types_mask], unique: true
  end
end

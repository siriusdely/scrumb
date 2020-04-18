# frozen_string_literal: true

class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.references :scrum, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: true
      t.string :title, null: false
      t.string :description
      t.integer :states_mask, null: false, default: 1

      t.timestamps
    end
  end
end

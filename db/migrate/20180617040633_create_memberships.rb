# frozen_string_literal: true

class CreateMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :memberships do |t|
      t.references :scrum, foreign_key: true
      t.references :user, foreign_key: true
      t.integer :roles_mask, null: false
      t.integer :status_mask, null: false
      t.integer :order, null: true, default: 0
      t.string :initials, null: false, limit: 3

      t.timestamps
    end

    add_index :memberships, :roles_mask
    add_index :memberships, :status_mask
    add_index :memberships, :order
    add_index :memberships, :initials
    add_index :memberships, %i[scrum_id user_id initials], unique: true
  end
end

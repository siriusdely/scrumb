class CreateMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :memberships do |t|
      t.references :scrum, foreign_key: true
      t.references :user, foreign_key: true
      t.integer :roles_mask

      t.timestamps
    end
    add_index :memberships, :roles_mask
  end
end

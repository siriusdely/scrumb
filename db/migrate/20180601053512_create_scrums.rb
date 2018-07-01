class CreateScrums < ActiveRecord::Migration[5.1]
  def change
    create_table :scrums do |t|
      t.string :title, null: true
      t.string :description, default: '', null: false
      t.string :items
      t.string :link

      t.timestamps
    end

    add_index :scrums, :title
  end
end

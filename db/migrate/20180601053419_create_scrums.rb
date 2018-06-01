class CreateScrums < ActiveRecord::Migration[5.1]
  def change
    create_table :scrums do |t|
      t.string :title
      t.string :description
      t.string :tasks
      t.string :link

      t.timestamps
    end
  end
end

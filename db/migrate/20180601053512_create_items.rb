class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.references :scrum, foreign_key: true
      t.string :description

      t.timestamps
    end
  end
end

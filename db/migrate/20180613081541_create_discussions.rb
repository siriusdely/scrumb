class CreateDiscussions < ActiveRecord::Migration[5.1]
  def change
    create_table :discussions do |t|
      t.references :topicable, polymorphic: true, index: { :unique => true }

      t.string :topic, default: '', null: false

      t.timestamps
    end
  end
end

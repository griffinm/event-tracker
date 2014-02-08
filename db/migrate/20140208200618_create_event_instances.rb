class CreateEventInstances < ActiveRecord::Migration
  def change
    create_table :event_instances do |t|
      t.integer :event_id

      t.timestamps
    end
  end
end

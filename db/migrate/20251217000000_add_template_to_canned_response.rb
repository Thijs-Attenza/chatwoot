class AddTemplateToCannedResponse < ActiveRecord::Migration[7.1]
  def change
    add_column :canned_responses, :is_template, :boolean, default: false
  end
end

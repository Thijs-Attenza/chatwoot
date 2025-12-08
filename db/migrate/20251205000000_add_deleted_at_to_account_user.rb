class AddDeletedAtToAccountUser < ActiveRecord::Migration[7.1]
  def change
    add_column :account_users, :deleted_at, :datetime,  null: true
  end
end

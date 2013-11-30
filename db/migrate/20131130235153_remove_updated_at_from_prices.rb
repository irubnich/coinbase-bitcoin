class RemoveUpdatedAtFromPrices < ActiveRecord::Migration
  def change
  	remove_column :prices, :updated_at
  end
end

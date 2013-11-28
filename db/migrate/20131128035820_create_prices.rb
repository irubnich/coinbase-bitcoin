class CreatePrices < ActiveRecord::Migration
  def change
    create_table :prices do |t|
      t.string :currency
      t.float :value

      t.timestamps
    end
  end
end

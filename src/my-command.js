const sketch = require('sketch')
const { DataSupplier } = sketch
const util = require('util')

const addressData = require("./address.json");

export function onStartup () {
  // To register the plugin, uncomment the relevant type:
  DataSupplier.registerDataSupplier('public.text', 'Address', 'SupplyAddress')
  // DataSupplier.registerDataSupplier('public.image', 'hello-data', 'SupplyData')
}

export function onShutdown () {
  DataSupplier.deregisterDataSuppliers()
}

export function onSupplyAddress (context) {
  let dataKey = context.data.key
  var dataCount = context.data.requestedCount;
  const items = util.toArray(context.data.items).map(sketch.fromNative)

  items.forEach((_, index) => {
    const address = addressData.address;
    const addressIndex = Math.floor(Math.random() * address.length);
    let data = address[addressIndex];

    DataSupplier.supplyDataAtIndex(dataKey, data, index)
  })
}

import { useEffect, useState } from 'react';

const data = require('./data.json')

function App() {
  const [ parseData, setParseData ] = useState(null)

  useEffect(() => {
    const items = [];
    data.proformaItem.map(profomaitem => {
      var item = {
        id: profomaitem.product_id,
        category: profomaitem.categoryDescription,
        product: profomaitem.productDescription,
        totalStock: 0,
        totalOrder: profomaitem.items.map(order => order.qty).reduce((prev, cur) => prev + cur),
      }
      
      const location = {}
      for (let x = 0; x < data.location.length; x++) {
        const element = data.location[x];
        location[element.id] = null;
      }
      for (let index = 0; index < profomaitem.product_stock.length; index++) {
        const key = data.location.filter(loc => loc.id === parseInt(Object.keys(profomaitem.product_stock[index]).join('')));
        location[key[0].id] = profomaitem.product_stock[index][Object.keys(profomaitem.product_stock[index]).join('')] ?? 0;
        item.totalStock += profomaitem.product_stock[index][key[0].id]
      }
      const percentage = (item.totalOrder / item.totalStock) * 100
      const percent = {
        percent: percentage.toFixed(2)
      }
      Object.assign(location, item, percent)
      items.push(location)
      return true;
    })
    setParseData(items)
  }, [setParseData])
  return (
    <div className="App">
      <h1 style={{textAlign: 'center'}}>Soal Test PT Global Prima Textilindo</h1>
      <table border="1" width="100%">
        <thead>
          <tr>
            {data.location.map((location, key) => {
              return <th key={key}>{location.name}</th>
            })}
            <th>Category</th>
            <th>Product</th>
            <th>Total Stock</th>
            <th>Percent</th>
            <th>Total Order</th>
          </tr>
        </thead>
        <tbody>
            {parseData != null ? parseData.map((item, key) => (
              <tr key={key}>
                {data.location.map((location, key) => {
                  return <td align='center' key={key}>{item[location.id] ?? '-'}</td>
                })}
                <td align='center'>{item.category}</td>
                <td align='center'>{item.product}</td>
                <td align='center'>{item.totalStock}</td>
                <td align='center'>{item.percent}%</td>
                <td align='center'>{item.totalOrder}</td>
              </tr>
            )) : ( <tr><td>Kosong</td></tr> )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

function createData(token, price, volume,twentyFourh,graph) {
  return { token, price,volume, twentyFourh,graph };
}
const MarketData={
  columns:[
    { id: 'token', label: 'Token',  disablePadding: true, },
    { id: 'price', label: 'Price',  disablePadding: true,},
    {
      id: 'volume',
      label: 'Volume',
      disablePadding: true,
    },
    {
      id: 'twentyFourh',
      label: '24h',
      disablePadding: true,
    },
    {
      id: 'graph',
      label: 'Graph',
      disablePadding: true,        
     
    }, 
  ],


  rows:[
    createData('BTC', '$475.22M','$779.58M', '+5.3', 'image'),
    createData('BTC', '$475.22M', '$779.58M', '+5.3','image'),
    createData('BTC', '$475.22M', '$779.58M', '+5.3','image'),
    createData('BTC ', '$475.22M', '$779.58M', '+5.3','image'),
   
   
  ]

}   

export default MarketData


    


 
  


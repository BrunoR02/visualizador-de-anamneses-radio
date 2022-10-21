export default function convertDataForGraph(data,year){
  const convertedData = data.map(item=>{
    const convertedDate = new Date(+item.data * 1000).toLocaleDateString()
    return {...item, data:convertedDate}
  }).filter(item=>item.data.includes(year))

  const dataList = []

  for(let i=1;i<=12;i++){
    const numberAnamneses = convertedData.filter(item=>item.data.slice(3,5)===(i < 10 ? "0" + i : ""+ i)).length
    dataList.push(numberAnamneses)
  }

  return dataList
}
export default function getYearsFromData(data){
  const years = []
  
  data.forEach(item=>{
    const year = new Date(+item.data * 1000).toLocaleDateString().slice(6,10)
    if(years.length===0){
      years.push(year)
    } else if(!years.some(y=>y===year)){
      years.push(year)
    }
  })
  
  return years
}
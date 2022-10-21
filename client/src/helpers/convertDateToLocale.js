export default function convertDateToLocale(date){
  const [year,month,day] = date.split("-")
  const convertedDate = day + "/" + month + "/" + year

  return convertedDate
}
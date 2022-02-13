// const formatUnixTimeStamp = (timestamp) => {
//   const dateString = new Date(timestamp).toDateString()
//   const day = dateString.split(" ").at(0)
//   const dateStringWithoutDay = dateString.split(" ").slice(1).join(" ")
//   const timeString = new Date(timestamp).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })

//   return day + ", " + dateStringWithoutDay + ", " + timeString
// }

//expects unix timestamps
const isWithinRange = (start, end, rightNow) => {

  return (start < rightNow) && (rightNow < end)

}

export default { isWithinRange }
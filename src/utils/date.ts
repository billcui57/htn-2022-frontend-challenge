const formatUnixTimeStamp = (timestamp) => {
  const dateString = new Date(timestamp).toDateString()
  const timeString = new Date(timestamp).toLocaleTimeString('en')

  return dateString + " " + timeString
}

//expects unix timestamps
const isWithinRange = (start, end, rightNow) => {

  return (start < rightNow) && (rightNow < end)

}

export default { formatUnixTimeStamp, isWithinRange }
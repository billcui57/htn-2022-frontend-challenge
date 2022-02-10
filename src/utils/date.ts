const formatUnixTimeStamp = (timestamp) => {
  const dateString = new Date(timestamp).toLocaleDateString('en')
  const timeString = new Date(timestamp).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })

  return dateString + " " + timeString
}

//expects unix timestamps
const isWithinRange = (start, end, rightNow) => {

  return (start < rightNow) && (rightNow < end)

}

export default { formatUnixTimeStamp, isWithinRange }
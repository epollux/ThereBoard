# ThereBoard

## Design notes

Local device makes API call to ThereBoard front API to get a full data update. 
updateBoard(boardID, key?)

API front service receive call, then:
* Check board validaty
* Get services list configured for the board and others (location, ...)
* Call services to get data update (via internal API)
* Prepare consolidated data
* Return data to local device

Internal service API: overall it contains the logic to get remote data and transform the data as needed
* Make external call to public APIs
* Transform data (data transformation logic in same service call
* Return data


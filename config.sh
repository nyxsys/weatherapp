echo "Adding api keys to enviroment"


export WUNDERGROUND_KEY="bb28cd8c0dd113e3"

export FORECASTIO_KEY="f398cbf1feb55046b133a880b855aa52"

export PORT="8080"
export IP="0.0.0.0"

node ./app/server.js

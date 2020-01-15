const axios = require('axios');

var CommandsFactory = require('hystrixjs').commandFactory;

module.exports = (baseURL, destinationName) => {
  requestFactory =  axios.create({
    baseURL: baseURL,
  });
  var serviceCommand = CommandsFactory.getOrCreate(destinationName).run(requestFactory).build();
  return (url, options= {}) => {
    var promise = serviceCommand.execute(url, options);
    return promise;
  }
}
//check the API method
export const checkApiMethod = ({ method }, string) => method === string;

//send back a not round
export const notFound404 = (res) =>
  res.status(404).setHeader("Content-type", "text/plain").send("404 Not Found");

//handle some errors
export const handleErrors = (res) =>
  res
    .status(500)
    .setHeader("Content-type", "text/plain")
    .send("Internal Server Error");

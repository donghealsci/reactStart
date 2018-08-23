/*
* mandatory is use to check mandatory param, if missing an Error will be thrown
*/
export const mandatory = () => {
  throw new Error('Missing parameter!') 
}
Function.prototype.bind = Function.prototype.bind || function(context){
  var _this = this;
  const arg = Array.prototype.slice.call(argumnets,1)
  return function bound(){
    var innerArg = Array.prototype.slice.call(arguments)
    var finalArgs = arg.concat(innerArg)
    return _this.apply(context,finalArgs)
  }
}

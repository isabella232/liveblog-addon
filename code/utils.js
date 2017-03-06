// via: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
function CustomError(message, fileName, lineNumber) {
     this.message = message;
     this.fileName = fileName;
     this.lineNumber = lineNumber;
 }
 CustomError.prototype = new Error();
 CustomError.prototype.name = "Error";
 CustomError.prototype.fileName = "";
 CustomError.prototype.lineNumber = "";
 CustomError.prototype.message = "";
 CustomError.prototype.constructor = CustomError;

 /**
* Google app script properties are stored as strings
* via: https://developers.google.com/apps-script/guides/properties#data_format
* This function returns a numeric version of the property stored
*
* @private
* @param {String} key property key to retrieve
*/
function _getNumProperty(props, key) {
  var p = props.getProperty(key);
  if (p !== null) {
    try {
        p = +p;
    } catch(e) {
        var msg =  Utilities.formatString('Property %s is not numeric', key);
        throw new CustomError(msg, 'utils.js', '26');
    }
  }
  return p;
}

/**
 * Retrieves the Logo src url
 * added to the Documents properties by setLogo_() in config
 */
function getLogo_() {
    var props = PropertiesService.getDocumentProperties();
    var logo_url = props.getProperty('sidebar_logo');
    if (logo_url) {
        return logo_url;
    }
    return null;
}

function resetDocProperties_() {
  var props = PropertiesService.getDocumentProperties();
  var data = props.getProperties();
  for (var key in data) {
    props.deleteProperty(key);
  }
}

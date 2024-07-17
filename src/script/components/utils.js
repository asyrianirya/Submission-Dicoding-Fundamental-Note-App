class Utils {
  static emptyElement(element) {
    element.innerHTML = "";
  }

  static getElementAttribute = (element, attribute)=> {return element.getAttribute(attribute)};

  static showElement(element) {
    element.style.display = "block";
    element.hidden = false;
    element.visibility = 'show';
  }

  static hideElement(element) {
    element.style.display = "none";
    element.hidden = true;
    element.visibility = 'hidden';
  }

  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }
  static toggleHideElement(element) {
    if (element.style.display == "none" && element.hidden) {
      element.style.display = "block";
      element.hidden = false;
      element.visibility = 'show';
    } else if (element.style.display == "block" && !element.hidden) {
      element.style.display = "none";
      element.hidden = true;
      element.visibility = 'hidden';
    } else {
      element.style.display = "none";
      element.hidden = true;
      element.visibility = 'hidden';
    }
  }
  
}

export default Utils;

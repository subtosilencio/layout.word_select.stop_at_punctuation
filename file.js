function getSelectionRange() {
  var sel;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  } else if (document.selection) {
    return document.selection.createRange();
  }
  return null;
}

function blankSpace() {
  var mRange = getSelectionRange();
  var selection = window.getSelection();
  mRange.setStart(selection.anchorNode, selection.anchorOffset);
  mRange.setEnd(selection.focusNode, selection.focusOffset);
  selection.removeAllRanges();
  selection.addRange(mRange);
  selection.modify("move","forward","character");
  selection.modify("extend","forward","character");
  if (selection==' '||selection=='&nbsp;'||selection=='\n'||selection=='\r'||selection==''){
    selection.removeAllRanges();
    selection.addRange(mRange);
    return true;
	}else{
		mRange.setEnd(selection.focusNode, selection.focusOffset-1);
		selection.removeAllRanges();
		selection.addRange(mRange);
		return false;
		}
}

var listener = function(evt) {
  try {
    var mRange2 = getSelectionRange();
    var selection2 = window.getSelection();
	if (!selection2.isCollapsed){
		while(!blankSpace()){
			selection2.modify("extend","forward","character");
		}
	}	
}catch (err) {
	return null;
	}
};
document.addEventListener('dblclick', listener);


// function parseJSON(str) {
//   if (info = /^\[(.*)\]$/.exec(str)) { //数组 
//     let str = info[1];
//     let ptn = /,(?=(?:(?:[^\[\]]*?\[[^\]\[]*?\])*(?:[^\[\]])*)$)/;
//     let res = str.split(ptn);
//     return res.map(it => parseJSON(it));
//   } else if (info = /^(\{(.*)\})$/.exec(str)) { //对象 
//     let res = {};
//     let key = /(\w*)\:/g;
//   } else if (info = /^(\".*\"|\'.*\')$/.exec(str)) {//字符串 
//     return str.slice(1, -1);
//   } else {
//     if (isNum(str)) {
//       return Number(str);
//     } else if (str == "true") {
//       return true;
//     } else if (str == "false") {
//       return false;
//     } else if (str == "null") {
//       return null;
//     }
//     throw new SyntaxError("invalid JSON string!");
//   }
//   function isNum(str) {
//     return /^(-)?(0|([1-9]\d*))(\.\d*)?([Ee][-+]?\d*)?$/.test(str);
//   }
// }

function parseJSON(str) {
  function findIdx(str, start, target) {
    let count = 0;
    for (let i = start; i < str.length; i++) {
      if (str[i] == "{" | str[i] == "[") count++;
      if (str[i] == "}" | str[i] ==  "]") count--;
      if (count == 0 && str[i] == target) {
        return i;
      }
    }
    return -1;
  }
  if (str[0] == "{") {
    let res = {};
    let keyIdx = 0;
    let valIdx, val, key;
    while (keyIdx != -1) {
      valIdx = findIdx(str, keyIdx + 1, ":");
      key = parseJSON(str.slice(keyIdx + 1, valIdx));
      keyIdx = findIdx(str, valIdx + 1, ",");
      val = parseJSON(str.slice(valIdx + 1, keyIdx))
      res[key] = val;
    }
    return res;
  } else if (str[0] == "[") {
    let res = [];
    let keyIdx = 0;
    let nextIdx;
    while (keyIdx != -1) {
      nextIdx = findIdx(str, keyIdx + 1, ",");
      let val = parseJSON(str.slice(keyIdx + 1, nextIdx));
      keyIdx = nextIdx
      res.push(val);
    }
    return res;
  } else if (str[0] == '"') {
    return str.slice(1, -1);
  } else if (!isNaN(str) && str != "") {
    return +str;
  } else if (str == "true") {
    return true
  } else if (str == "false") {
    return false;
  } else if (str == "null") {
    return null;
  }
  throw new SyntaxError("invalid JSON");
}
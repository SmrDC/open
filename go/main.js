// © smridh.com

const glocalMap = {
  a: "https://smridh.com/a",
  "a": "https://smridh.com/a",
  amrit: "https://smridh.com/amrit",
  "amrit": "https://smridh.com/amrit",
  Amrit: "https://smridh.com/Amrit",
  "Amrit": "https://smridh.com/Amrit",
  assemble: "https://smridh.com/go/r/x4mars/assemble",
  "assemble": "https://smridh.com/go/r/x4mars/assemble",
  smridh: "https://meet.google.com/jbi-qjsd-hzi",
  "smridh:": "https://meet.google.com/jbi-qjsd-hzi",
};

getUrl = function(key) {
  return glocalMap[key];
};

function go(id, passkey) {
  const url = getUrl(id);
  return location.replace(url ? url : "https://go.smridh.com/" + id);
}

const url = new URL(location);
const urlFragment = url.hash;
const tag = urlFragment ? urlFragment.substr(1) : url.searchParams.get("tag");
if(tag)
  go(tag, url.searchParams.get("key"));

// © smridh.com

const glocalMap = {
  smridh: "https://meet.google.com/jbi-qjsd-hzi",
  "smridh:": "https://meet.google.com/jbi-qjsd-hzi",
  assemble: "https://smridh.com/r/x4mars/assemble",
  "assemble": "https://smridh.com/r/x4mars/assemble",
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

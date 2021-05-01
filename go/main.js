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
  link: "https://www.smridh.com/go/r/in/link",
  "link": "https://www.smridh.com/go/r/in/link",
  meet: "https://meet.google.com/jbi-qjsd-hzi",
  "meet": "https://meet.google.com/jbi-qjsd-hzi",
  smridh: "https://go.smridh.com",
  "smridh": "https://go.smridh.com",
  tv: "https://www.smridh.com/go/r/tv",
  "tv": "https://www.smridh.com/go/r/tv",
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

// © smridh.com

urlMap.get = function(key) {
  const urlMap = {
    smridh: "https://meet.google.com/jbi-qjsd-hzi",
    "smridh:": "https://meet.google.com/jbi-qjsd-hzi",
    lightningMcQueen: "https://youtu.be/UCoogBnurWk",
  };

  return urlMap[key];
};

function go(id, passkey) {
  const url = urlMap.get(id);
  return location.replace(url ? url : "https://go.smridh.com/" + id);
}

const urlFragment = url.hash;
const tag = urlFragment ? urlFragment.substr(1) : url.searchParams.get("tag");
if(tag)
  go(tag, url.searchParams.get("key"));

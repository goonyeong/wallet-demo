import * as deeplink from "node-deeplink";

export default deeplink({
  fallback: "https://cupsapp.com",
  android_package_name: "com.citylifeapps.cups",
  ios_store_link: "https://itunes.apple.com/us/app/cups-unlimited-coffee/id556462755?mt=8&uo=4",
});

function truncateString(str, num) {
  // Clear out that junk in your trunk
  if (num <= 3) {
    trunc = str.slice(0, num) + "...";
  } else if (str.length <= num) {
    trunc = str;
  } else {
    trunc = str.slice(0, num - 3) + "...";
  }
  return trunc;
}

var twitchers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "Esl_sc2", "brunofin"];

var nullLogo = "http://www.eastwest.org/blog/wp-content/uploads/2015/03/Silhouette-question-mark-300x300.jpeg";

for (var i = 0; i < twitchers.length; i++) {
  $.getJSON("https://api.twitch.tv/kraken/streams/" + twitchers[i] + "?callback=?", function(data) {
    if (data.hasOwnProperty("error")) {
      $(".noaccount").add("<div class='row'><div class='col-xs-2 col-sm-1'><img class='img-circle' src='"+ nullLogo + "'></div><div class='text-center col-xs-10 col-sm-4'>No Account</div><div class='text-center col-xs-10 col-sm-7'>" + data.message + "</div></div>").appendTo(".noaccount");
    } else if (data.stream !== null) {
      if (data.stream.channel.logo !== null) {
        $(".online").add("<a href='" + data.stream.channel.url + "'><div class='row'><div class='col-xs-2 col-sm-1'><img class='img-circle' src='" + data.stream.channel.logo + "'></div><div class='text-center col-xs-10 col-sm-4'>" + data.stream.channel.display_name + "</div><div class='text-center col-xs-10 col-sm-7'>" + truncateString(data.stream.channel.game + ": " + data.stream.channel.status, 45) + "</div></a>").appendTo(".online");
      } else {
        $(".online").add("<a href='" + data.stream.channel.url + "'><div class='row'><div class='col-xs-2 col-sm-1'><img class='img-circle' src='" + nullLogo + "'></div><div class='text-center col-xs-10 col-sm-4'>" + data.stream.channel.display_name + "</div><div class='text-center col-xs-10 col-sm-7'>" + data.stream.channel.status + "</div></a>").appendTo(".online");
      }
    } else {
      $.getJSON(data._links.channel + "?callback=?", function(json) {
        if (json.logo !== null) {
          $(".offline").add("<a href='" + json.url + "'><div class='row'><div class='col-xs-2 col-sm-1'><img class='img-circle' src='" + json.logo + "'></div><div class='text-center col-xs-10 col-sm-4'>" + json.display_name + "</div><div class='text-center col-xs-10 col-sm-7'>Offline</div></a>").appendTo(".offline");
        } else {
          $(".offline").add("<a href='" + json.url + "'><div class='row'><div class='col-xs-2 col-sm-1'><img class='img-circle' src='" + nullLogo + "'></div><div class='text-center col-xs-10 col-sm-4'>" + json.display_name + "</div><div class='text-center col-xs-10 col-sm-7'>Offline</div></a>").appendTo(".offline");
        }
      })
    };
  })

}
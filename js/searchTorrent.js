var url, limit, page, quality, minimum_rating, query_term, genre, sort_by, order_by, with_rt_ratings;
limit = 20; //Integer between 1 - 50 (inclusive) The limit of results per page that has been set
page = 1; //Integer (Unsigned)	Used to see the next page of movies, eg limit=15 and page=2 will show you movies 15-30
quality = "All"; //String (720p, 1080p, 3D)	Used to filter by a given quality
minimum_rating = 0; //Integer between 0 - 9 (inclusive)	Used to filter movie by a given minimum IMDb rating
query_term = "0"; //String	Used for movie search, matching on: Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code
genre = ""; //Action	Adventure	Animation	Biography Comedy	Crime	Documentary	Drama Family	Fantasy	Film-Noir	Game-Show History	Horror	Music	Musical Mystery	News	Reality-TV	Romance Sci-Fi	Sport	Talk-Show	Thriller War	Western
sort_by = "seeds"; //String (title, year, rating, peers, seeds, download_count, like_count, date_added)	Sorts the results by choosen value
order_by = "desc"; //String (desc, asc)	Orders the results by either Ascending or Descending order
$('input').on('keyup', function() {
     if (this.value.length > 1) {
          // do search for this.value here
          query_term=$("#search_key").val();
          genre="";
          ajax_get_json(getQueryVariable("id"));
     }
});

  $("#Action").click(function(){genre="Action";ajax_get_json(getQueryVariable("id"));})
  $("#Adventure").click(function(){genre="Adventure";ajax_get_json(getQueryVariable("id"));})
  $("#Animation").click(function(){genre="Animation";ajax_get_json(getQueryVariable("id"));})
  $("#Biography").click(function(){genre="Biography";ajax_get_json(getQueryVariable("id"));})
  $("#Comedy").click(function(){genre="Comedy";ajax_get_json(getQueryVariable("id"));})
  $("#Crime").click(function(){genre="Crime";ajax_get_json(getQueryVariable("id"));})
  $("#Documentary").click(function(){genre="Documentary";ajax_get_json(getQueryVariable("id"));})
  $("#Drama").click(function(){genre="Drama";ajax_get_json(getQueryVariable("id"));})
  $("#Family").click(function(){genre="Family";ajax_get_json(getQueryVariable("id"));})
  $("#Fantasy").click(function(){genre="Fantasy";ajax_get_json(getQueryVariable("id"));})
  $("#Film-Noir").click(function(){genre="Film-Noir";ajax_get_json(getQueryVariable("id"));})
  $("#Game-Show").click(function(){genre="Game-Show";ajax_get_json(getQueryVariable("id"));})
  $("#History").click(function(){genre="History";ajax_get_json(getQueryVariable("id"));})
  $("#Horror").click(function(){genre="Horror";ajax_get_json(getQueryVariable("id"));})
  $("#Music").click(function(){genre="Music";ajax_get_json(getQueryVariable("id"));})
  $("#Musical").click(function(){genre="Musical";ajax_get_json(getQueryVariable("id"));})
  $("#Mystery").click(function(){genre="Mystery";ajax_get_json(getQueryVariable("id"));})
  $("#News").click(function(){genre="News";ajax_get_json(getQueryVariable("id"));})
  $("#Reality-TV").click(function(){genre="Reality-TV";ajax_get_json(getQueryVariable("id"));})
  $("#Romance").click(function(){genre="Romance";ajax_get_json(getQueryVariable("id"));})
  $("#Sci-Fi").click(function(){genre="Sci-Fi";ajax_get_json(getQueryVariable("id"));})
  $("#Sport").click(function(){genre="Sport";ajax_get_json(getQueryVariable("id"));})
  $("#Talk-Show").click(function(){genre="Talk-Show";ajax_get_json(getQueryVariable("id"));})
  $("#Thriller").click(function(){genre="Thriller";ajax_get_json(getQueryVariable("id"));})
  $("#War").click(function(){genre="War";ajax_get_json(getQueryVariable("id"));})
  $("#Western").click(function(){genre="Western";ajax_get_json(getQueryVariable("id"));})








function ajax_get_json(id) {

  url="https://yts.ag/api/v2/list_movies.json?limit="+limit+"&page="+page+"&quality="+quality+"&minimum_rating="+minimum_rating+"&query_term="+query_term+"&genre="+genre+"&sort_by="+sort_by+"&order_by="+order_by;
  console.log(url);
  var results = document.getElementById("results");
  $.getJSON(url, function(yts_data) {
    //yts_data is the JSON string
    results.innerHTML = "";
      i=0;
      for(var obj in yts_data["data"]["movies"]){
      // document.write(i);
      // document.write(yts_data["data"]["movies"][0]["medium_cover_image"]);
      var bg=yts_data["data"]["movies"][i]["background_image"];
      results.innerHTML += "<a href='movie_preview.html?hash="+yts_data["data"]["movies"][i]["torrents"][0]["hash"]+"&bg="+bg+"&title="+yts_data["data"]["movies"][i]["title_long"]+"'><img src='"+yts_data["data"]["movies"][i]["medium_cover_image"]+"'<hr /></a>";
      i++;
    }
  });
  results.innerHTML = "requesting...";
}

var url, limit, page, quality, minimum_rating, query_term, genre, sort_by, order_by, with_rt_ratings;
limit = 20; //Integer between 1 - 50 (inclusive) The limit of results per page that has been set
page = 1; //Integer (Unsigned)	Used to see the next page of movies, eg limit=15 and page=2 will show you movies 15-30
quality = "All"; //String (720p, 1080p, 3D)	Used to filter by a given quality
minimum_rating = 0; //Integer between 0 - 9 (inclusive)	Used to filter movie by a given minimum IMDb rating
query_term = "0"; //String	Used for movie search, matching on: Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code
genre = "All"; //Action	Adventure	Animation	Biography Comedy	Crime	Documentary	Drama Family	Fantasy	Film-Noir	Game-Show History	Horror	Music	Musical Mystery	News	Reality-TV	Romance Sci-Fi	Sport	Talk-Show	Thriller War	Western
sort_by = "date_added"; //String (title, year, rating, peers, seeds, download_count, like_count, date_added)	Sorts the results by choosen value
order_by = "desc"; //String (desc, asc)	Orders the results by either Ascending or Descending order
with_rt_ratings = false; //Boolean Returns the list with the Rotten Tomatoes rating included

url = "https://yts.ag/api/v2/list_movies.json?limit="+limit+"&page="+page+"&quality="quality"&minimum_rating="+minimum_rating+"&query_term="+query_term+"&genre="+genre+"&sort_by="+sort_by+"&order_by="+order_by+"&with_rt_ratings="+with_rt_ratings+"";

function ajax_get_json(id){
  console.log(id);
  var results = document.getElementById("results");
  $.getJSON('https://yts.ag/api/v2/list_movies.json?minimum_rating=8&page=1&limit=50', function(yts_data) {
  //yts_data is the JSON string
  results.innerHTML = "";
  i=0;
      for(var obj in yts_data["data"]["movies"]){
      // document.write(i);
      // document.write(yts_data["data"]["movies"][0]["medium_cover_image"]);
      results.innerHTML += "<a href='index.html?hash="+yts_data["data"]["movies"][i]["torrents"][0]["hash"]+"&title="+yts_data["data"]["movies"][i]["title_long"]+"'><img src='"+yts_data["data"]["movies"][i]["medium_cover_image"]+"'<hr /></a>";
      i++;

      }

});


    results.innerHTML = "requesting...";
}

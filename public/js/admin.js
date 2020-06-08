function deleteEpisode(episodeNumber) {
    $.ajax({
        url: window.location.pathname + '/' + episodeNumber,
        type: 'DELETE',
        success: function(result) {
           console.log(this.url, result)
        }
    });
}
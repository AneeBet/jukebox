using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;
using IO.Swagger.Models;
using Microsoft.AspNetCore.Cors;

namespace IO.Swagger.Controllers
{
    /// <summary>
    /// API controller for managing songs
    /// </summary>
    [ApiController]
    [EnableCors]
    public class SongApiController : ControllerBase
    {
        private static readonly List<Song> _songs = new()
        {
            new Song { _Song = "Blinding Lights", Artist = "The Weeknd", Album = "After Hours", Playlist = new List<string> { "Top 100", "Party Hits" } },
            new Song { _Song = "Shape of You", Artist = "Ed Sheeran", Album = "÷ (Divide)", Playlist = new List<string> { "Pop Hits", "Summer Vibes" } },
            new Song { _Song = "Levitating", Artist = "Dua Lipa", Album = "Future Nostalgia", Playlist = new List<string> { "Dance Party", "Trending Now" } },
            new Song { _Song = "Smells Like Teen Spirit", Artist = "Nirvana", Album = "Nevermind", Playlist = new List<string> { "Rock Classics", "90s Hits" } },
            new Song { _Song = "Someone Like You", Artist = "Adele", Album = "21", Playlist = new List<string> { "Sad Songs", "Acoustic Favorites" } }
        };

        /// <summary>
        /// Adds a new song to the collection
        /// </summary>
        /// <param name="body">Details of the song to be added</param>
        /// <response code="201">The newly created song</response>
        [HttpPost]
        [Route("/songs")]
        [SwaggerOperation("CreateSong")]
        [SwaggerResponse(statusCode: 201, type: typeof(Song), description: "The newly created song")]
        public IActionResult CreateSong([FromBody] Song body)
        {
            if (body == null || string.IsNullOrWhiteSpace(body._Song))
            {
                return BadRequest("Invalid song data.");
            }

            // Check if the song already exists
            if (_songs.Any(s => s._Song.Equals(body._Song, StringComparison.OrdinalIgnoreCase) && s.Artist.Equals(body.Artist, StringComparison.OrdinalIgnoreCase)))
            {
                return Conflict(new { message = "The song already exists." });
            }

            _songs.Add(body);
            return CreatedAtAction(nameof(GetSong), new { songId = body._Song }, body);
        }

        /// <summary>
        /// Removes a song by its title
        /// </summary>
        /// <param name="songId">The title of the song to be removed</param>
        /// <response code="204">The song was successfully removed</response>
        [HttpDelete]
        [Route("/songs/{songId}")]
        [SwaggerOperation("DeleteSong")]
        public IActionResult DeleteSong([FromRoute][Required] string songId)
        {
            var song = _songs.FirstOrDefault(s => s._Song.Equals(songId, StringComparison.OrdinalIgnoreCase));

            if (song == null)
            {
                return NotFound(new { message = "The song could not be found." });
            }

            _songs.Remove(song);
            return NoContent();
        }

        /// <summary>
        /// Retrieves the details of a song by its title
        /// </summary>
        /// <param name="songId">The title of the song to retrieve</param>
        /// <response code="200">Details of the song</response>
        [HttpGet]
        [Route("/songs/{songId}")]
        [SwaggerOperation("GetSong")]
        [SwaggerResponse(statusCode: 200, type: typeof(Song), description: "Details of the song")]
        public IActionResult GetSong([FromRoute][Required] string songId)
        {
            var song = _songs.FirstOrDefault(s => s._Song.Equals(songId, StringComparison.OrdinalIgnoreCase));

            if (song == null)
            {
                return NotFound(new { message = "The song could not be found." });
            }

            return Ok(song);
        }

        /// <summary>
        /// Lists all available songs
        /// </summary>
        /// <response code="200">List of all songs</response>
        [HttpGet]
        [Route("/songs")]
        [SwaggerOperation("ListSongs")]
        [SwaggerResponse(statusCode: 200, type: typeof(List<Song>), description: "List of all songs")]
        public IActionResult ListSongs()
        {
            return Ok(_songs);
        }

        /// <summary>
        /// Updates the details of a song by its title
        /// </summary>
        /// <param name="songId">The title of the song to update</param>
        /// <param name="body">Updated song details</param>
        /// <response code="200">Updated song details</response>
        [HttpPut]
        [Route("/songs/{songId}")]
        [SwaggerOperation("UpdateSong")]
        [SwaggerResponse(statusCode: 200, type: typeof(Song), description: "Updated song details")]
        public IActionResult UpdateSong([FromRoute][Required] string songId, [FromBody] Song body)
        {
            var song = _songs.FirstOrDefault(s => s._Song.Equals(songId, StringComparison.OrdinalIgnoreCase));

            if (song == null)
            {
                return NotFound(new { message = "The song could not be found." });
            }

            if (body == null || string.IsNullOrWhiteSpace(body._Song))
            {
                return BadRequest("Invalid song data.");
            }

            // Update song details
            song._Song = body._Song;
            song.Artist = body.Artist;
            song.Album = body.Album;
            song.Playlist = body.Playlist;

            return Ok(song);
        }
    }
}

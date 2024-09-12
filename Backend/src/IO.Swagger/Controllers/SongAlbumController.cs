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
    /// Controller for managing albums.
    /// </summary>
    [ApiController]
    [EnableCors]
    public class SongAlbumController : ControllerBase
    {
        private static List<Album> _albums;

        static SongAlbumController()
        {
            //Added logging features
            // Initialize with some dummy data
            _albums = new List<Album>
            {
                new Album
                {
                    _Album = "After Hours",
                    Artist = "The Weeknd",
                    Songs = new List<string> { "Blinding Lights", "Save Your Tears" }
                },
                new Album
                {
                    _Album = "Future Nostalgia",
                    Artist = "Dua Lipa",
                    Songs = new List<string> { "Don't Start Now", "Physical" }
                },
                new Album
                {
                    _Album = "folklore",
                    Artist = "Taylor Swift",
                    Songs = new List<string> { "Cardigan", "Exile" }
                }
            };
        }

        /// <summary>
        /// Deletes a specific album by its name.
        /// </summary>
        /// <param name="albumName">The name of the album to delete.</param>
        /// <response code="204">Album successfully deleted.</response>
        /// <response code="404">Album not found.</response>
        [HttpDelete]
        [Route("/api/albums/{albumName}")]
        [SwaggerOperation("AlbumsAlbumNameDelete")]
        public IActionResult AlbumsAlbumNameDelete([FromRoute][Required]string albumName)
        {
            var album = _albums.FirstOrDefault(a => a._Album == albumName);
            if (album == null)
                return NotFound();

            _albums.Remove(album);
            return NoContent();
        }

        /// <summary>
        /// Retrieves a specific album by its name.
        /// </summary>
        /// <param name="albumName">The name of the album to retrieve.</param>
        /// <response code="200">Details of the specified album.</response>
        /// <response code="404">Album not found.</response>
        [HttpGet]
        [Route("/api/albums/{albumName}")]
        [SwaggerOperation("AlbumsAlbumNameGet")]
        [SwaggerResponse(statusCode: 200, type: typeof(Album), description: "Details of the specified album")]
        public IActionResult AlbumsAlbumNameGet([FromRoute][Required]string albumName)
        {
            var album = _albums.FirstOrDefault(a => a._Album == albumName);
            if (album == null)
                return NotFound();

            return Ok(album);
        }

        /// <summary>
        /// Updates an existing album by its name.
        /// </summary>
        /// <param name="body">The updated album details.</param>
        /// <param name="albumName">The name of the album to update.</param>
        /// <response code="200">Album successfully updated.</response>
        /// <response code="400">Invalid input data.</response>
        /// <response code="404">Album not found.</response>
        [HttpPut]
        [Route("/api/albums/{albumName}")]
        [SwaggerOperation("AlbumsAlbumNamePut")]
        [SwaggerResponse(statusCode: 200, type: typeof(Album), description: "Album successfully updated")]
        public IActionResult AlbumsAlbumNamePut([FromBody]Album body, [FromRoute][Required]string albumName)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var album = _albums.FirstOrDefault(a => a._Album == albumName);
            if (album == null)
                return NotFound();

            album.Artist = body.Artist;
            album.Songs = body.Songs;
            return Ok(album);
        }

        /// <summary>
        /// Retrieves all albums.
        /// </summary>
        /// <response code="200">A list of all albums.</response>
        [HttpGet]
        [Route("/api/albums")]
        [SwaggerOperation("AlbumsGet")]
        [SwaggerResponse(statusCode: 200, type: typeof(List<Album>), description: "A list of all albums")]
        public IActionResult AlbumsGet()
        {
            return Ok(_albums);
        }

        /// <summary>
        /// Creates a new album.
        /// </summary>
        /// <param name="body">The details of the new album.</param>
        [HttpPost]
        [Route("/api/albums")]
        [SwaggerOperation("AlbumsPost")]
        [SwaggerResponse(statusCode: 201, type: typeof(Album), description: "Album successfully created")]
        public IActionResult AlbumsPost([FromBody]Album body)
        {
            if (!ModelState.IsValid || body == null || string.IsNullOrEmpty(body._Album))
            {
                // Log model state errors for debugging
                var errors = ModelState.Values.SelectMany(v => v.Errors);
                foreach (var error in errors)
                {
                    Console.WriteLine(error.ErrorMessage);
                }
                
                return BadRequest(ModelState);
            }

            _albums.Add(body);
            return CreatedAtAction(nameof(AlbumsAlbumNameGet), new { albumName = body._Album }, body);
        }
    }
}
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import your CSS file for styling
import { Link } from "react-router-dom";

const SongsCrud = () => {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({
    _Song: "",
    Artist: "",
    Album: "",
    Playlist: [],
  });
  const [editingSongId, setEditingSongId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order
  const [sortKey, setSortKey] = useState("_Song"); // State for sorting key

  // Fetch all songs
  useEffect(() => {
    axios
      .get("http://localhost:3002/songs")
      .then((response) => setSongs(response.data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  // Add or update a song
  const saveSong = () => {
    if (editingSongId) {
      // Update existing song
      axios
        .put(`http://localhost:3002/songs/${editingSongId}`, newSong)
        .then((response) => {
          const updatedSongs = songs.map((song) =>
            song.id === editingSongId ? response.data : song
          );
          setSongs(updatedSongs);
          resetForm();
        })
        .catch((error) => console.error("Error updating song:", error));
    } else {
      // Add a new song
      axios
        .post("http://localhost:3002/songs", newSong)
        .then((response) => {
          setSongs([...songs, response.data]);
          resetForm();
        })
        .catch((error) => console.error("Error adding song:", error));
    }
  };

  // Prepare the form for editing a song
  const editSong = (song) => {
    setNewSong({
      _Song: song._Song,
      Artist: song.Artist,
      Album: song.Album,
      Playlist: song.Playlist,
    });
    setEditingSongId(song.id);
  };

  // Delete a song
  const deleteSong = (id) => {
    axios
      .delete(`http://localhost:3002/songs/${id}`)
      .then(() => {
        const filteredSongs = songs.filter((song) => song.id !== id);
        setSongs(filteredSongs);
      })
      .catch((error) => console.error("Error deleting song:", error));
  };

  // Reset the form fields
  const resetForm = () => {
    setNewSong({ _Song: "", Artist: "", Album: "", Playlist: [] });
    setEditingSongId(null);
  };

  // Sort and filter songs
  const sortedSongs = [...songs]
    .filter(
      (song) =>
        song._Song.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.Artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.Album.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortKey].localeCompare(b[sortKey]);
      } else {
        return b[sortKey].localeCompare(a[sortKey]);
      }
    });

  // Toggle sort order
  const toggleSortOrder = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="App">
      <h1>Songs</h1>

      {/* Search Input Field */}
      <input
        type="text"
        placeholder="Search songs, artists, or albums..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table>
        <thead>
          <tr>
            <th onClick={() => toggleSortOrder("_Song")}>Song</th>
            <th onClick={() => toggleSortOrder("Artist")}>Artist</th>
            <th onClick={() => toggleSortOrder("Album")}>Album</th>
            <th>Playlists</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedSongs.map((song) => (
            <tr key={song.id}>
              <td>{song._Song}</td>
              <td>{song.Artist}</td>
              <td>{song.Album}</td>
              <td>{song.Playlist.join(", ")}</td>
              <td>
                <button onClick={() => editSong(song)}>Edit</button>
                <button onClick={() => deleteSong(song.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editingSongId ? "Edit Song" : "Add New Song"}</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Song Name"
          value={newSong._Song}
          onChange={(e) => setNewSong({ ...newSong, _Song: e.target.value })}
        />
        <input
          type="text"
          placeholder="Artist"
          value={newSong.Artist}
          onChange={(e) => setNewSong({ ...newSong, Artist: e.target.value })}
        />
        <input
          type="text"
          placeholder="Album"
          value={newSong.Album}
          onChange={(e) => setNewSong({ ...newSong, Album: e.target.value })}
        />
        <textarea
          placeholder="Playlists (comma-separated)"
          value={newSong.Playlist.join(", ")}
          onChange={(e) =>
            setNewSong({
              ...newSong,
              Playlist: e.target.value
                .split(",")
                .map((playlist) => playlist.trim()),
            })
          }
        />
        <button onClick={saveSong}>
          {editingSongId ? "Update Song" : "Add Song"}
        </button>
        {editingSongId && <button onClick={resetForm}>Cancel</button>}
        <Link to={"/"}>
          <button>Go Back to Albums Adding Page</button>
        </Link>
      </div>
    </div>
  );
};

export default SongsCrud;

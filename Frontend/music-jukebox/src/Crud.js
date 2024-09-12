import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";

const Crud = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({
    album: "",
    artist: "",
    songs: [],
  });
  const [editingAlbumName, setEditingAlbumName] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortKey, setSortKey] = useState("album");

  // Fetch all albums
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/albums")
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  // Add or update an album
  const saveAlbum = () => {
    if (editingAlbumName) {
      // Update existing album
      axios
        .put(`http://localhost:5000/api/albums/${editingAlbumName}`, newAlbum)
        .then((response) => {
          const updatedAlbums = albums.map((album) =>
            album.album === editingAlbumName ? response.data : album
          );
          setAlbums(updatedAlbums);
          resetForm();
        })
        .catch((error) => console.error("Error updating album:", error));
    } else {
      // Add a new album
      axios
        .post("http://localhost:5000/api/albums", newAlbum)
        .then((response) => {
          setAlbums([...albums, response.data]);
          resetForm();
        })
        .catch((error) => console.error("Error adding album:", error));
    }
  };

  // Prepare the form for editing an album
  const editAlbum = (album) => {
    setNewAlbum({
      album: album.album,
      artist: album.artist,
      songs: album.songs,
    });
    setEditingAlbumName(album.album);
  };

  // Delete an album
  const deleteAlbum = (albumName) => {
    axios
      .delete(`http://localhost:5000/api/albums/${albumName}`)
      .then(() => {
        const filteredAlbums = albums.filter(
          (album) => album.album !== albumName
        );
        setAlbums(filteredAlbums);
      })
      .catch((error) => console.error("Error deleting album:", error));
  };

  // Reset the form fields
  const resetForm = () => {
    setNewAlbum({ album: "", artist: "", songs: [] });
    setEditingAlbumName(null);
  };

  // Sort and filter albums
  const sortedAlbums = [...albums]
    .filter(
      (album) =>
        album.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = (a[sortKey] || "").toLowerCase();
      const bValue = (b[sortKey] || "").toLowerCase();
      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
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
      <h1>Albums</h1>

      {/* Search Input Field */}
      <input
        type="text"
        placeholder="Search albums or artists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table>
        <thead>
          <tr>
            <th onClick={() => toggleSortOrder("album")}>Album</th>
            <th onClick={() => toggleSortOrder("artist")}>Artist</th>
            <th>Songs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAlbums.map((album) => (
            <tr key={album.album}>
              <td>{album.album}</td>
              <td>{album.artist}</td>
              <td>{album.songs.join(", ")}</td>
              <td>
                <button onClick={() => editAlbum(album)}>Edit</button>
                <button onClick={() => deleteAlbum(album.album)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editingAlbumName ? "Edit Album" : "Add New Album"}</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Album Name"
          value={newAlbum.album}
          onChange={(e) => setNewAlbum({ ...newAlbum, album: e.target.value })}
        />
        <input
          type="text"
          placeholder="Artist"
          value={newAlbum.artist}
          onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
        />
        <textarea
          placeholder="Songs (comma-separated)"
          value={newAlbum.songs.join(", ")}
          onChange={(e) =>
            setNewAlbum({
              ...newAlbum,
              songs: e.target.value.split(",").map((song) => song.trim()),
            })
          }
        />
        <button onClick={saveAlbum}>
          {editingAlbumName ? "Update Album" : "Add Album"}
        </button>
        {editingAlbumName && <button onClick={resetForm}>Cancel</button>}
        <Link to={"/songs"}>
          <button>Go to Songs Adding Page</button>
        </Link>
      </div>
    </div>
  );
};

export default Crud;

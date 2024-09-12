import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";

const Crud = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({
    _Album: "",
    Artist: "",
    Songs: [],
  });
  const [editingAlbumId, setEditingAlbumId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order
  const [sortKey, setSortKey] = useState("_Album"); // State for sorting key

  // Fetch all albums
  useEffect(() => {
    axios
      .get("http://localhost:3001/albums")
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  // Add or update an album
  const saveAlbum = () => {
    if (editingAlbumId) {
      // Update existing album
      axios
        .put(`http://localhost:3001/albums/${editingAlbumId}`, newAlbum)
        .then((response) => {
          const updatedAlbums = albums.map((album) =>
            album.id === editingAlbumId ? response.data : album
          );
          setAlbums(updatedAlbums);
          resetForm();
        })
        .catch((error) => console.error("Error updating album:", error));
    } else {
      // Add a new album
      axios
        .post("http://localhost:3001/albums", newAlbum)
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
      _Album: album._Album,
      Artist: album.Artist,
      Songs: album.Songs,
    });
    setEditingAlbumId(album.id);
  };

  // Delete an album
  const deleteAlbum = (id) => {
    axios
      .delete(`http://localhost:3001/albums/${id}`)
      .then(() => {
        const filteredAlbums = albums.filter((album) => album.id !== id);
        setAlbums(filteredAlbums);
      })
      .catch((error) => console.error("Error deleting album:", error));
  };

  // Reset the form fields
  const resetForm = () => {
    setNewAlbum({ _Album: "", Artist: "", Songs: [] });
    setEditingAlbumId(null);
  };

  // Sort and filter albums
  const sortedAlbums = [...albums]
    .filter(
      (album) =>
        album._Album.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.Artist.toLowerCase().includes(searchTerm.toLowerCase())
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
            <th onClick={() => toggleSortOrder("_Album")}>Album</th>
            <th onClick={() => toggleSortOrder("Artist")}>Artist</th>
            <th>Songs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAlbums.map((album) => (
            <tr key={album.id}>
              <td>{album._Album}</td>
              <td>{album.Artist}</td>
              <td>{album.Songs.join(", ")}</td>
              <td>
                <button onClick={() => editAlbum(album)}>Edit</button>
                <button onClick={() => deleteAlbum(album.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editingAlbumId ? "Edit Album" : "Add New Album"}</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Album Name"
          value={newAlbum._Album}
          onChange={(e) => setNewAlbum({ ...newAlbum, _Album: e.target.value })}
        />
        <input
          type="text"
          placeholder="Artist"
          value={newAlbum.Artist}
          onChange={(e) => setNewAlbum({ ...newAlbum, Artist: e.target.value })}
        />
        <textarea
          placeholder="Songs (comma-separated)"
          value={newAlbum.Songs.join(", ")}
          onChange={(e) =>
            setNewAlbum({
              ...newAlbum,
              Songs: e.target.value.split(",").map((song) => song.trim()),
            })
          }
        />
        <button onClick={saveAlbum}>
          {editingAlbumId ? "Update Album" : "Add Album"}
        </button>
        {editingAlbumId && <button onClick={resetForm}>Cancel</button>}
        <Link to={"/songs"}>
          <button>Go to Songs Adding Page</button>
        </Link>
      </div>
    </div>
  );
};

export default Crud;

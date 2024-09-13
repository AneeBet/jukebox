import React from 'react'

// const data = [
//     {
//         "song": "Blinding Lights",
//         "artist": "The Weeknd",
//         "album": "After Hours",
//         "playlist": ["Top 100", "Party Hits"]
//     },
//     {
//         "song": "Shape of You",
//         "artist": "Ed Sheeran",
//         "album": "÷ (Divide)",
//         "playlist": ["Pop Hits", "Summer Vibes"]
//     },
//     {
//         "song": "Levitating",
//         "artist": "Dua Lipa",
//         "album": "Future Nostalgia",
//         "playlist": ["Dance Party", "Trending Now"]
//     },
//     {
//         "song": "Smells Like Teen Spirit",
//         "artist": "Nirvana",
//         "album": "Nevermind",
//         "playlist": ["Rock Classics", "90s Hits"]
//     },
//     {
//         "song": "Someone Like You",
//         "artist": "Adele",
//         "album": "21",
//         "playlist": ["Sad Songs", "Acoustic Favorites"]
//     },
//     {
//         "song": "Uptown Funk",
//         "artist": "Mark Ronson",
//         "album": "Uptown Special",
//         "playlist": ["Party Hits", "Top 100"]
//     },
//     {
//         "song": "Bad Guy",
//         "artist": "Billie Eilish",
//         "album": "When We All Fall Asleep, Where Do We Go?",
//         "playlist": ["Trending Now", "Pop Hits"]
//     },
//     {
//         "song": "Believer",
//         "artist": "Imagine Dragons",
//         "album": "Evolve",
//         "playlist": ["Workout Mix", "Rock Classics"]
//     },
//     {
//         "song": "Rolling in the Deep",
//         "artist": "Adele",
//         "album": "21",
//         "playlist": ["Top 100", "Sad Songs"]
//     },
//     {
//         "song": "Don't Start Now",
//         "artist": "Dua Lipa",
//         "album": "Future Nostalgia",
//         "playlist": ["Dance Party", "Trending Now"]
//     },
//     {
//         "song": "Sunflower",
//         "artist": "Post Malone",
//         "album": "Hollywood's Bleeding",
//         "playlist": ["Summer Vibes", "Top 100"]
//     },
//     {
//         "song": "Can't Stop",
//         "artist": "Red Hot Chili Peppers",
//         "album": "By the Way",
//         "playlist": ["Rock Classics", "90s Hits"]
//     },
//     {
//         "song": "Peaches",
//         "artist": "Justin Bieber",
//         "album": "Justice",
//         "playlist": ["Pop Hits", "Trending Now"]
//     },
//     {
//         "song": "Blow",
//         "artist": "Ed Sheeran",
//         "album": "No.6 Collaborations Project",
//         "playlist": ["Rock Classics", "Party Hits"]
//     },
//     {
//         "song": "Drivers License",
//         "artist": "Olivia Rodrigo",
//         "album": "SOUR",
//         "playlist": ["Sad Songs", "Pop Hits"]
//     },
//     {
//         "song": "Radioactive",
//         "artist": "Imagine Dragons",
//         "album": "Night Visions",
//         "playlist": ["Workout Mix", "Rock Classics"]
//     },
//     {
//         "song": "Happier Than Ever",
//         "artist": "Billie Eilish",
//         "album": "Happier Than Ever",
//         "playlist": ["Sad Songs", "Acoustic Favorites"]
//     },
//     {
//         "song": "Take My Breath",
//         "artist": "The Weeknd",
//         "album": "Dawn FM",
//         "playlist": ["Top 100", "Party Hits"]
//     },
//     {
//         "song": "Memories",
//         "artist": "Maroon 5",
//         "album": "JORDI",
//         "playlist": ["Summer Vibes", "Pop Hits"]
//     },
//     {
//         "song": "Sweet Child O' Mine",
//         "artist": "Guns N' Roses",
//         "album": "Appetite for Destruction",
//         "playlist": ["Rock Classics", "90s Hits"]
//     },
//     {
//         "song": "Watermelon Sugar",
//         "artist": "Harry Styles",
//         "album": "Fine Line",
//         "playlist": ["Summer Vibes", "Top 100"]
//     },
//     {
//         "song": "Circles",
//         "artist": "Post Malone",
//         "album": "Hollywood's Bleeding",
//         "playlist": ["Trending Now", "Pop Hits"]
//     },
//     {
//         "song": "Heat Waves",
//         "artist": "Glass Animals",
//         "album": "Dreamland",
//         "playlist": ["Summer Vibes", "Top 100"]
//     },
//     {
//         "song": "Old Town Road",
//         "artist": "Lil Nas X",
//         "album": "7",
//         "playlist": ["Party Hits", "Top 100"]
//     },
//     {
//         "song": "Senorita",
//         "artist": "Shawn Mendes",
//         "album": "Shawn Mendes",
//         "playlist": ["Pop Hits", "Trending Now"]
//     },
//     {
//         "song": "Enter Sandman",
//         "artist": "Metallica",
//         "album": "Metallica",
//         "playlist": ["Rock Classics", "90s Hits"]
//     },
//     {
//         "song": "Shallow",
//         "artist": "Lady Gaga",
//         "album": "A Star is Born Soundtrack",
//         "playlist": ["Acoustic Favorites", "Sad Songs"]
//     },
//     {
//         "song": "Funky Town",
//         "artist": "Lipps Inc.",
//         "album": "Mouth to Mouth",
//         "playlist": ["Party Hits", "Top 100"]
//     },
//     {
//         "song": "The Nights",
//         "artist": "Avicii",
//         "album": "Stories",
//         "playlist": ["Summer Vibes", "Trending Now"]
//     },
//     {
//         "song": "Bohemian Rhapsody",
//         "artist": "Queen",
//         "album": "A Night at the Opera",
//         "playlist": ["Rock Classics", "Top 100"]
//     }
// ]

const fakePlaylistdata = [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', genre: 'Pop', duration: '3:20' },
    { id: 2, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', genre: 'Pop', duration: '3:23' },
    { id: 3, title: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)', genre: 'Pop', duration: '3:53' },
    { id: 4, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', genre: 'Funk', duration: '4:30' },
    { id: 5, title: 'Someone Like You', artist: 'Adele', album: '21', genre: 'Soul', duration: '4:45' },
    { id: 6, title: 'Rolling in the Deep', artist: 'Adele', album: '21', genre: 'Soul', duration: '3:48' },
    { id: 7, title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', genre: 'Pop', duration: '4:54' },
    { id: 8, title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', genre: 'Rock', duration: '5:01' },
    { id: 9, title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', genre: 'Rock', duration: '6:30' },
    { id: 10, title: 'Lose Yourself', artist: 'Eminem', album: '8 Mile', genre: 'Hip Hop', duration: '3:20' },
    { id: 11, title: 'Viva La Vida', artist: 'Coldplay', album: 'Viva La Vida or Death and All His Friends', genre: 'Alternative', duration: '4:02' },
    { id: 12, title: 'Hey Ya!', artist: 'OutKast', album: 'Speakerboxxx/The Love Below', genre: 'Hip Hop', duration: '3:55' }
];

const PlaylistPage = () => {
    return (
        <>
            <section className='mt-3'>
                <div className='container'>
                    <div class="card">
                        <h5 class="card-header">Playlists</h5>
                        <div class="table-responsive text-nowrap">
                            <table class="table table-dark">
                                <thead>
                                    <tr>
                                        <th>Song</th>
                                        <th>Artist</th>
                                        <th>Album</th>
                                        <th>Genre</th>
                                        <th>Duration</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    {fakePlaylistdata?.map((iteam, index) => {
                                        return <>
                                            <tr key={index}>
                                                <td className='text-start'><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>{iteam.title}</strong></td>
                                                <td className='text-start'>{iteam.artist}</td>
                                                <td className='text-start'>{iteam.album} </td>
                                                <td className='text-start'><span class="badge bg-label-primary me-1">genre</span></td>
                                                <td className='text-start'>{iteam.duration}</td>
                                            </tr>
                                        </>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default PlaylistPage
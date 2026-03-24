import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Music = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({ id: 1, title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' });

  const songs = [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
    { id: 2, title: 'Save Your Tears', artist: 'The Weeknd', duration: '3:35' },
    { id: 3, title: 'Starboy', artist: 'The Weeknd', duration: '3:50' },
    { id: 4, title: 'Die For You', artist: 'The Weeknd', duration: '4:11' },
    { id: 5, title: 'Circles', artist: 'Post Malone', duration: '3:35' },
    { id: 6, title: 'Sunflower', artist: 'Post Malone', duration: '2:38' },
  ];

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <div className="container-fluid vh-100 bg-black text-white p-0 d-flex flex-column overflow-hidden">
      <div className="row g-0 flex-grow-1 overflow-hidden">
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 bg-dark p-3 border-end border-secondary d-none d-md-block">
          <div className="mb-4 text-center text-md-start">
            <h4 className="fw-bold text-info"><i className="bi bi-music-note-beamed me-2"></i>MusicApp</h4>
          </div>
          <ul className="nav flex-column mb-auto">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link text-white active bg-secondary rounded-2 shadow-sm"><i className="bi bi-house-door me-2"></i> Home</a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link text-white-50"><i className="bi bi-search me-2"></i> Search</a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link text-white-50"><i className="bi bi-collection-play me-2"></i> Library</a>
            </li>
          </ul>
          <hr className="border-secondary" />
          <div className="mt-4">
            <h6 className="text-uppercase small text-white-50 fw-bold mb-3 px-3">Playlists</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link text-white-50 small py-1 px-3">Top Hits 2024</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link text-white-50 small py-1 px-3">Chill Vibes</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link text-white-50 small py-1 px-3">Focus Flow</a></li>
            </ul>
          </div>
          <div className="mt-auto pt-5">
            <button className="btn btn-outline-danger btn-sm w-100 rounded-3 shadow-sm" onClick={() => navigate('/')}>
              <i className="bi bi-box-arrow-left me-2"></i> Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 p-4 p-md-5 overflow-auto">
          <header className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 className="fw-bold mb-0">Good afternoon</h2>
              <p className="text-white-50 mb-0">Ready for some music?</p>
            </div>
            <div className="d-flex align-items-center bg-dark p-2 rounded-pill shadow-sm">
              <div className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '32px', height: '32px' }}>
                <i className="bi bi-person-fill text-dark small"></i>
              </div>
              <span className="ms-2 me-3 small fw-semibold d-none d-sm-inline">Premium User</span>
            </div>
          </header>

          <section className="mb-5">
            <h4 className="fw-bold mb-4">Trending Now</h4>
            <div className="row g-4">
              {songs.slice(0, 4).map(song => (
                <div key={song.id} className="col-6 col-md-4 col-xl-3">
                  <div className="card bg-dark border-0 hover-lift h-100 overflow-hidden shadow-lg rounded-4 p-3" style={{ cursor: 'pointer' }} onClick={() => handlePlaySong(song)}>
                    <div className="position-relative">
                      <div className="ratio ratio-1x1 bg-secondary d-flex align-items-center justify-content-center rounded-3 shadow-inner">
                         <i className="bi bi-music-note fs-1 text-white-25"></i>
                      </div>
                      <button className={`btn btn-info rounded-circle position-absolute bottom-0 end-0 m-2 shadow-lg play-btn-card ${currentSong.id === song.id && isPlaying ? 'active' : ''}`}>
                        <i className={`bi bi-${currentSong.id === song.id && isPlaying ? 'pause' : 'play'}-fill`}></i>
                      </button>
                    </div>
                    <div className="card-body p-0 pt-3">
                      <h6 className="card-title fw-bold mb-1 text-truncate">{song.title}</h6>
                      <p className="card-text text-white-50 small text-truncate">{song.artist}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="d-flex justify-content-between align-items-end mb-4">
              <h4 className="fw-bold mb-0">Recently Played</h4>
              <a href="#" className="text-info text-decoration-none small fw-bold">View All</a>
            </div>
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle mb-0">
                <thead>
                  <tr className="text-white-50 small text-uppercase">
                    <th className="border-0 ps-3">#</th>
                    <th className="border-0">Title</th>
                    <th className="border-0">Artist</th>
                    <th className="border-0 text-end pe-3"><i className="bi bi-clock"></i></th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map((song, index) => (
                    <tr key={song.id} style={{ cursor: 'pointer' }} className={currentSong.id === song.id ? 'table-active' : ''} onClick={() => handlePlaySong(song)}>
                      <td className="border-0 ps-3 text-white-50">{index + 1}</td>
                      <td className="border-0">
                        <div className="d-flex align-items-center">
                          <div className={`fw-bold ${currentSong.id === song.id ? 'text-info' : ''}`}>{song.title}</div>
                        </div>
                      </td>
                      <td className="border-0 text-white-50">{song.artist}</td>
                      <td className="border-0 text-white-50 text-end pe-3">{song.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {/* Player Bar */}
      <div className="bg-dark border-top border-secondary p-3 shadow-lg mt-auto" style={{ height: '100px', zIndex: 1000 }}>
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center">
            {/* Current Song Info */}
            <div className="col-4 d-flex align-items-center">
              <div className="bg-secondary rounded-3 me-3 d-none d-sm-flex align-items-center justify-content-center shadow-sm" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-music-note"></i>
              </div>
              <div className="overflow-hidden">
                <h6 className="mb-0 text-truncate fw-bold">{currentSong.title}</h6>
                <p className="mb-0 small text-white-50 text-truncate">{currentSong.artist}</p>
              </div>
              <button className="btn btn-link text-white-50 ms-3 p-0 hover-info"><i className="bi bi-heart"></i></button>
            </div>

            {/* Controls */}
            <div className="col-4 text-center">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <button className="btn btn-link text-white-50 d-none d-md-block mx-2 p-0 hover-white"><i className="bi bi-shuffle fs-5"></i></button>
                <button className="btn btn-link text-white mx-2 p-0 hover-info"><i className="bi bi-skip-start-fill fs-3"></i></button>
                <button className="btn btn-info rounded-circle mx-3 d-flex align-items-center justify-content-center shadow-lg hover-scale" style={{ width: '45px', height: '45px' }} onClick={() => setIsPlaying(!isPlaying)}>
                  <i className={`bi bi-${isPlaying ? 'pause' : 'play'}-fill fs-4`}></i>
                </button>
                <button className="btn btn-link text-white mx-2 p-0 hover-info"><i className="bi bi-skip-end-fill fs-3"></i></button>
                <button className="btn btn-link text-white-50 d-none d-md-block mx-2 p-0 hover-white"><i className="bi bi-repeat fs-5"></i></button>
              </div>
              <div className="d-flex align-items-center justify-content-center px-lg-5">
                <span className="small text-white-50 me-2">1:24</span>
                <div className="progress bg-secondary flex-grow-1" style={{ height: '4px', cursor: 'pointer' }}>
                  <div className="progress-bar bg-info shadow-sm" style={{ width: '45%' }}></div>
                </div>
                <span className="small text-white-50 ms-2">{currentSong.duration}</span>
              </div>
            </div>

            {/* Volume/Extras */}
            <div className="col-4 d-flex align-items-center justify-content-end">
              <button className="btn btn-link text-white-50 d-none d-lg-block mx-2 p-0 hover-white"><i className="bi bi-mic fs-5"></i></button>
              <button className="btn btn-link text-white-50 d-none d-lg-block mx-2 p-0 hover-white"><i className="bi bi-view-list fs-5"></i></button>
              <div className="d-flex align-items-center ms-3" style={{ width: '120px' }}>
                <button className="btn btn-link text-white-50 p-0 me-2 hover-white"><i className="bi bi-volume-up fs-5"></i></button>
                <input type="range" className="form-range custom-range" style={{ height: '4px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover-lift { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .hover-lift:hover { transform: translateY(-8px); filter: brightness(1.1); }
        .play-btn-card { opacity: 0; transform: translateY(10px); transition: all 0.3s ease; }
        .card:hover .play-btn-card { opacity: 1; transform: translateY(0); }
        .play-btn-card.active { opacity: 1; transform: translateY(0); }
        .hover-scale:hover { transform: scale(1.1); }
        .hover-info:hover { color: #0dcaf0 !important; }
        .hover-white:hover { color: #fff !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #444; }
        .table-dark { --bs-table-bg: transparent; --bs-table-hover-bg: rgba(255, 255, 255, 0.03); }
        .table-active { background-color: rgba(13, 202, 240, 0.05) !important; }
        .shadow-inner { box-shadow: inset 0 2px 10px rgba(0,0,0,0.5); }
        .custom-range::-webkit-slider-thumb { background: #0dcaf0; }
        .custom-range::-moz-range-thumb { background: #0dcaf0; }
      `}</style>
    </div>
  );
};

export default Music;

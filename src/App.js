import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AppLayout from "./pages/layouts/AppLayout";
import MovieCreatePage from "./pages/movies/Create";
import MovieDetailPage from "./pages/movies/Detail";
import ReviewListPage from "./pages/reviews/List";
import StreamListPage from "./pages/stream/List";

export default function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie" element={<MovieDetailPage />} />
          <Route path="/movie/create" element={<MovieCreatePage />} />
          <Route path="/stream" element={<StreamListPage />} />
          <Route path="/reviews" element={<ReviewListPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

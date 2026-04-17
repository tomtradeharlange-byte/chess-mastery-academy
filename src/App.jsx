import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Dashboard from './screens/Dashboard'
import Library from './screens/Library'
import Lesson from './screens/Lesson'
import Tactics from './screens/Tactics'
import Chat from './screens/Chat'
import Settings from './screens/Settings'
import VideoProgram from './screens/VideoProgram'
import TacticsCategory from './screens/TacticsCategory'
import GameHistory from './screens/GameHistory'

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/"         element={<Dashboard />} />
        <Route path="/library"  element={<Library />} />
        <Route path="/lesson"   element={<Lesson />} />
        <Route path="/tactics"  element={<Tactics />} />
        <Route path="/chat"     element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/videos"   element={<VideoProgram />} />
        <Route path="/tactics/:categoryId" element={<TacticsCategory />} />
        <Route path="/history"  element={<GameHistory />} />
      </Routes>
      <BottomNav />
    </>
  )
}

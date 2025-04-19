import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import UserList from './components/UserList';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';
import Marketing from './pages/Marketing';
import Tasks from './pages/Tasks';
import KnowledgeBase from './pages/KnowledgeBase';
import Team from './pages/Team';
import Settings from './pages/Settings';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Support from './pages/Support';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="support" element={<Support />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

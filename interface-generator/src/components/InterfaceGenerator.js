import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Workflow from './Workflow';
import Chat from './Chat';

function InterfaceGenerator() {
  return (
    <Routes>
      <Route path="/workflow" element={<Workflow />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default InterfaceGenerator;
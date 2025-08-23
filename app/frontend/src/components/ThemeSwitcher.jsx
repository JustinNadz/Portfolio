import React from 'react';

const ThemeSwitcher = () => {
  // Simple placeholder buttons for visual testing
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white/90 backdrop-blur border border-gray-200 rounded-xl shadow p-3">
      <div className="grid grid-cols-5 gap-2">
        <button title="Theme Switcher" className="w-6 h-6 rounded-full bg-slate-800" />
        <button className="w-6 h-6 rounded-full bg-blue-600" />
        <button className="w-6 h-6 rounded-full bg-slate-900" />
        <button className="w-6 h-6 rounded-full bg-slate-500" />
        <button className="w-6 h-6 rounded-full bg-black" />
      </div>
    </div>
  );
};

export default ThemeSwitcher;



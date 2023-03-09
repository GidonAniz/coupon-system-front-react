import React from 'react';
import './ToolBar.css';
import { Link } from 'react-router-dom';

const Toolbar = () => {
  return (
    <div className="toolbar">
      <Link className="toolbar__link" to="/home">Home</Link>
      <Link className="toolbar__link" to="/about">About</Link>
      <Link className="toolbar__link" to="/login">Login</Link>
      <Link className="toolbar__link" to="/contact">Contact</Link>
    </div>
  );
};

export default Toolbar;
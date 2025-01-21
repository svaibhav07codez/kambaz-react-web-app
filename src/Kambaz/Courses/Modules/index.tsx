import { useState } from 'react';

export default function Modules() {
  const [collapsed, setCollapsed] = useState(false); // State for collapse/expand
  const [viewProgress, setViewProgress] = useState(false); // State for viewing progress

  const handleCollapseAll = () => {
    setCollapsed(!collapsed);
  };

  const handleViewProgress = () => {
    setViewProgress(!viewProgress); // Example functionality
    alert("View Progress clicked!"); // Replace this with actual progress viewing logic
  };

  return (
    <div>
      <div className="wd-buttons">
        <button onClick={handleCollapseAll}>
          {collapsed ? "Expand All" : "Collapse All"}
        </button>
        <button onClick={handleViewProgress}>View Progress</button>
        <button>Publish All</button>
        <button>+ Module</button>
      </div>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          {!collapsed && (
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
              </li>
            </ul>
          )}
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          {!collapsed && (
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
              </li>
            </ul>
          )}
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          {!collapsed && (
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

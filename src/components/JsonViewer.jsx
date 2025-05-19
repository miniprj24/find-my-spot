
import React, { useState } from 'react';

const JsonViewer = ({ data }) => {
  const [expandedSections, setExpandedSections] = useState({});

  if (!data) {
    return <div className="text-center py-4">No data available</div>;
  }

  const toggleSection = (key) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const formatValue = (value) => {
    if (value === null) return <span className="text-gray-500">null</span>;
    
    if (Array.isArray(value)) {
      if (value.length === 0) return <span className="text-gray-500">[]</span>;
      
      return (
        <div className="pl-4 border-l-2 border-gray-200">
          {value.map((item, index) => (
            <div key={index} className="my-1">
              <span className="text-gray-500 mr-2">{index}:</span>
              {typeof item === 'object' && item !== null ? 
                formatObject(item) : 
                <span>{JSON.stringify(item)}</span>
              }
            </div>
          ))}
        </div>
      );
    }
    
    if (typeof value === 'object') {
      return formatObject(value);
    }
    
    if (typeof value === 'string') return <span className="text-green-600">"{value}"</span>;
    if (typeof value === 'number') return <span className="text-blue-600">{value}</span>;
    if (typeof value === 'boolean') return <span className="text-purple-600">{value.toString()}</span>;
    
    return String(value);
  };

  const formatObject = (obj) => {
    if (!obj) return <span className="text-gray-500">null</span>;
    
    const keys = Object.keys(obj);
    if (keys.length === 0) return <span className="text-gray-500">{"{}"}</span>;
    
    return (
      <div className="pl-4 border-l-2 border-gray-200">
        {keys.map(key => (
          <div key={key} className="my-1">
            <div className="flex items-start">
              <span 
                className="text-blue-800 font-medium mr-2 cursor-pointer hover:text-blue-600"
                onClick={() => typeof obj[key] === 'object' && obj[key] !== null && toggleSection(key)}
              >
                {typeof obj[key] === 'object' && obj[key] !== null && (
                  <span className="mr-1">{expandedSections[key] ? '▼' : '►'}</span>
                )}
                "{key}":
              </span>
              {typeof obj[key] === 'object' && obj[key] !== null ? (
                expandedSections[key] ? (
                  formatValue(obj[key])
                ) : (
                  <span className="text-gray-500 italic cursor-pointer" onClick={() => toggleSection(key)}>
                    {Array.isArray(obj[key]) ? 
                      `[Array(${obj[key].length})]` : 
                      `{Object: ${Object.keys(obj[key]).length} properties}`}
                  </span>
                )
              ) : (
                formatValue(obj[key])
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow font-mono text-sm overflow-x-auto">
      {formatObject(data)}
    </div>
  );
};

export default JsonViewer;

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

const JsonViewer = ({ data }) => {
  const [expanded, setExpanded] = useState({});

  if (!data || typeof data !== 'object') {
    return <div className="text-center text-gray-500 py-4">No data available</div>;
  }

  const formatKey = (key) => {
    if (!key) return '';
    const withSpaces = key.replace(/[_-]+/g, ' ');
    const spaced = withSpaces.replace(/([a-z])([A-Z])/g, '$1 $2');
    return spaced
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const toggle = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper to check if a value is a "simple number" to style bigger
  const isSimpleNumber = (val) => typeof val === 'number' || (typeof val === 'string' && !isNaN(val));

  const formatValue = (value, parentKey) => {
    if (value === null) return <span className="text-gray-500">null</span>;
    if (Array.isArray(value)) {
      if (!value.length) return <span className="text-gray-400">[]</span>;
      return (
        <div className="pl-4 border-l border-gray-200 ml-1 space-y-1 max-h-[180px] overflow-auto">
          {value.map((item, idx) => (
            <div key={idx} className="text-gray-700 text-sm">
              <span className="text-gray-500">{idx}: </span>
              {typeof item === 'object' ? formatObject(item, `${parentKey}-${idx}`) : <span>{JSON.stringify(item)}</span>}
            </div>
          ))}
        </div>
      );
    }
    if (typeof value === 'object') return formatObject(value, parentKey);

    if (typeof value === 'string') {
      if (isSimpleNumber(value)) {
        return <span className="text-3xl font-bold text-blue-700">{value}</span>;
      }
      return <span className="text-green-600">{`"${value}"`}</span>;
    }
    if (typeof value === 'number') return <span className="text-4xl font-extrabold text-blue-800">{value}</span>;
    if (typeof value === 'boolean') return <span className="text-purple-600">{value.toString()}</span>;
    return <span>{String(value)}</span>;
  };

  const formatObject = (obj, parentKey = '') => {
    const keys = Object.keys(obj);
    if (!keys.length) return <span className="text-gray-400">{'{}'}</span>;

    return (
      <div className="pl-4 border-l border-gray-200 space-y-1 mt-1 max-h-[180px] overflow-auto">
        {keys.map((key) => {
          const fullKey = `${parentKey}.${key}`;
          const isObject = typeof obj[key] === 'object' && obj[key] !== null;
          const open = expanded[fullKey];

          return (
            <div key={fullKey} className="text-sm">
              <div
                className={`cursor-pointer text-blue-700 font-semibold flex items-start gap-1 ${
                  isObject ? 'hover:text-blue-600' : ''
                }`}
                onClick={() => isObject && toggle(fullKey)}
              >
                {isObject && <span>{open ? '▼' : '▶'}</span>}
                <span>"{formatKey(key)}":</span>
                {!isObject && <span className="ml-1">{formatValue(obj[key], fullKey)}</span>}
              </div>
              {isObject && open && <div className="ml-4">{formatValue(obj[key], fullKey)}</div>}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl w-full px-4">
        {Object.entries(data).map(([key, value]) => (
          <Card
            key={key}
            className="flex flex-col justify-center items-center p-6 shadow-lg border border-gray-300 bg-white aspect-square min-h-[220px] max-h-[280px]"
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">{formatKey(key)}</h3>
            <div className="text-center text-gray-900 font-mono w-full">
              {formatValue(value, key)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JsonViewer;

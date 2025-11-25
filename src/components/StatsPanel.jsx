import React from 'react';

const StatsPanel = ({ data }) => {
    if (!data) return null;

    const calculateStats = (obj, depth = 0) => {
        let stats = {
            totalKeys: 0,
            totalValues: 0,
            maxDepth: depth,
            types: { string: 0, number: 0, boolean: 0, null: 0, array: 0, object: 0 }
        };

        if (obj === null) {
            stats.types.null++;
            stats.totalValues++;
            return stats;
        }

        if (typeof obj !== 'object') {
            stats.types[typeof obj]++;
            stats.totalValues++;
            return stats;
        }

        if (Array.isArray(obj)) {
            stats.types.array++;
            obj.forEach(item => {
                const childStats = calculateStats(item, depth + 1);
                stats.totalKeys += childStats.totalKeys;
                stats.totalValues += childStats.totalValues;
                stats.maxDepth = Math.max(stats.maxDepth, childStats.maxDepth);
                Object.keys(childStats.types).forEach(type => {
                    stats.types[type] += childStats.types[type];
                });
            });
        } else {
            stats.types.object++;
            Object.keys(obj).forEach(key => {
                stats.totalKeys++;
                const childStats = calculateStats(obj[key], depth + 1);
                stats.totalKeys += childStats.totalKeys;
                stats.totalValues += childStats.totalValues;
                stats.maxDepth = Math.max(stats.maxDepth, childStats.maxDepth);
                Object.keys(childStats.types).forEach(type => {
                    stats.types[type] += childStats.types[type];
                });
            });
        }

        return stats;
    };

    const stats = calculateStats(data);
    const jsonSize = JSON.stringify(data).length;

    return (
        <div className="stats-panel">
            <div className="stat-item">
                <span className="stat-label">Size:</span>
                <span className="stat-value">{(jsonSize / 1024).toFixed(2)} KB</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Depth:</span>
                <span className="stat-value">{stats.maxDepth}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Keys:</span>
                <span className="stat-value">{stats.totalKeys}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Values:</span>
                <span className="stat-value">{stats.totalValues}</span>
            </div>
        </div>
    );
};

export default StatsPanel;

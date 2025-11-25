import React, { useState } from 'react';

const JsonNode = ({ keyName, value, isLast, level = 0 }) => {
    const [expanded, setExpanded] = useState(true);

    const toggle = () => setExpanded(!expanded);

    const isObject = value !== null && typeof value === 'object';
    const isArray = Array.isArray(value);
    const isEmpty = isObject && Object.keys(value).length === 0;

    if (!isObject) {
        let type = typeof value;
        if (value === null) type = 'null';

        let displayValue = String(value);
        if (type === 'string') displayValue = `"${value}"`;

        return (
            <div className="json-node">
                {keyName && <span className="json-key">"{keyName}": </span>}
                <span className={`json-${type}`}>{displayValue}</span>
                {!isLast && <span>,</span>}
            </div>
        );
    }

    const brackets = isArray ? ['[', ']'] : ['{', '}'];
    const keys = Object.keys(value);
    const itemCount = keys.length;

    return (
        <div className="json-node">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {!isEmpty && (
                    <span className="collapser" onClick={toggle}>
                        {expanded ? '▼' : '▶'}
                    </span>
                )}
                {keyName && <span className="json-key">"{keyName}": </span>}
                <span>{brackets[0]}</span>
                {!expanded && !isEmpty && (
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8em', marginLeft: '0.5rem' }}>
                        {isArray ? `Array(${itemCount})` : `Object{${itemCount}}`} ... {brackets[1]}
                        {!isLast && <span>,</span>}
                    </span>
                )}
                {isEmpty && (
                    <span>
                        {brackets[1]}
                        {!isLast && <span>,</span>}
                    </span>
                )}
            </div>

            {expanded && !isEmpty && (
                <div className="json-block">
                    {keys.map((key, index) => (
                        <JsonNode
                            key={key}
                            keyName={isArray ? null : key}
                            value={value[key]}
                            isLast={index === itemCount - 1}
                            level={level + 1}
                        />
                    ))}
                    <div>{brackets[1]}{!isLast && <span>,</span>}</div>
                </div>
            )}
        </div>
    );
};

const JsonViewer = ({ data }) => {
    if (data === null || data === undefined) {
        return <div className="text-secondary">No JSON data to display</div>;
    }

    return (
        <div className="json-tree">
            <JsonNode value={data} isLast={true} />
        </div>
    );
};

export default JsonViewer;

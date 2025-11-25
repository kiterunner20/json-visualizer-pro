import React, { useState, useEffect } from 'react';

const JsonNode = ({ keyName, value, isLast, level = 0, searchTerm, expandAll }) => {
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        setExpanded(expandAll);
    }, [expandAll]);

    const toggle = () => setExpanded(!expanded);

    const isObject = value !== null && typeof value === 'object';
    const isArray = Array.isArray(value);
    const isEmpty = isObject && Object.keys(value).length === 0;

    const highlightText = (text) => {
        if (!searchTerm || !text) return text;
        const regex = new RegExp(`(${ searchTerm })`, 'gi');
        const parts = String(text).split(regex);
        return parts.map((part, i) =>
            regex.test(part) ?
                <mark key={i} style={{ background: 'var(--accent-color)', color: 'var(--bg-primary)', padding: '0 2px', borderRadius: '2px' }}>{part}</mark> :
                part
        );
    };

    const matchesSearch = (key, val) => {
        if (!searchTerm) return false;
        const term = searchTerm.toLowerCase();
        if (key && String(key).toLowerCase().includes(term)) return true;
        if (val !== null && typeof val !== 'object' && String(val).toLowerCase().includes(term)) return true;
        return false;
    };

    if (!isObject) {
        let type = typeof value;
        if (value === null) type = 'null';

        let displayValue = String(value);
        if (type === 'string') displayValue = `"${value}"`;

        const isMatch = matchesSearch(keyName, value);

        return (
            <div className="json-node" style={isMatch ? { background: 'rgba(56, 189, 248, 0.1)' } : {}}>
                {keyName && <span className="json-key">"{highlightText(keyName)}": </span>}
                <span className={`json - ${ type } `}>{highlightText(displayValue)}</span>
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
                {keyName && <span className="json-key">"{highlightText(keyName)}": </span>}
                <span>{brackets[0]}</span>
                {!expanded && !isEmpty && (
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8em', marginLeft: '0.5rem' }}>
                        {isArray ? `Array(${ itemCount })` : `Object{${ itemCount } } `} ... {brackets[1]}
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
                            searchTerm={searchTerm}
                            expandAll={expandAll}
                        />
                    ))}
                    <div>{brackets[1]}{!isLast && <span>,</span>}</div>
                </div>
            )}
        </div>
    );
};

const JsonViewer = ({ data, searchTerm, expandAll }) => {
    if (data === null || data === undefined) {
        return <div className="text-secondary">No JSON data to display</div>;
    }

    return (
        <div className="json-tree">
            <JsonNode value={data} isLast={true} searchTerm={searchTerm} expandAll={expandAll} />
        </div>
    );
};

export default JsonViewer;

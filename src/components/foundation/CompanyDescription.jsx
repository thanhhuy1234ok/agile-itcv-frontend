import React, { useState, useRef, useEffect } from 'react';
import '@/styles/markdown.scss';
const CompanyDescription = ({ html }) => {
    const [expanded, setExpanded] = useState(false);
    const [needToggle, setNeedToggle] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const el = contentRef.current;
        if (el && el.scrollHeight > el.clientHeight) {
            setNeedToggle(true);
        }
    }, [html]);

    return (
        <div>
            <div
                className={`markdown-preview1 ${expanded ? 'expanded' : ''}`}
                dangerouslySetInnerHTML={{ __html: html }}
                ref={contentRef}
            />
            {needToggle && (
                <span
                    onClick={() => setExpanded(!expanded)}
                    style={{ color: '#2563eb', cursor: 'pointer', display: 'inline-block', marginTop: 8 }}
                >
                    {expanded ? 'Thu gọn ▲' : 'Xem thêm ▼'}
                </span>
            )}
        </div>
    );
};

export default CompanyDescription;

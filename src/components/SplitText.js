import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * SplitText
 * Component chia text thành từng chữ / từ và animate khi vào viewport.
 * Không dùng GSAP để tránh thêm dependency, nhưng API gần giống ví dụ bạn đưa.
 */
function SplitText({
  text,
  className = '',
  delay = 100, // ms giữa các phần tử
  duration = 0.6, // giây
  ease = 'ease-out',
  splitType = 'chars', // 'chars' | 'words'
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'left',
  onLetterAnimationComplete,
}) {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const tokens =
    splitType === 'words'
      ? text.split(/(\s+)/) // giữ khoảng trắng
      : Array.from(text); // chars

  const total = tokens.length;

  useEffect(() => {
    if (!visible || !onLetterAnimationComplete) return;

    const timeout = setTimeout(() => {
      onLetterAnimationComplete();
    }, delay * total + duration * 1000);

    return () => clearTimeout(timeout);
  }, [visible, onLetterAnimationComplete, delay, total, duration]);

  const buildTransform = ({ x = 0, y = 0, scale = 1 }) =>
    `translate3d(${x}px, ${y}px, 0) scale(${scale})`;

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ display: 'inline-block', textAlign }}
    >
      {tokens.map((token, index) => {
        // Bỏ animate cho khoảng trắng khi splitType = 'words'
        const isSpace = token.match(/^\s+$/);
        if (isSpace) {
          return (
            <span key={index}>
              {token}
            </span>
          );
        }

        const initialStyle = {
          opacity: from.opacity ?? 1,
          transform: buildTransform(from),
        };

        const finalStyle = {
          opacity: to.opacity ?? 1,
          transform: buildTransform(to),
        };

        const transitionDelay = (delay * index) / 1000; // s

        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              whiteSpace: 'pre',
              ...(visible ? finalStyle : initialStyle),
              transitionProperty: 'opacity, transform',
              transitionDuration: `${duration}s`,
              transitionTimingFunction: ease,
              transitionDelay: `${transitionDelay}s`,
            }}
          >
            {token}
          </span>
        );
      })}
    </span>
  );
}

SplitText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  ease: PropTypes.string,
  splitType: PropTypes.oneOf(['chars', 'words']),
  from: PropTypes.object,
  to: PropTypes.object,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  onLetterAnimationComplete: PropTypes.func,
};

export default SplitText;



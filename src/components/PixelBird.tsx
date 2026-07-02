import { useEffect, useRef, useState } from "react";

type BirdPosition = {
  x: number;
  y: number;
};

const BIRD_WIDTH = 44;
const BIRD_HEIGHT = 32;

const getRandomPosition = (): BirdPosition => ({
  x: Math.max(16, Math.random() * (window.innerWidth - BIRD_WIDTH - 32) + 16),
  y: Math.max(88, Math.random() * (window.innerHeight * 0.55) + 56),
});

const getHeadingPerches = (): BirdPosition[] => {
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>(
      "main section h1, main section h2, main [id] h1, main [id] h2"
    )
  );

  return headings
    .map((heading) => {
      const rect = heading.getBoundingClientRect();

      if (rect.width <= 0 || rect.height <= 0) {
        return null;
      }

      return {
        x: Math.min(
          window.innerWidth - BIRD_WIDTH - 12,
          Math.max(12, rect.left + rect.width / 2 - BIRD_WIDTH / 2)
        ),
        y: Math.max(72, rect.top - BIRD_HEIGHT - 8),
      };
    })
    .filter((position): position is BirdPosition => Boolean(position));
};

const PixelBird = () => {
  const [position, setPosition] = useState<BirdPosition>({ x: 48, y: 112 });
  const [isFlying, setIsFlying] = useState(true);
  const [isFacingLeft, setIsFacingLeft] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const lastX = useRef(position.x);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotionQuery.matches) {
      return;
    }

    setShouldRender(true);
    setPosition(getRandomPosition());
  }, []);

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    let flightTimer: number | undefined;
    let perchTimer: number | undefined;

    const chooseNextStop = () => {
      const perches = getHeadingPerches();
      const shouldPerch = perches.length > 0 && Math.random() > 0.28;
      const nextPosition = shouldPerch
        ? perches[Math.floor(Math.random() * perches.length)]
        : getRandomPosition();

      setIsFlying(true);
      setIsFacingLeft(nextPosition.x < lastX.current);
      lastX.current = nextPosition.x;
      setPosition(nextPosition);

      flightTimer = window.setTimeout(() => {
        setIsFlying(false);
      }, 2200);

      perchTimer = window.setTimeout(chooseNextStop, 4200 + Math.random() * 2800);
    };

    perchTimer = window.setTimeout(chooseNextStop, 900);

    return () => {
      window.clearTimeout(flightTimer);
      window.clearTimeout(perchTimer);
    };
  }, [shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`pixel-bird ${isFlying ? "pixel-bird--flying" : "pixel-bird--perched"}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div className={`pixel-bird__sprite ${isFacingLeft ? "pixel-bird__sprite--left" : ""}`}>
        <span className="pixel-bird__tail" />
        <span className="pixel-bird__body" />
        <span className="pixel-bird__belly" />
        <span className="pixel-bird__head" />
        <span className="pixel-bird__eye" />
        <span className="pixel-bird__beak" />
        <span className="pixel-bird__wing" />
        <span className="pixel-bird__feet" />
      </div>
      <style>{`
        .pixel-bird {
          position: fixed;
          left: 0;
          top: 0;
          width: ${BIRD_WIDTH}px;
          height: ${BIRD_HEIGHT}px;
          pointer-events: none;
          z-index: 35;
          transition: transform 2.2s cubic-bezier(0.45, 0, 0.2, 1);
          will-change: transform;
        }

        .pixel-bird__sprite {
          position: relative;
          width: ${BIRD_WIDTH}px;
          height: ${BIRD_HEIGHT}px;
          image-rendering: pixelated;
          transform-origin: 50% 50%;
          filter: drop-shadow(2px 3px 0 rgba(0, 0, 0, 0.14));
        }

        .pixel-bird__sprite--left {
          transform: scaleX(-1);
        }

        .pixel-bird--flying .pixel-bird__sprite {
          animation: pixel-bird-bob 0.42s steps(2, end) infinite;
        }

        .pixel-bird--perched .pixel-bird__sprite {
          animation: pixel-bird-idle 1.5s steps(2, end) infinite;
        }

        .pixel-bird__body,
        .pixel-bird__belly,
        .pixel-bird__head,
        .pixel-bird__tail,
        .pixel-bird__wing,
        .pixel-bird__eye,
        .pixel-bird__beak,
        .pixel-bird__feet {
          position: absolute;
          display: block;
          box-sizing: border-box;
        }

        .pixel-bird__body {
          left: 12px;
          top: 12px;
          width: 20px;
          height: 12px;
          background: hsl(var(--accent-blue));
          box-shadow:
            4px -4px 0 hsl(var(--accent-blue)),
            8px 8px 0 hsl(var(--accent-teal));
        }

        .pixel-bird__belly {
          left: 20px;
          top: 20px;
          width: 12px;
          height: 8px;
          background: hsl(var(--swiss-pure));
        }

        .pixel-bird__head {
          left: 28px;
          top: 8px;
          width: 12px;
          height: 12px;
          background: hsl(var(--accent-aqua));
          box-shadow: -4px 4px 0 hsl(var(--accent-blue));
        }

        .pixel-bird__eye {
          left: 36px;
          top: 12px;
          width: 4px;
          height: 4px;
          background: hsl(var(--swiss-charcoal));
        }

        .pixel-bird__beak {
          left: 40px;
          top: 16px;
          width: 8px;
          height: 4px;
          background: hsl(var(--accent-orange));
          box-shadow: 4px 4px 0 hsl(var(--accent-orange));
        }

        .pixel-bird__tail {
          left: 4px;
          top: 16px;
          width: 12px;
          height: 8px;
          background: hsl(var(--accent-teal));
          box-shadow: -4px -4px 0 hsl(var(--accent-teal));
        }

        .pixel-bird__wing {
          left: 16px;
          top: 8px;
          width: 12px;
          height: 12px;
          background: hsl(var(--swiss-charcoal));
          transform-origin: 10px 12px;
        }

        .pixel-bird--flying .pixel-bird__wing {
          animation: pixel-bird-flap 0.24s steps(2, end) infinite;
        }

        .pixel-bird--perched .pixel-bird__wing {
          top: 14px;
          height: 8px;
          background: hsl(var(--swiss-gray));
        }

        .pixel-bird__feet {
          left: 20px;
          top: 28px;
          width: 4px;
          height: 4px;
          background: hsl(var(--accent-orange));
          box-shadow: 8px 0 0 hsl(var(--accent-orange));
        }

        @keyframes pixel-bird-flap {
          0%, 100% {
            top: 4px;
            height: 16px;
          }
          50% {
            top: 16px;
            height: 8px;
          }
        }

        @keyframes pixel-bird-bob {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -4px; }
        }

        @keyframes pixel-bird-idle {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 2px; }
        }
      `}</style>
    </div>
  );
};

export default PixelBird;

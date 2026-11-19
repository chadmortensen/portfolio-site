import { useEffect, useMemo, useRef, useState } from "react";
import heroWeatherBackgrounds from "../../data/hero-weather-backgrounds.json";
import { navigateToSection } from "@/lib/section-navigation";
import {
  ArrowDown,
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  Snowflake,
  Sun,
} from "lucide-react";

type WeatherSummary = {
  temperature: number;
  condition: string;
  isDay: boolean;
};

type HeroTextTheme = "dark" | "light";
type HeroOverlayTheme = "dark" | "light";
type HeroMediaType = "image" | "video";

type WeatherBackgroundEntry = {
  src: string;
  mediaType?: HeroMediaType;
  playbackRate?: number;
  textTheme?: HeroTextTheme;
  overlay?: boolean;
  overlayTheme?: HeroOverlayTheme;
  overlayIntensity?: number;
};

type WeatherBackgroundInput = string | WeatherBackgroundEntry;

type WeatherBackgroundConfig = {
  fallback: WeatherBackgroundInput;
  freezingTemperatureF: number;
  // Months (1-12, Portland time) when sunny days use the "sunnyWinter" photos.
  winterMonths?: number[];
  backgrounds: Record<string, WeatherBackgroundInput[]>;
};

type WeatherBackgroundPreview = WeatherBackgroundEntry & {
  designation: string;
};

const PORTLAND_WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=45.5152&longitude=-122.6784&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles&forecast_days=1";
const PORTLAND_TIME_ZONE = "America/Los_Angeles";
// If the weather hasn't arrived by then, choose a background from the time of day instead of waiting.
const WEATHER_WAIT_MS = 1500;

type PortlandWeatherResponse = {
  current?: {
    temperature_2m: number;
    weather_code: number;
    is_day: number;
  };
};

declare global {
  interface Window {
    // Started early by an inline script in index.html so it runs in parallel with the JS download.
    __portlandWeather?: Promise<PortlandWeatherResponse | null>;
  }
}

const requestPortlandWeather = () => {
  if (!window.__portlandWeather) {
    window.__portlandWeather = fetch(PORTLAND_WEATHER_URL)
      .then((response) => (response.ok ? response.json() : null))
      .catch(() => null);
  }

  return window.__portlandWeather;
};

// Hero layouts while we compare them:
// - "classic": full-bleed photo behind the text
// - "print": text on the page gradient, photo in a tilted white print on the right
// Pick one with ?hero=classic|print, or press Shift+Up/Down on the page to switch.
// The choice is remembered in this browser.
type HeroLayout = "classic" | "print";
const HERO_LAYOUTS: HeroLayout[] = ["classic", "print"];
const DEFAULT_HERO_LAYOUT: HeroLayout = "print";
const HERO_LAYOUT_STORAGE_KEY = "hero-layout";

const isHeroLayout = (value: unknown): value is HeroLayout =>
  HERO_LAYOUTS.includes(value as HeroLayout);

// Earlier names for the framed layout while we were trying versions of it.
const normalizeHeroLayout = (value: string | null) =>
  value === "framed" || value === "polaroid" ? "print" : value;

const getInitialHeroLayout = (): HeroLayout => {
  try {
    const fromUrl = normalizeHeroLayout(new URLSearchParams(window.location.search).get("hero"));
    if (isHeroLayout(fromUrl)) {
      window.localStorage.setItem(HERO_LAYOUT_STORAGE_KEY, fromUrl);
      return fromUrl;
    }

    const stored = normalizeHeroLayout(window.localStorage.getItem(HERO_LAYOUT_STORAGE_KEY));
    if (isHeroLayout(stored)) {
      return stored;
    }
  } catch {
    // Storage can be blocked (private mode); fall through to the default.
  }

  return DEFAULT_HERO_LAYOUT;
};

const FALLBACK_BACKGROUND: WeatherBackgroundEntry = {
  src: "/img/hero-back-sunny1.jpg",
  mediaType: "image",
  textTheme: "dark",
};

const DEFAULT_BACKGROUND_CONFIG: WeatherBackgroundConfig = {
  fallback: FALLBACK_BACKGROUND,
  freezingTemperatureF: 40,
  backgrounds: {
    sunny: [FALLBACK_BACKGROUND],
  },
};

const getWeatherCondition = (weatherCode: number, isDay: boolean) => {
  if (weatherCode === 0) {
    return isDay ? "sunny" : "clear";
  }

  if ([1, 2].includes(weatherCode)) {
    return isDay ? "partly sunny" : "partly cloudy";
  }

  if (weatherCode === 3) {
    return "cloudy";
  }

  if ([45, 48].includes(weatherCode)) {
    return "misty";
  }

  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return "drizzly";
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return "rainy";
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return "snowy";
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return "stormy";
  }

  return "lovely";
};

const getPortlandHour = () => {
  const formattedHour = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: PORTLAND_TIME_ZONE,
  }).format(new Date());

  return Number(formattedHour);
};

const getPortlandMonth = () => Number(
  new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    timeZone: PORTLAND_TIME_ZONE,
  }).format(new Date())
);

const DEFAULT_WINTER_MONTHS = [11, 12, 1, 2, 3];

// Sunny days from November to March use winter photos (bare trees, evergreens)
// instead of the summer ones, when the config has any.
const getSeasonalDesignation = (designation: string, config: WeatherBackgroundConfig) => {
  if (designation !== "sunny" || !(config.backgrounds.sunnyWinter?.length)) {
    return designation;
  }

  const winterMonths = config.winterMonths ?? DEFAULT_WINTER_MONTHS;
  return winterMonths.includes(getPortlandMonth()) ? "sunnyWinter" : designation;
};

const getPortlandGreeting = () => {
  const hour = getPortlandHour();

  if (hour < 12) {
    return "Good morning, I'm";
  }

  if (hour < 17) {
    return "Good afternoon, I'm";
  }

  return "Good evening, I'm";
};

const getTimeOfDayDesignation = () => {
  const hour = getPortlandHour();
  return hour < 7 || hour >= 19 ? "night" : "sunny";
};

const getFallbackWeather = (): WeatherSummary => ({
  temperature: 78,
  condition: "sunny",
  isDay: true,
});

const getWeatherPreview = (designation: string): WeatherSummary => {
  switch (designation) {
    case "night":
      return { temperature: 58, condition: "clear", isDay: false };
    case "partlySunny":
      return { temperature: 72, condition: "partly sunny", isDay: true };
    case "cloudy":
      return { temperature: 64, condition: "cloudy", isDay: true };
    case "lightRain":
      return { temperature: 58, condition: "drizzly", isDay: true };
    case "rain":
      return { temperature: 55, condition: "rainy", isDay: true };
    case "stormy":
      return { temperature: 60, condition: "stormy", isDay: true };
    case "snow":
      return { temperature: 34, condition: "snowy", isDay: true };
    case "freezing":
      return { temperature: 28, condition: "clear", isDay: true };
    case "sunnyWinter":
      return { temperature: 48, condition: "sunny", isDay: true };
    default:
      return { temperature: 78, condition: "sunny", isDay: true };
  }
};

const getWeatherDesignation = (
  condition: string,
  temperature: number,
  freezingTemperatureF: number,
  isDay: boolean
) => {
  if (!isDay) {
    return "night";
  }

  if (temperature < freezingTemperatureF) {
    return "freezing";
  }

  if (condition === "partly sunny" || condition === "partly cloudy") {
    return "partlySunny";
  }

  if (condition === "cloudy" || condition === "misty") {
    return "cloudy";
  }

  if (condition.includes("drizzl")) {
    return "lightRain";
  }

  if (condition.includes("rain")) {
    return "rain";
  }

  if (condition === "stormy") {
    return "stormy";
  }

  if (condition === "snowy") {
    return "snow";
  }

  return "sunny";
};

const normalizeBackgroundEntry = (
  entry: WeatherBackgroundInput,
  inheritedTextTheme: HeroTextTheme = "dark"
): WeatherBackgroundEntry => {
  if (typeof entry === "string") {
    return {
      src: entry,
      textTheme: inheritedTextTheme,
    };
  }

  return {
    src: entry.src,
    mediaType: entry.mediaType ?? "image",
    playbackRate: entry.playbackRate,
    textTheme: entry.textTheme ?? inheritedTextTheme,
    overlay: entry.overlay ?? false,
    overlayTheme: entry.overlayTheme ?? "dark",
    overlayIntensity: entry.overlayIntensity,
  };
};

const getOverlayRgb = (theme?: HeroOverlayTheme) => theme === "light" ? "255 255 255" : "0 0 0";

const clampOverlayIntensity = (intensity?: number) => {
  if (typeof intensity !== "number" || Number.isNaN(intensity)) {
    return 0.3;
  }

  return Math.min(Math.max(intensity, 0), 1);
};

const getPreviewEntries = (config: WeatherBackgroundConfig) => {
  const fallback = normalizeBackgroundEntry(config.fallback);

  return Object.entries(config.backgrounds).flatMap(([designation, entries]) =>
    entries
      .map((entry) => normalizeBackgroundEntry(entry, fallback.textTheme))
      .filter((entry) => Boolean(entry.src))
      .map((entry) => ({
        ...entry,
        designation,
      }))
  );
};

const getRotatedImageCandidates = (
  config: WeatherBackgroundConfig,
  designation: string
) => {
  const fallback = normalizeBackgroundEntry(config.fallback);
  const images = (config.backgrounds[designation] ?? [])
    .map((entry) => normalizeBackgroundEntry(entry, fallback.textTheme))
    .filter((entry) => Boolean(entry.src));
  const fallbackImages = (config.backgrounds[getSeasonalDesignation("sunny", config)] ?? [])
    .map((entry) => normalizeBackgroundEntry(entry, fallback.textTheme))
    .filter((entry) => Boolean(entry.src));
  const candidates = [...images, ...fallbackImages, fallback, FALLBACK_BACKGROUND];
  const uniqueCandidates = candidates.filter(
    (entry, index, entries) => entries.findIndex((candidate) => candidate.src === entry.src) === index
  );

  if (images.length < 2) {
    return uniqueCandidates;
  }

  const dayIndex = Math.floor(Date.now() / 86_400_000) % images.length;
  return [
    ...images.slice(dayIndex),
    ...images.slice(0, dayIndex),
    ...uniqueCandidates.filter((entry) => !images.some((image) => image.src === entry.src)),
  ];
};

const isImageAvailable = (src: string) =>
  new Promise<boolean>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });

const isVideoAvailable = (src: string) =>
  new Promise<boolean>((resolve) => {
    const video = document.createElement("video");
    video.onloadedmetadata = () => resolve(true);
    video.onerror = () => resolve(false);
    video.preload = "metadata";
    video.src = src;
    video.load();
  });

const isBackgroundAvailable = (entry: WeatherBackgroundEntry) => (
  entry.mediaType === "video" ? isVideoAvailable(entry.src) : isImageAvailable(entry.src)
);

const WeatherIcon = ({ condition, size = 48 }: { condition: string; size?: number }) => {
  const iconProps = {
    size,
    strokeWidth: 2,
    "aria-hidden": true,
  };

  if (condition.includes("rain") || condition.includes("drizzl")) {
    return <CloudRain {...iconProps} />;
  }

  if (condition === "snowy") {
    return <Snowflake {...iconProps} />;
  }

  if (condition === "stormy") {
    return <CloudLightning {...iconProps} />;
  }

  if (condition === "misty") {
    return <CloudFog {...iconProps} />;
  }

  if (condition === "cloudy" || condition === "partly cloudy") {
    return <Cloud {...iconProps} />;
  }

  if (condition === "partly sunny") {
    return <CloudSun {...iconProps} />;
  }

  return <Sun {...iconProps} />;
};

const Hero = () => {
  const [weather, setWeather] = useState<WeatherSummary | null>(null);
  const [heroLayout, setHeroLayout] = useState<HeroLayout>(getInitialHeroLayout);
  const [heroGreeting, setHeroGreeting] = useState(getPortlandGreeting);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const backgroundConfig = useMemo<WeatherBackgroundConfig>(() => ({
    ...DEFAULT_BACKGROUND_CONFIG,
    ...heroWeatherBackgrounds,
    backgrounds: {
      ...DEFAULT_BACKGROUND_CONFIG.backgrounds,
      ...heroWeatherBackgrounds.backgrounds,
    },
  }), []);
  const [activeBackground, setActiveBackground] = useState<WeatherBackgroundEntry | null>(null);
  // Chosen once per visit: the weather designation if it arrives quickly, otherwise a time-of-day guess.
  // Locking it avoids swapping the photo after it has already appeared.
  const [backgroundDesignation, setBackgroundDesignation] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const previewEntries = useMemo(() => getPreviewEntries(backgroundConfig), [backgroundConfig]);
  const previewWeather = previewIndex !== null ? getWeatherPreview(previewEntries[previewIndex]?.designation) : null;
  const displayedWeather = previewWeather ?? weather ?? getFallbackWeather();
  const weatherDesignation = useMemo(
    () => weather
      ? getWeatherDesignation(
        weather.condition,
        weather.temperature,
        backgroundConfig.freezingTemperatureF,
        weather.isDay
      )
      : null,
    [backgroundConfig.freezingTemperatureF, weather]
  );

  useEffect(() => {
    let isMounted = true;

    requestPortlandWeather().then((data) => {
      if (!isMounted) {
        return;
      }

      // On failure, leave weather unset: the bar shows fallback text and the
      // background falls back to a time-of-day guess after WEATHER_WAIT_MS.
      if (!data?.current) {
        return;
      }

      const isDay = Boolean(data.current.is_day);
      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        condition: getWeatherCondition(data.current.weather_code, isDay),
        isDay,
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (weatherDesignation) {
      setBackgroundDesignation((current) => current ?? getSeasonalDesignation(weatherDesignation, backgroundConfig));
      return;
    }

    const timeout = window.setTimeout(() => {
      setBackgroundDesignation((current) => current ?? getSeasonalDesignation(getTimeOfDayDesignation(), backgroundConfig));
    }, WEATHER_WAIT_MS);

    return () => window.clearTimeout(timeout);
  }, [backgroundConfig, weatherDesignation]);

  useEffect(() => {
    const greetingInterval = window.setInterval(() => {
      setHeroGreeting(getPortlandGreeting());
    }, 60_000);

    return () => window.clearInterval(greetingInterval);
  }, []);

  useEffect(() => {
    if (previewIndex !== null || !backgroundDesignation) {
      return;
    }

    let isMounted = true;
    const candidates = getRotatedImageCandidates(backgroundConfig, backgroundDesignation);

    const applyFirstAvailableBackground = async () => {
      for (const candidate of candidates) {
        const isAvailable = await isBackgroundAvailable(candidate);

        if (!isMounted) {
          return;
        }

        if (isAvailable) {
          setActiveBackground(candidate);
          return;
        }
      }

      setActiveBackground(FALLBACK_BACKGROUND);
    };

    applyFirstAvailableBackground();

    return () => {
      isMounted = false;
    };
  }, [backgroundConfig, previewIndex, backgroundDesignation]);

  useEffect(() => {
    const shouldIgnoreShortcut = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        return false;
      }

      return target.isContentEditable || Boolean(target.closest("input, textarea, select, [role='textbox']"));
    };

    const previewBackground = async (direction: 1 | -1) => {
      if (previewEntries.length === 0) {
        return;
      }

      const activeIndex = activeBackground
        ? previewEntries.findIndex((entry) => entry.src === activeBackground.src)
        : -1;
      const startIndex = previewIndex ?? activeIndex;

      for (let offset = 1; offset <= previewEntries.length; offset += 1) {
        const nextIndex = (startIndex + direction * offset + previewEntries.length) % previewEntries.length;
        const candidate = previewEntries[nextIndex];
        const isAvailable = await isBackgroundAvailable(candidate);

        if (isAvailable) {
          setPreviewIndex(nextIndex);
          setActiveBackground(candidate);
          return;
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        !event.shiftKey || event.altKey || event.ctrlKey || event.metaKey ||
        event.defaultPrevented || shouldIgnoreShortcut(event.target)
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        previewBackground(1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previewBackground(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeBackground, previewEntries, previewIndex]);

  useEffect(() => {
    const handleLayoutKey = (event: KeyboardEvent) => {
      if (!event.shiftKey || event.altKey || event.ctrlKey || event.metaKey || event.defaultPrevented) {
        return;
      }

      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest("input, textarea, select, [role='textbox']"))) {
        return;
      }

      if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
        return;
      }

      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setHeroLayout((current) => {
        const next = HERO_LAYOUTS[(HERO_LAYOUTS.indexOf(current) + step + HERO_LAYOUTS.length) % HERO_LAYOUTS.length];
        try {
          window.localStorage.setItem(HERO_LAYOUT_STORAGE_KEY, next);
        } catch {
          // Ignore blocked storage; the toggle still works for this visit.
        }
        return next;
      });
    };

    window.addEventListener("keydown", handleLayoutKey);
    return () => window.removeEventListener("keydown", handleLayoutKey);
  }, []);

  // In the framed layout the page gradient runs from the top of the page through
  // the case studies (see html.hero-framed-active in index.css).
  useEffect(() => {
    if (heroLayout === "classic") {
      return;
    }

    const root = document.documentElement;
    const caseStudies = document.getElementById("case-studies");
    const updateGradientEnd = () => {
      if (caseStudies) {
        root.style.setProperty("--framed-gradient-end", `${caseStudies.offsetTop + caseStudies.offsetHeight}px`);
      }
    };

    root.classList.add("hero-framed-active");
    updateGradientEnd();
    const observer = new ResizeObserver(updateGradientEnd);
    observer.observe(document.body);

    return () => {
      observer.disconnect();
      root.classList.remove("hero-framed-active");
      root.style.removeProperty("--framed-gradient-end");
    };
  }, [heroLayout]);

  const heroTextClass = activeBackground?.textTheme === "light" ? "text-[#FBF4EA]" : "text-text-primary";
  const heroTextPanelClass = `hero-text-panel hero-text-panel--${activeBackground?.textTheme === "light" ? "light-text" : "dark-text"}`;
  const hasVideoBackground = activeBackground?.mediaType === "video";
  const heroSectionClass = `hero-photo-bg${activeBackground?.overlay ? " hero-photo-bg--overlay" : ""} min-h-screen bg-surface-secondary`;
  const heroStyle = activeBackground
    ? {
      "--hero-photo": hasVideoBackground ? "none" : `url("${activeBackground.src}")`,
      "--hero-overlay-rgb": getOverlayRgb(activeBackground.overlayTheme),
      "--hero-overlay-intensity": clampOverlayIntensity(activeBackground.overlayIntensity).toString(),
    } as React.CSSProperties
    : undefined;

  useEffect(() => {
    if (!videoRef.current || !activeBackground || activeBackground.mediaType !== "video") {
      return;
    }

    videoRef.current.playbackRate = activeBackground.playbackRate ?? 1;
  }, [activeBackground]);

  const scrollToAbout = () => {
    navigateToSection("#about");
  };

  const weatherLabel = `Current Portland weather: ${displayedWeather.temperature} degrees and ${displayedWeather.condition}`;
  const weatherText = (
    <p>
      {displayedWeather.temperature}&deg; and <span className="capitalize">{displayedWeather.condition}</span> in Portland, OR
    </p>
  );
  const heroSubhead = (
    <>
      I build teams. Ship products. <br />
      Stay calm when it gets messy.
      <span className="hero-aside">Let's be real, it always gets a little messy.</span>
    </>
  );
  // Hero buttons use the site-wide .btn-shadow (a button-sized version of the case study card shadow).
  const primaryButtonClass = "btn-shadow w-full rounded-[4rem] px-6 py-3 bg-text-primary text-surface-primary text-body hover:bg-swiss-gray transition-all duration-200 focus:outline-2 focus:outline-accent-blue focus:outline-offset-2";
  const secondaryButtonClass = "btn-shadow w-full rounded-[4rem] px-6 py-3 border border-swiss-light bg-surface-primary text-text-primary text-body transition-all duration-200 focus:outline-2 focus:outline-accent-blue focus:outline-offset-2";

  if (heroLayout !== "classic") {
    const framedPhotoStyle = activeBackground && !hasVideoBackground
      ? { backgroundImage: `url("${activeBackground.src}")` }
      : undefined;

    return (
      <section id="home" className="hero-framed min-h-screen bg-surface-secondary">
        <div className="hero-content fade-in hero-framed__grid">
          <div className="hero-framed__copy text-text-primary">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-title2">
                {heroGreeting}
              </p>
              <h1 className="text-display">
                Chad Mortensen
              </h1>
              <div className="h-[3px] w-[7rem] bg-current"></div>
              <p className="hero-subhead">
                {heroSubhead}
              </p>
              <p className="hero-companies !mt-8 md:!mt-12">
                Brightside Health, Etsy, Walmart
              </p>
            </div>

            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:flex-row">
              <button
                onClick={() => navigateToSection("#case-studies")}
                className={primaryButtonClass}
                aria-label="View My Work: Chad Mortensen’s case studies and design work"
              >
                View My Work
              </button>
              <button
                onClick={scrollToAbout}
                className={secondaryButtonClass}
                aria-label="More About Me: Chad Mortensen’s background and experience"
              >
                More About Me
              </button>
            </div>
          </div>

          <figure className="hero-print">
            <div className="hero-print__paper">
            <div className="hero-print__photo" style={framedPhotoStyle}>
              {hasVideoBackground && (
                <video
                  key={activeBackground.src}
                  ref={videoRef}
                  className="hero-background-video"
                  src={activeBackground.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
              )}
            </div>
            <figcaption className="hero-print__caption" aria-label={weatherLabel}>
              <WeatherIcon condition={displayedWeather.condition} size={20} />
              {weatherText}
            </figcaption>
            </div>
          </figure>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className={heroSectionClass}
      style={heroStyle}
    >
      {hasVideoBackground && (
        <video
          key={activeBackground.src}
          ref={videoRef}
          className="hero-background-video"
          src={activeBackground.src}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/70 text-[#FBF4EA] backdrop-blur-xl backdrop-saturate-150">
        <div
          className="mx-auto flex min-h-11 items-center justify-center gap-2 px-4 py-2 text-center text-base font-normal"
          aria-label={`Current Portland weather: ${displayedWeather.temperature} degrees and ${displayedWeather.condition}`}
        >
          <WeatherIcon condition={displayedWeather.condition} size={20} />
          <p>
            {displayedWeather.temperature}&deg; and <span className="capitalize">{displayedWeather.condition}</span> in Portland, OR
          </p>
        </div>
      </div>
      <div className="hero-content fade-in">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 pb-10 pt-28 text-center sm:px-6 lg:pt-32">
          <div className={`space-y-3 sm:space-y-4 ${heroTextPanelClass} ${heroTextClass}`}>
            <p className="text-title2">
              {heroGreeting}
            </p>
            <h1 className="text-display">
              Chad Mortensen
            </h1>
            <div className="mx-auto h-[3px] w-[7rem] bg-current"></div>
            <p className="hero-subhead mx-auto max-w-xxl">
              I build teams. Ship products. <br />
              Stay calm when it gets messy.
              <span className="hero-aside">Let's be real, it always gets a little messy.</span>
            </p>
            <p className="hero-companies !mt-8 md:!mt-12">
              Brightside Health, Etsy, Walmart
            </p>
          </div>

          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center">
            <button
              onClick={() => navigateToSection("#case-studies")}
              className={primaryButtonClass}
              aria-label="View My Work: Chad Mortensen’s case studies and design work"
            >
              View My Work
            </button>
            <button
              onClick={scrollToAbout}
              className={secondaryButtonClass}
              aria-label="More About Me: Chad Mortensen’s background and experience"
            >
              More About Me
            </button>
          </div>
           

          <div className="mt-10 sm:mt-12">
            <button
              onClick={scrollToAbout}
              className={`flex flex-col items-center gap-1 text-caption ${heroTextClass} transition-colors duration-200 hover:text-accent-aqua focus:outline-2 focus:outline-accent-blue focus:outline-offset-2`}
              aria-label="Scroll down to learn more about Chad Mortensen"
            >
              {/* <span>Scroll to explore</span> */}
              <ArrowDown size={32} className="animate-bounce hero-scroll-arrow" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

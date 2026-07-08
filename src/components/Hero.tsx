import { useEffect, useMemo, useState } from "react";
import heroWeatherBackgrounds from "../../data/hero-weather-backgrounds.json";
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
};

type HeroTextTheme = "dark" | "light";
type HeroOverlayTheme = "dark" | "light";

type WeatherBackgroundEntry = {
  src: string;
  textTheme?: HeroTextTheme;
  overlay?: boolean;
  overlayTheme?: HeroOverlayTheme;
  overlayIntensity?: number;
};

type WeatherBackgroundInput = string | WeatherBackgroundEntry;

type WeatherBackgroundConfig = {
  fallback: WeatherBackgroundInput;
  freezingTemperatureF: number;
  backgrounds: Record<string, WeatherBackgroundInput[]>;
};

type WeatherBackgroundPreview = WeatherBackgroundEntry & {
  designation: string;
};

const PORTLAND_WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=45.5152&longitude=-122.6784&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles&forecast_days=1";

const FALLBACK_BACKGROUND: WeatherBackgroundEntry = {
  src: "/img/hero-back-sunny1.jpg",
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

const getFallbackWeather = (): WeatherSummary => ({
  temperature: 78,
  condition: "sunny",
});

const getWeatherPreview = (designation: string): WeatherSummary => {
  switch (designation) {
    case "partlySunny":
      return { temperature: 72, condition: "partly sunny" };
    case "cloudy":
      return { temperature: 64, condition: "cloudy" };
    case "lightRain":
      return { temperature: 58, condition: "drizzly" };
    case "rain":
      return { temperature: 55, condition: "rainy" };
    case "stormy":
      return { temperature: 60, condition: "stormy" };
    case "snow":
      return { temperature: 34, condition: "snowy" };
    case "freezing":
      return { temperature: 28, condition: "clear" };
    default:
      return { temperature: 78, condition: "sunny" };
  }
};

const getWeatherDesignation = (
  condition: string,
  temperature: number,
  freezingTemperatureF: number
) => {
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
  const fallbackImages = (config.backgrounds.sunny ?? [])
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

const WeatherIcon = ({ condition }: { condition: string }) => {
  const iconProps = {
    size: 48,
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
  const backgroundConfig = useMemo<WeatherBackgroundConfig>(() => ({
    ...DEFAULT_BACKGROUND_CONFIG,
    ...heroWeatherBackgrounds,
    backgrounds: {
      ...DEFAULT_BACKGROUND_CONFIG.backgrounds,
      ...heroWeatherBackgrounds.backgrounds,
    },
  }), []);
  const [activeBackground, setActiveBackground] = useState<WeatherBackgroundEntry | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const previewEntries = useMemo(() => getPreviewEntries(backgroundConfig), [backgroundConfig]);
  const previewWeather = previewIndex !== null ? getWeatherPreview(previewEntries[previewIndex]?.designation) : null;
  const displayedWeather = previewWeather ?? weather ?? getFallbackWeather();
  const weatherDesignation = useMemo(
    () => weather
      ? getWeatherDesignation(
        weather.condition,
        weather.temperature,
        backgroundConfig.freezingTemperatureF
      )
      : null,
    [backgroundConfig.freezingTemperatureF, weather]
  );

  useEffect(() => {
    const controller = new AbortController();

    const loadWeather = async () => {
      try {
        const response = await fetch(PORTLAND_WEATHER_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load Portland weather.");
        }

        const data = await response.json();
        const temperature = Math.round(data.current.temperature_2m);
        const condition = getWeatherCondition(
          data.current.weather_code,
          Boolean(data.current.is_day)
        );

        setWeather({
          temperature,
          condition,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setWeather(getFallbackWeather());
      }
    };

    loadWeather();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (previewIndex !== null || !weatherDesignation) {
      return;
    }

    let isMounted = true;
    const candidates = getRotatedImageCandidates(backgroundConfig, weatherDesignation);

    const applyFirstAvailableBackground = async () => {
      for (const candidate of candidates) {
        const isAvailable = await isImageAvailable(candidate.src);

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
  }, [backgroundConfig, previewIndex, weatherDesignation]);

  useEffect(() => {
    const shouldIgnoreShortcut = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        return false;
      }

      return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
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
        const isAvailable = await isImageAvailable(candidate.src);

        if (isAvailable) {
          setPreviewIndex(nextIndex);
          setActiveBackground(candidate);
          return;
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (shouldIgnoreShortcut(event.target)) {
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

  const heroTextClass = activeBackground?.textTheme === "light" ? "text-[#FBF4EA]" : "text-text-primary";
  const heroSectionClass = `hero-photo-bg${activeBackground?.overlay ? " hero-photo-bg--overlay" : ""} min-h-screen bg-surface-secondary`;
  const heroStyle = activeBackground
    ? {
      "--hero-photo": `url("${activeBackground.src}")`,
      "--hero-overlay-rgb": getOverlayRgb(activeBackground.overlayTheme),
      "--hero-overlay-intensity": clampOverlayIntensity(activeBackground.overlayIntensity).toString(),
    } as React.CSSProperties
    : undefined;

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="home"
      className={heroSectionClass}
      style={heroStyle}
    >
      <div className="hero-content fade-in">
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-4 pb-10 pt-28 text-center sm:px-6 lg:pt-32">
          <div className="space-y-3 sm:space-y-4">
            <p className={`text-title2 ${heroTextClass}`}>
              Hi, I&apos;m
            </p>
            <h1 className={`text-display ${heroTextClass}`}>
              Chad Mortensen
            </h1>
            <div className="mx-auto h-[3px] w-[7rem] bg-black"></div>
            <p className={`text-title2 mx-auto max-w-3xl ${heroTextClass}`}>
              My work blends human-centered craft with strategic clarity to move people and products forward.
            </p>
          </div>

          <div className={`mt-8 flex items-center justify-center gap-4 ${heroTextClass} sm:mt-10 sm:gap-5`}>
            <div className="shrink-0" aria-label={`Current Portland weather: ${displayedWeather.condition}`}>
              <WeatherIcon condition={displayedWeather.condition} />
            </div>
            <div className="text-left">
              <p className="text-headline font-medium leading-none tracking-normal">
                {displayedWeather.temperature}&deg;
              </p>
              <p className="mt-1 text-[1.1rem] font-normal capitalize leading-[1.2rem]">{displayedWeather.condition}</p>
              <p className="text-[1.1rem] font-normal leading-[1.2rem]">Portland, OR</p>
            </div>
          </div>

          <div className="mt-8 flex w-full max-w-2xl flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center">
            <button
              onClick={scrollToAbout}
              className="w-full rounded px-6 py-3 bg-text-primary text-surface-primary text-body hover:bg-swiss-gray transition-all duration-200 focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
              aria-label="Learn more about Chad Mortensen's background and experience"
            >
              More About Me
            </button>
            <button
              onClick={() => document.querySelector("#case-studies")?.scrollIntoView({
                behavior: "smooth"
              })}
              className="w-full rounded px-6 py-3 border border-swiss-charcoal bg-white/100 text-text-primary text-body hover:bg-white transition-all duration-200 focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
              aria-label="View Chad Mortensen's case studies and design work"
            >
              View My Work
            </button>
          </div>

          <div className="mt-10 sm:mt-12">
            <button
              onClick={scrollToAbout}
              className={`flex flex-col items-center gap-1 text-caption ${heroTextClass} transition-colors duration-200 hover:text-accent-aqua focus:outline-2 focus:outline-accent-blue focus:outline-offset-2`}
              aria-label="Scroll down to learn more about Chad Mortensen"
            >
              <span>Scroll to explore</span>
              <ArrowDown size={22} className="animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

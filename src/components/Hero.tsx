import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

type WeatherSummary = {
  temperature: number;
  condition: string;
  activity: string;
};

const PORTLAND_WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=45.5152&longitude=-122.6784&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles&forecast_days=1";

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

const getPositiveActivity = (temperature: number, condition: string) => {
  if (condition.includes("rain") || condition.includes("drizzl")) {
    return "My garden is going to love this rain!";
  }

  if (condition === "snowy") {
    return "Perfect weather for a cozy coffee and a long idea walk.";
  }

  if (condition === "stormy") {
    return "A dramatic sky always makes the city feel cinematic.";
  }

  if (temperature >= 76 && ["sunny", "partly sunny", "lovely"].includes(condition)) {
    return "Time for a dip in the river!";
  }

  if (temperature >= 68) {
    return "Excellent conditions for a walk through the neighborhood.";
  }

  if (condition === "cloudy" || condition === "misty" || condition === "partly cloudy") {
    return "Great light for a thoughtful stroll and a good cup of coffee.";
  }

  if (temperature <= 45) {
    return "A fine excuse to layer up and enjoy the crisp air.";
  }

  return "A beautiful day to get outside for a bit.";
};

const getFallbackWeather = (): WeatherSummary => ({
  temperature: 78,
  condition: "sunny",
  activity: "Time for a dip in the river!",
});
const Hero = () => {
  const [weather, setWeather] = useState<WeatherSummary>(getFallbackWeather);

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
          activity: getPositiveActivity(temperature, condition),
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    };

    loadWeather();

    return () => controller.abort();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section id="home" className="min-h-screen flex items-center justify-center bg-surface-secondary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-display text-text-primary px-4">
                Chad Mortensen
              </h1>
              <div className="w-16 h-px bg-accent-blue mx-auto"></div>
              <p className="text-title2 font-light text-text-secondary max-w-4xl mx-auto px-4">
                My work blends human-centered craft with strategic clarity to move people and products forward.
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-6 px-4">
              <p className="text-body text-text-secondary max-w-2xl mx-auto leading-relaxed">
                The weather&apos;s great here in Portland. It&apos;s currently {weather.temperature} and {weather.condition}.<br />
                {weather.activity}
              </p>
              {/* Removing, might add back later
              <p className="text-body text-text-tertiary max-w-3xl mx-auto leading-relaxed">Yes, I used AI tools to create this portfolio. Rest assured, I approve of and stand behind everything on this website as true.</p>
              */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 sm:pt-8">
                <button
                  onClick={scrollToAbout}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-text-primary text-surface-primary text-body hover:bg-swiss-gray rounded transition-all duration-200 focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
                  aria-label="Learn more about Chad Mortensen's background and experience"
                >
                  Learn About Me
                </button>
                <button
                  onClick={() => document.querySelector("#case-studies")?.scrollIntoView({
                    behavior: "smooth"
                  })}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 border border-swiss-charcoal text-text-primary hover:bg-surface-secondary rounded transition-all duration-200 focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
                  aria-label="View Chad Mortensen's case studies and design work"
                >
                  View My Work
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 sm:pt-16">
            <button 
              onClick={scrollToAbout} 
              className="text-text-tertiary hover:text-accent-blue transition-colors duration-200 focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
              aria-label="Scroll down to learn more about Chad Mortensen"
            >
              <ArrowDown size={24} className="animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;

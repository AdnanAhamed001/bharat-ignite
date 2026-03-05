import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Startup logos & founders
import alchemystLogo from "@/assets/startups/alchemyst-ai-logo.png";
import alchemystFounder from "@/assets/startups/alchemyst-ai-founder.png";
import nugenomicsLogo from "@/assets/startups/nugenomics-logo.png";
import nugenomicsFounder from "@/assets/startups/nugenomics-founder.png";
import bioreformLogo from "@/assets/startups/bioreform-logo.png";
import bioreformFounder from "@/assets/startups/bioreform-founder.png";
import boinggLogo from "@/assets/startups/boingg-logo.png";
import boinggFounder from "@/assets/startups/boingg-founder.png";
import fitkinLogo from "@/assets/startups/fitkin-logo.png";
import fitkinFounder from "@/assets/startups/fitkin-founder.png";

interface StartupSpot {
  name: string;
  city: string;
  // Percentage positions on the map container
  x: number;
  y: number;
  logo: string;
  founder: string;
  founderName: string;
}

const startups: StartupSpot[] = [
  { name: "Alchemyst AI", city: "Bengaluru", x: 46, y: 75, logo: alchemystLogo, founder: alchemystFounder, founderName: "Founders" },
  { name: "NuGenomics", city: "Bengaluru", x: 44, y: 72, logo: nugenomicsLogo, founder: nugenomicsFounder, founderName: "Founder" },
  { name: "Bioreform", city: "Hyderabad", x: 48, y: 61, logo: bioreformLogo, founder: bioreformFounder, founderName: "Founder" },
  { name: "Boingg", city: "Gurgaon", x: 46, y: 33, logo: boinggLogo, founder: boinggFounder, founderName: "Founder" },
  { name: "FitKin", city: "Delhi", x: 48, y: 30, logo: fitkinLogo, founder: fitkinFounder, founderName: "Founder" },
  { name: "ChocoChi", city: "Kozhikode", x: 40, y: 80, logo: "", founder: "", founderName: "" },
  { name: "DriverShaab", city: "Kolkata", x: 63, y: 50, logo: "", founder: "", founderName: "" },
  { name: "Kamikala", city: "Kalimpong", x: 65, y: 37, logo: "", founder: "", founderName: "" },
  { name: "Crink", city: "Kochi", x: 42, y: 84, logo: "", founder: "", founderName: "" },
  { name: "BeFriends", city: "Vadodara", x: 35, y: 50, logo: "", founder: "", founderName: "" },
  { name: "My Pahadi Dukan", city: "Roorkee", x: 47, y: 26, logo: "", founder: "", founderName: "" },
];

// India map polygons extracted from the uploaded SVG (viewBox 0 0 800 533)
const INDIA_MAIN = "M602.6,161.2 L602.7,159.6 601.6,158.1 601.7,156.1 598.5,154.2 596.5,155 592.3,151.4 590.4,151.8 589.8,154.4 588.6,151.5 590.7,149.7 590.2,148.2 586.5,144 584.5,145.4 584,144.1 585.8,142.9 585.9,141.2 584.2,141.8 583.1,140.2 577.7,141.3 577.6,143.3 575.8,143 574.9,145 572.1,145.3 571.9,146.7 567.3,145.4 564.8,145.7 562.6,143.6 561.3,145.1 559.6,145.7 558.1,147.6 559.3,148.6 556.6,151 550,155.3 547.6,155.5 543.9,158.8 543.2,160.9 540.2,163.9 537.6,165.5 538.3,166.5 537.5,168.6 533.3,171 530,171.2 528.8,172.4 524.1,172.2 523.9,175.7 526.2,177.5 529.2,176.3 530.9,178.8 529.9,181.2 531.4,184.9 530.9,186 528.9,185.7 526.3,187.2 523.8,187.4 522.1,186.5 520.5,188.1 519.4,187.8 512.8,188.9 510.9,188.8 508,187.2 505.2,188.4 504.1,189.9 500.9,190.5 497.3,190.7 497.4,189.9 493.6,188.9 490.3,189.6 487.2,187.3 485,184.8 487,182.1 485.3,180.7 484.7,178.6 486,173.9 485.3,171.6 482.4,170 479.3,172.1 475.8,172.9 476.5,175.5 474.9,180 474.9,183.9 474.5,186.1 476.1,187.8 477.6,191.5 476.6,194.8 475.2,197.6 473.7,196.2 469.8,197.7 467,197.2 466.3,198.2 462.8,197.2 462.2,194.9 457.8,197.7 451.7,194.9 450.6,195.4 448,194.4 445.3,195.8 443.8,194.6 443.4,192.2 442.1,191.5 437.9,193.5 436.1,191.8 434.2,191.9 432.8,190.3 428.9,189.3 429.1,186.5 427.9,184.6 424,184 421,182 420.1,183.1 417.7,183.2 418,184.6 414.4,183 411.3,182.9 410.5,185 408.1,183.3 402.9,182.6 401.5,179.4 398.2,179.8 393.3,176.3 391.1,177.3 385.3,173.7 384.4,172.4 383.2,173 381.1,169.2 379.1,168.8 374.3,165.4 372.3,164.5 372.2,166 370.3,165.3 366.6,162.2 366.1,160.7 367.4,157.7 368.8,157.3 369.4,154.6 368.6,153 370.9,150.1 370.6,147.7 372.1,146.9 373.4,144.8 374.5,144.4 377.1,141.8 379.1,140.7 376.2,139 375.4,137.9 370.1,135.5 368.2,135.3 368.9,132.7 366.7,131.7 363.7,129 360.3,129.3 358,127.9 356.7,126.3 355.4,123.3 353.7,121.5 352.5,123.3 351.2,123.6 349.4,123 349.7,121.3 348.9,120.3 350.5,118.8 348.6,116.2 349.7,113.2 346,109.1 346,106.2 345.1,104.3 348.4,103.6 349.5,102.7 350.2,105.5 352,107.2 354.1,107 354.6,105.4 356.7,105.2 359.3,102.9 359.7,101.3 357.6,98 358.2,94.8 353,92.4 352.3,91.2 352.1,87.6 353.5,87.6 353.4,85.6 352.1,82.5 352.8,81.6 358.4,81.6 359.9,80.2 360.6,77.9 360.2,75.8 362.2,75.6 362.8,73.6 364.5,71.9 367.1,71.5 368.7,68 368.7,65.3 369.9,63.4 369.8,61.6 371.2,59.2 369.4,58 367.8,59.9 366.5,59.6 365.4,56.9 362.4,56.2 362.1,53.9 359.6,53 359.5,51.8 357.8,51.1 353.5,52.3 350.5,52.1 348.5,54 347.1,54.3 343.3,56.6 343,57.5 341,57.2 340.1,58.4 335.5,58.3 335,55.5 333.5,54.4 330.3,54 329.3,52.7 326.5,51.2 326.4,48.1 325.3,46.8 322.4,45.9 321.9,44.8 320.1,44.6 319.1,42.8 317,42.4 314.8,38.5 312.2,37.2 310.2,37.3 309.6,34.7 306.6,33.3 304.3,33.6 301.3,32 299.7,33.3 297.9,32.7 294.1,35 292.2,34.8 289.4,33.6 291.2,35.5 291.2,36.6 285.6,35.6 281.4,36 281.4,37.6 279.9,39.5 276,42.3 274.4,42.7 273.8,44.7 274.4,46.2 273.3,47.8 276.9,49.1 280.4,48.8 280.8,51.4 284.1,54.3 288.4,55 288.7,56.2 287.3,58.3 287.7,59.9 290.1,60.2 292.5,61.9 290.9,65.3 287.6,66.3 285.6,69.7 283.4,69.7 282.6,72.5 283.4,74.2 283.7,78.3 284.3,79.9 284.4,87 283.7,88 284,92.2 286.5,94.1 288.5,94.9 295.3,98.8 297.5,97.6 296.5,101.4 297.7,103.4 301.5,103.5 305,105.8 305.7,106.9 304.8,108.7 303.2,109.6 301.5,109.3 298.6,110.2 295,112.9 293.9,114.9 295.3,119.2 293.6,123.2 295.6,124.8 292,127.5 291,127.4 287.1,132.8 284,135.4 285.3,137.8 282.4,140.1 277.4,141.6 275.1,147.6 270.1,155.3 262.8,158.5 260.9,160.5 259.2,165 256.8,166.8 255.3,168.7 254.7,171 250.6,171.9 247.1,171.7 240.4,173.7 238.7,173 237.9,169.9 235.7,168 234,168.3 230.3,171.4 229,174.3 226.4,177.1 222.4,180.2 221.2,182.3 220.3,186 220.7,187.2 224.8,190.1 228.2,190.2 229.5,191.2 228.7,196.7 227.5,199.8 229.9,204.4 231.2,204.9 235.1,204.8 234.9,209 237.6,213.8 237.9,216 239.9,221 238.3,222.6 238.5,224.5 239.9,225.4 237.5,226.1 235.1,227.9 232.4,226.9 232,224.6 226,226.1 223.9,228.1 219.6,227.4 218.2,225.8 214.2,225.4 209.7,225.4 208.8,224.3 206.4,224.6 205.9,229.7 201.7,229.3 198,230.9 197.6,232.4 199.1,233.9 197.3,234.7 199.7,235.1 201,233.5 204.4,231.7 207.2,231.2 201.2,234.6 201.8,236.5 200.9,237.5 203.3,239.7 203.4,241.8 206.7,244.7 211.8,248 218.5,250 220.3,248.4 225.7,247.3 226.2,246.6 228.5,247.7 229.7,244.8 230.5,246.5 228.2,248.3 224.9,253.4 221.8,253.6 219.2,255.2 218.4,254.2 216.6,256 215.7,254.4 214.7,256 210.7,256.9 210.8,254.9 207.4,254.6 206.8,256.2 210.1,261.4 216,267.7 221.6,275.5 225.4,279.2 228.3,281.3 232.6,283.2 234.5,283.2 234.9,283.1 235,282.9 241.7,280.9 251.3,276.5 251.4,274.7 253.5,272.2 254.5,269.6 252.7,267.4 250.6,267.5 250.5,266.2 252.8,266.6 252.4,264.3 255,263 255.1,260.6 256.6,258.6 256.4,260.4 258.7,260 262.9,260.9 261.4,262 259.8,261.3 258.5,261.9 257.7,264.8 259.4,265 257.9,268.9 259.1,269.4 263.6,269.6 259,272.5 258.1,274 258.6,275.9 260.2,277.1 259.8,279 262.1,281.9 262.4,284.5 261.5,288.6 261.2,289 261,289.9 259.9,291.4 259.1,294.6 258.1,298.2 260.1,308.7 259.6,311.7 262.5,311.5 261,313.1 262.2,313.5 260.3,315 261,318.3 260.8,321.3 263.2,323.7 261.7,323.3 261.7,325.9 263.6,331.5 264,336.3 265.4,341.6 265.6,349.7 267.4,357.5 271,363 272.2,367.3 273.6,369.1 274.3,371.9 273.8,373.2 276.3,376.2 276.4,377.7 278.8,379.2 279.3,381.9 280.6,383 282.1,390 283.3,391.8 284.5,397.6 286.4,408 286.9,409.6 288.3,413.1 292.2,421.2 292.8,421.4 293.4,420.9 293.4,422.6 296.7,426.4 298,429.9 299.2,430.7 301.1,435.8 302.4,440.9 304.3,444.8 307.1,453.1 308.8,454.2 309.6,457.8 307.3,454.7 308,460.7 308.7,463.4 311.6,470.1 318.2,478.3 319.9,479.6 323,482.1 326,482.9 334.4,478.4 335.5,476.6 335.3,473.9 337.2,469.2 340.4,466.9 343,466.6 348.1,464.5 353.2,465 355.2,466.4 353.6,463.8 352.6,464.3 349.4,463.9 347.5,461.4 348.5,458.5 351.9,453.8 353.1,452.8 352.4,450.7 354.9,448.3 357.7,448 361.7,449 361.7,440.8 361.6,438.7 361.7,438.2 361.5,432.6 359.4,433.2 360.8,431.3 360.3,429 361.2,425 361.3,424.3 361.8,423.2 362,422.1 366.4,415.1 367.5,412 368.4,406 369.1,403.9 369,400.3 368.7,400.2 368,399.8 365.9,399.3 364.9,397.4 366.3,395.7 368.3,399.1 368.7,400.2 368.4,398.9 367.4,396.2 367.7,394 366.6,391.7 366.1,387.5 367.2,382.8 365.9,380.7 365.1,375.8 365.6,371.3 368.2,365.6 369.6,364.1 372.5,362.5 375.8,362.5 376.2,365 377.5,362.3 379.1,363 381.4,360.9 382.7,355.7 385.2,354.7 390.3,355.6 393.7,354.3 398.3,351.6 399.1,347.3 397.7,347.2 398.2,344.7 400.7,341.9 404.3,339.6 406.9,338.7 411.9,335.8 415.1,330.9 417.2,328.7 424,325.1 424.9,323.5 428.9,319.4 432.3,314.7 433.9,311.8 439.6,306.1 441.9,304.5 442.6,302.7 440.7,303.3 440,305.5 438.5,305.3 440.1,302.1 443.6,299.4 445.1,299.8 445.1,301.6 443.5,303.1 447.7,301.4 452.5,300.1 457.1,297.8 458.4,294.5 461.6,292.9 462.2,289.4 465.4,286.8 462.8,279.1 463.9,276.6 465.9,274.2 467.8,272.9 471.7,271.8 474.9,271.1 478.6,268.1 481.1,263 482.1,264.1 481.1,266 482,268.4 481.7,270.3 482.8,272.2 484.3,270.1 485.7,271.1 485.7,268.9 486.7,267.9 486.3,272.4 487.5,272 489.4,264.4 489,269.7 490.2,271.8 491.8,270 493.6,271 494.7,269.8 493.5,266.3 494.2,265.7 494.3,262.3 491.3,253.3 491.8,251.6 490.2,249.9 490.3,248.1 491.6,246.4 488.1,245.7 487.8,244.9 488.7,242.1 488.1,242.2 485.4,239.4 486,236 487.6,235 486.9,231.5 487.8,230.3 486.2,229.4 483.9,229.1 479.1,226.6 477.3,224.3 479.6,219.5 481.2,220.7 482.6,217.7 482.6,215.8 484.9,215.4 489.5,215.5 490.1,213.3 488.3,213.1 487,210.4 485.7,211 483.7,210.6 482,208.3 479.2,206.1 477.8,206.7 477,204.7 478,201 480,199.8 481.9,195.9 479.8,195.5 480.9,194.3 484.6,196.3 486.9,199 490.1,198.6 487.9,196.8 488.6,195.7 490.8,197.2 491.5,200.3 494.6,202.2 497.4,202.5 497.4,199.7 498.7,198.9 501.4,202.7 500.8,204.3 501.7,207.4 501.6,210.5 502.1,212.9 503.1,212.6 509.7,214.5 514.9,213.8 516.1,214.1 521.8,212.7 525.2,213.5 532.6,212.2 537,213.5 538.3,214.5 539.8,215.5 538.4,217.1 536.5,216.2 535.5,222 535.1,224.2 532.5,225.4 531.9,228.4 530,227.3 528.5,227.9 527.7,229.8 524.9,229.8 524.7,231.5 523,232.9 522.3,237.7 523.7,239.8 525.1,244.9 526.2,246.1 526,243 527.4,244.1 529.4,247.7 532.2,245.2 531.3,242.4 531.9,240.8 533.8,238.7 533.5,235.1 534.6,236.2 536.6,234.8 538.1,235 538.1,236.5 540,241.4 539.8,243.3 540.4,246.6 542.7,250.6 544.5,258.8 544.7,261.8 545.8,261 546.1,258.9 548.7,260.7 550.6,261 551,257.7 552.7,257.8 552.8,254.7 551.7,252.8 551.1,248.7 552.3,246.8 551.6,244.9 553.9,244.5 554.8,242.7 554.9,234.5 554,233.2 552.6,228.6 553.5,227.8 554.9,229.5 557,228.6 559.8,229.5 562.7,229.5 564.2,230.6 565.3,228 566.2,222.8 568.9,216.4 569.8,215.6 571.1,211 570.6,209.3 568.5,207.8 569.6,204.5 571.1,203.6 574.1,199.3 573.7,196.4 575.6,194.2 573.8,191.2 573.3,187.7 574.2,185.5 575.9,184.6 577.9,183.7 579,181.6 580.4,181.3 582.7,178.2 584.2,177.5 585.6,174.8 587.3,173.5 592.4,172.2 593.3,171.2 595.7,171.1 597.2,173.3 600,174.5 601.4,173.7 597.6,169.7 596.7,166.4 601,161.3Z";

// Island polygons
const ANDAMAN_ISLANDS = [
  "M558.7,415.4 L560,410.2 559.3,404.8 558,404.2 559.3,403.1 560.1,402.1 560.8,398.5 559.6,397.4 560.4,396.2 560,393.6 558.6,394.3 557.1,397.7 557.5,399 556.9,405.1 555.9,405.9 556.7,408.1 555.8,409.2 556,412.9 557.2,415.3 555.5,415.2 554.9,416.5 554.8,420.6 553.5,420.4 554.6,423.2 555.5,428.8 557.2,424.6 557.5,420.7 556.5,419.2 556.7,417.4Z",
  "M551.7,438 L552.4,440.4 551.9,441.8 554,442.3 554.9,441.1 554.9,437.8 554,436.1Z",
  "M573.7,494.2 L573.4,496.9 574.4,497.2 576.4,501 577.2,500.1 577.7,496.8 576.5,493.6Z",
];

const IndiaMapHero = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [allNodesVisible, setAllNodesVisible] = useState(false);

  // Light up nodes, then start spotlight cycle
  useEffect(() => {
    const t1 = setTimeout(() => setAllNodesVisible(true), 600);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (!allNodesVisible) return;
    const t2 = setTimeout(() => setActiveIndex(0), 800);
    return () => clearTimeout(t2);
  }, [allNodesVisible]);

  useEffect(() => {
    if (activeIndex < 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % startups.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-secondary/8 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-gold/6 rounded-full blur-[60px]" />
      </div>

      {/* Map container */}
      <div className="relative w-full h-full">
        {/* SVG Map */}
        <svg
          viewBox="180 20 450 500"
          className="w-full h-full absolute inset-0"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="indiaFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.12" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.08" />
              <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0.05" />
            </linearGradient>
            <filter id="mapGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main India outline */}
          <path
            d={INDIA_MAIN}
            fill="url(#indiaFill)"
            stroke="hsl(var(--gold))"
            strokeWidth="0.8"
            opacity="0.7"
            filter="url(#mapGlow)"
          />

          {/* Islands */}
          {ANDAMAN_ISLANDS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="url(#indiaFill)"
              stroke="hsl(var(--gold))"
              strokeWidth="0.5"
              opacity="0.5"
            />
          ))}

          {/* Connection lines between startups */}
          {allNodesVisible && startups.slice(0, 5).map((s, i) => {
            const next = startups[(i + 1) % 5];
            // Convert percentage to SVG viewBox coordinates
            const x1 = 180 + (s.x / 100) * 450;
            const y1 = 20 + (s.y / 100) * 500;
            const x2 = 180 + (next.x / 100) * 450;
            const y2 = 20 + (next.y / 100) * 500;
            return (
              <motion.line
                key={`conn-${i}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="hsl(var(--gold))"
                strokeWidth="0.3"
                strokeDasharray="4 4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1, delay: i * 0.15 }}
              />
            );
          })}
        </svg>

        {/* City nodes & cards overlay */}
        {startups.map((startup, i) => {
          const isActive = activeIndex === i;
          const hasCard = startup.logo && startup.founder;

          return (
            <div
              key={startup.name}
              className="absolute"
              style={{
                left: `${startup.x}%`,
                top: `${startup.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isActive ? 20 : 5,
              }}
            >
              {/* Node dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={allNodesVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-700 ${
                  isActive
                    ? "bg-secondary shadow-[0_0_16px_6px_hsl(var(--secondary)/0.6)]"
                    : "bg-gold/50 shadow-[0_0_6px_2px_hsl(var(--gold)/0.2)]"
                }`}
              />

              {/* Pulse rings for active */}
              {isActive && (
                <>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0.7 }}
                    animate={{ scale: 5, opacity: 0 }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-secondary/20"
                  />
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0.5 }}
                    animate={{ scale: 3.5, opacity: 0 }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
                    className="absolute inset-0 rounded-full bg-secondary/15"
                  />
                </>
              )}

              {/* Startup card — always visible (dull) for startups with assets, bright when active */}
              {hasCard && (
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 transition-all duration-700 ${
                    isActive ? "opacity-100 scale-100" : "opacity-30 scale-90"
                  }`}
                >
                  <div className={`bg-card/95 backdrop-blur-md border rounded-xl min-w-[170px] transition-all duration-700 ${
                    isActive
                      ? "border-secondary/30 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_24px_hsl(var(--secondary)/0.15)]"
                      : "border-border/30 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                  }`}>
                    <div className="p-3">
                      <div className="flex items-center gap-2.5 mb-2">
                        <img
                          src={startup.founder}
                          alt={startup.founderName}
                          className="w-9 h-9 rounded-full object-cover border border-secondary/30"
                        />
                        <div>
                          <p className="text-[11px] font-heading font-bold text-foreground leading-tight">
                            {startup.name}
                          </p>
                          <p className="text-[9px] font-body text-muted-foreground">
                            {startup.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center pt-1.5 border-t border-border/40">
                        <img
                          src={startup.logo}
                          alt={`${startup.name} logo`}
                          className="h-5 object-contain mt-1 opacity-80"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className={`absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-card/95 border-r border-b transition-all duration-700 ${
                    isActive ? "border-secondary/30" : "border-border/30"
                  }`} />
                </div>
              )}

              {/* City label for startups without cards */}
              {!hasCard && (
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: -8 }}
                      exit={{ opacity: 0, y: -16 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap"
                    >
                      <div className="bg-card/90 backdrop-blur-sm border border-secondary/20 rounded-lg px-3 py-1.5 shadow-lg">
                        <p className="text-[10px] font-heading font-bold text-foreground">{startup.name}</p>
                        <p className="text-[8px] font-body text-muted-foreground">{startup.city}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndiaMapHero;

// Server component — CSS animations work without JS, no 'use client' needed
const CITIES = [
  { name: 'Boston / MIT', cx: 303, cy: 132, delay: '0s' },
  { name: 'Pittsburgh / CMU', cx: 278, cy: 138, delay: '0.35s' },
  { name: 'San Francisco / Berkeley', cx: 160, cy: 145, delay: '0.7s' },
  { name: 'London / Imperial', cx: 500, cy: 107, delay: '1.05s' },
  { name: 'Zürich / ETH', cx: 524, cy: 119, delay: '1.4s' },
  { name: 'Beijing / THU', cx: 823, cy: 139, delay: '1.75s' },
  { name: 'Tokyo / AIST', cx: 888, cy: 151, delay: '2.1s' },
  { name: 'Singapore / NUS', cx: 788, cy: 248, delay: '2.45s' },
]

export default function WorldMapBackground() {
  return (
    <svg
      className="world-map-svg absolute inset-0 w-full h-full text-text-muted pointer-events-none select-none"
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Radial mask: transparent in center (behind text), opaque at edges */}
        <radialGradient id="mapFade" cx="50%" cy="50%" r="55%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.55" />
          <stop offset="50%"  stopColor="white" stopOpacity="0.75" />
          <stop offset="100%" stopColor="white" stopOpacity="1"    />
        </radialGradient>
        <mask id="mapMask">
          <rect width="1000" height="500" fill="url(#mapFade)" />
        </mask>
      </defs>

      {/* ── Continental outlines ── */}
      <g mask="url(#mapMask)" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" strokeLinecap="round">

        {/* North America */}
        <path d="
          M 175,50 L 95,52 L 45,55
          L 30,95 L 58,90 L 88,86
          L 132,100 L 148,114 L 152,130
          L 158,144 L 168,160 L 175,174
          L 190,187 L 196,205 L 188,214
          L 203,206 L 220,200 L 240,208
          L 256,222 L 270,212
          L 258,198 L 248,188 L 238,184
          L 260,181 L 272,178 L 283,178
          L 286,192 L 278,202
          L 292,186 L 296,165 L 299,152
          L 308,138 L 318,128 L 328,120
          L 348,112 L 358,118 L 354,104
          L 340,88 L 326,77 L 313,67
          L 296,57 L 258,50 L 215,48
          Z
        " />

        {/* Greenland */}
        <path d="M 300,48 L 322,29 L 356,25 L 378,36 L 367,58 L 344,68 L 312,62 Z" />

        {/* Iceland */}
        <path d="M 432,80 L 438,66 L 450,63 L 463,70 L 458,82 L 442,86 Z" />

        {/* South America */}
        <path d="
          M 284,232 L 320,218 L 350,222
          L 378,240 L 404,270 L 410,300
          L 404,330 L 387,352 L 358,367
          L 332,395 L 315,415 L 298,398
          L 280,370 L 263,340 L 253,308
          L 250,278 L 258,256 L 272,241
          Z
        " />

        {/* Europe (main body) */}
        <path d="
          M 472,155 L 482,140 L 468,114
          L 474,98 L 487,88 L 506,80
          L 524,68 L 548,55 L 578,52
          L 610,62 L 619,80 L 600,92
          L 578,100 L 560,112 L 546,126
          L 536,140 L 519,150 L 500,155
          Z
        " />

        {/* United Kingdom */}
        <path d="M 476,110 L 474,93 L 483,82 L 497,80 L 505,90 L 501,110 L 487,116 Z" />

        {/* Africa */}
        <path d="
          M 450,148 L 490,138 L 526,145
          L 549,150 L 580,160 L 610,182
          L 633,210 L 646,240 L 649,270
          L 641,302 L 623,330 L 598,347
          L 568,354 L 540,348 L 514,333
          L 494,308 L 477,280 L 461,251
          L 449,222 L 447,194 L 452,170
          L 456,158
          Z
        " />

        {/* Madagascar */}
        <path d="M 622,308 L 630,292 L 640,302 L 636,324 L 622,327 Z" />

        {/* Asia (main body) */}
        <path d="
          M 572,55 L 609,45 L 650,40
          L 694,38 L 740,38 L 780,42
          L 815,52 L 847,65 L 874,80
          L 900,103 L 912,130 L 906,153
          L 888,167 L 862,177 L 838,182
          L 815,189 L 788,196 L 760,202
          L 732,209 L 706,217 L 679,224
          L 655,234 L 635,244 L 617,250
          L 600,245 L 582,232 L 564,218
          L 554,202 L 547,185 L 545,167
          L 548,150 L 554,134 L 561,117
          L 568,99 L 571,79
          Z
        " />

        {/* India (peninsula) */}
        <path d="
          M 630,200 L 648,226 L 658,252
          L 650,277 L 638,287 L 627,276
          L 621,251 L 624,226
          Z
        " />

        {/* Sri Lanka */}
        <path d="M 651,277 L 656,270 L 661,272 L 659,280 L 652,281 Z" />

        {/* Japan */}
        <path d="M 862,170 L 869,156 L 878,141 L 886,129 L 893,131 L 897,143 L 893,158 L 883,167 Z" />

        {/* Philippines */}
        <path d="M 800,228 L 808,218 L 816,220 L 818,230 L 811,237 L 804,234 Z" />

        {/* Indonesia / Maritime SE Asia (simplified) */}
        <path d="M 752,260 L 778,252 L 804,256 L 820,266 L 827,280 L 813,287 L 792,284 L 768,274 L 756,265 Z" />

        {/* Australia */}
        <path d="
          M 820,290 L 850,282 L 880,280
          L 910,292 L 927,313 L 933,337
          L 924,361 L 906,374 L 878,377
          L 848,372 L 820,356 L 807,332
          L 811,309
          Z
        " />

        {/* New Zealand (North Island) */}
        <path d="M 968,360 L 975,346 L 983,341 L 989,349 L 986,362 L 976,366 Z" />

        {/* New Zealand (South Island) */}
        <path d="M 963,372 L 969,367 L 976,373 L 973,384 L 963,387 Z" />

        {/* Cuba */}
        <path d="M 260,204 L 272,200 L 282,206 L 276,213 L 264,213 Z" />
      </g>

      {/* ── City nodes — major robotics research hubs ── */}
      <g className="city-nodes" mask="url(#mapMask)">
        {CITIES.map((city) => (
          <g
            key={city.name}
            className="text-accent-500"
          >
            <title>{city.name}</title>
            {/* Static inner dot */}
            <circle
              cx={city.cx}
              cy={city.cy}
              r="2.5"
              fill="currentColor"
              opacity="0.65"
            />
            {/* Animated pulse ring */}
            <circle
              cx={city.cx}
              cy={city.cy}
              r="2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="node-pulse"
              style={{ animationDelay: city.delay }}
            />
          </g>
        ))}
      </g>
    </svg>
  )
}

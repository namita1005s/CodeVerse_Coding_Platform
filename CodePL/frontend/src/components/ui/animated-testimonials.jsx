import { cn } from "@/lib/utils";

const AnimatedCanopy = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}) => (
  <div
    {...props}
    className={cn(
      "group relative flex h-full w-full overflow-hidden p-2",
      vertical ? "flex-col" : "flex-row",
      className
    )}
    style={{
      '--gap': '12px',
      '--duration': '25s'
    }}
  >
    {Array.from({ length: repeat }).map((_, index) => (
      <div
        key={`item-${index}`}
        className={cn("flex shrink-0", {
          "animate-canopy-horizontal flex-row": !vertical,
          "animate-canopy-vertical flex-col": vertical,
        })}
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
          gap: 'var(--gap)'
        }}
      >
        {children}
      </div>
    ))}
    {applyMask && (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 h-full w-full from-white/50 from-5% via-transparent via-50% to-white/50 to-95%",
          vertical ? "bg-gradient-to-b" : "bg-gradient-to-r"
        )}
      />
    )}
  </div>
);

const TestimonialCard = ({
  testimonial,
  className,
}) => (
  <div
    className={cn(
      "group mx-2 flex h-32 w-80 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-transparent p-3 transition-all hover:border-blue-400 hover:shadow-[0_0_10px_#60a5fa]",
      className
    )}
    style={{
      margin: '0 var(--gap)'
    }}
  >
    <div className="flex items-start gap-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gray-200">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-white">
            {testimonial.name}
          </span>
          <span className="text-xs text-gray-400">
            {testimonial.handle}
          </span>
        </div>
        <p className="mt-1 line-clamp-3 text-sm text-white">
          {testimonial.description}
        </p>
      </div>
    </div>
  </div>
);

export const AnimatedTestimonials = ({
  data,
  className,
  cardClassName,
}) => (
  <div className={cn("w-full overflow-x-hidden py-4", className)}>
    {/* First row: Left to Right (normal) */}
    <AnimatedCanopy
      key="canopy-1"
      reverse={false} // Left to right
      pauseOnHover={true}
      applyMask={false}
      repeat={3}
    >
      {data.map((testimonial) => (
        <TestimonialCard
          key={testimonial.name}
          testimonial={testimonial}
          className={cardClassName}
        />
      ))}
    </AnimatedCanopy>

    {/* Second row: Right to Left (reverse) - This is the middle layer */}
    <AnimatedCanopy
      key="canopy-2" 
      reverse={true} // Right to left
      pauseOnHover={true}
      applyMask={false}
      repeat={3}
    >
      {data.map((testimonial) => (
        <TestimonialCard
          key={testimonial.name + "-reverse"}
          testimonial={testimonial}
          className={cardClassName}
        />
      ))}
    </AnimatedCanopy>

    {/* Third row: Left to Right (normal) */}
    <AnimatedCanopy
      key="canopy-3"
      reverse={false} // Left to right
      pauseOnHover={true}
      applyMask={false}
      repeat={3}
    >
      {data.map((testimonial) => (
        <TestimonialCard
          key={testimonial.name + "-normal"}
          testimonial={testimonial}
          className={cardClassName}
        />
      ))}
    </AnimatedCanopy>
  </div>
);
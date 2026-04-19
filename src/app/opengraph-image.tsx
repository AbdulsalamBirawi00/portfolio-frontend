import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Abdalsalam Al Birawi — Front-End Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #050714 0%, #1a0533 40%, #0a0e27 70%, #050714 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Star dots */}
        {[
          [100, 80],
          [200, 200],
          [400, 100],
          [600, 150],
          [800, 60],
          [1000, 120],
          [150, 400],
          [900, 350],
          [1100, 250],
          [300, 500],
          [700, 480],
          [50, 300],
        ].map(([x, y], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: i % 3 === 0 ? "4px" : "2px",
              height: i % 3 === 0 ? "4px" : "2px",
              background: "white",
              borderRadius: "50%",
              left: x,
              top: y,
              opacity: 0.6 + (i % 4) * 0.1,
            }}
          />
        ))}

        {/* Nebula glow */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.3) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
          <div
            style={{
              fontSize: "14px",
              color: "#06b6d4",
              letterSpacing: "0.4em",
              marginBottom: "24px",
              textTransform: "uppercase",
            }}
          >
            ◈ PORTFOLIO ◈
          </div>

          <div
            style={{
              fontSize: "72px",
              fontWeight: "900",
              color: "#e8eaf6",
              textAlign: "center",
              textShadow: "0 0 40px rgba(124,58,237,0.8)",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Abdalsalam Al Birawi
          </div>

          <div
            style={{
              fontSize: "32px",
              color: "#7c3aed",
              marginBottom: "24px",
              textShadow: "0 0 20px #7c3aed",
            }}
          >
            Front-End Developer
          </div>

          <div
            style={{
              display: "flex",
              gap: "24px",
            }}
          >
            {["React", "Next.js", "TypeScript"].map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: "18px",
                  color: "#06b6d4",
                  padding: "8px 20px",
                  border: "1px solid rgba(6,182,212,0.4)",
                  borderRadius: "50px",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

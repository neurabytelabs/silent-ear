# Silent-Ear: Industrial Edge AI Anomaly Detection
# Multi-stage, multi-arch build (AMD64 + ARM64)

# Stage 1: Build
FROM --platform=$BUILDPLATFORM rust:1.83-slim AS builder

ARG TARGETPLATFORM
ARG TARGETARCH

WORKDIR /app

# Install dependencies and cross-compilation tools
RUN apt-get update && apt-get install -y \
    pkg-config \
    gcc-aarch64-linux-gnu \
    libc6-dev-arm64-cross \
    && rm -rf /var/lib/apt/lists/*

# Add target for ARM64 cross-compilation
RUN if [ "$TARGETARCH" = "arm64" ]; then \
        rustup target add aarch64-unknown-linux-gnu; \
    fi

# Set up cross-compilation environment for ARM64
ENV CARGO_TARGET_AARCH64_UNKNOWN_LINUX_GNU_LINKER=aarch64-linux-gnu-gcc

# Copy manifests
COPY Cargo.toml Cargo.lock* ./

# Create dummy main to cache dependencies
RUN mkdir src && echo "fn main() {}" > src/main.rs

# Build dependencies (cached layer)
RUN if [ "$TARGETARCH" = "arm64" ]; then \
        cargo build --release --target aarch64-unknown-linux-gnu; \
    else \
        cargo build --release; \
    fi
RUN rm -rf src

# Copy source code
COPY src ./src
COPY static ./static

# Build release binary
RUN touch src/main.rs && \
    if [ "$TARGETARCH" = "arm64" ]; then \
        cargo build --release --target aarch64-unknown-linux-gnu && \
        cp target/aarch64-unknown-linux-gnu/release/silent-ear target/release/silent-ear; \
    else \
        cargo build --release; \
    fi

# Stage 2: Runtime
FROM debian:bookworm-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy binary from builder
COPY --from=builder /app/target/release/silent-ear /app/silent-ear

# Copy static files
COPY --from=builder /app/static /app/static

# Create data directory (mount your data here)
RUN mkdir -p /app/data

# Create non-root user for security
RUN useradd -r -s /bin/false silentear && \
    chown -R silentear:silentear /app

USER silentear

# Expose web server port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/status || exit 1

# Run the application (mock mode for demo, override with --simulate for real data)
CMD ["./silent-ear", "--mock"]

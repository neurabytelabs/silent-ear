# Contributing to Silent-Ear

Thank you for your interest in contributing to Silent-Ear!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/silent-ear.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Run tests: `cargo test`
6. Run linter: `cargo clippy`
7. Format code: `cargo fmt`
8. Commit your changes
9. Push to your fork
10. Open a Pull Request

## Development Setup

### Prerequisites

- Rust 1.70+ (stable)
- Cargo

### Building

```bash
cargo build --release
```

### Running Tests

```bash
cargo test
```

### Running the Simulation

```bash
./run.sh
# or
cargo run --release -- --simulate
```

## Code Style

- Follow Rust conventions
- Use `cargo fmt` before committing
- Address all `cargo clippy` warnings
- Write tests for new functionality

## Areas for Contribution

- [ ] Additional anomaly detection algorithms
- [ ] MQTT/OPC-UA integration
- [ ] Prometheus metrics export
- [ ] ARM64 optimization
- [ ] Real hardware sensor integration
- [ ] Machine learning models (Burn framework)

## Questions?

Open an issue for discussion before making large changes.

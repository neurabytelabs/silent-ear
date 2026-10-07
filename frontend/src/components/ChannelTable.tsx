import type { ScenarioSnapshot } from "../domain/scenario";

interface ChannelTableProps {
  readonly snapshot: ScenarioSnapshot;
  readonly selectedChannel: number;
  readonly onSelectChannel: (channel: number) => void;
}

function valueOrDash(value: number | null): string {
  return value === null ? "—" : value.toFixed(5);
}

export function ChannelTable({ snapshot, selectedChannel, onSelectChannel }: ChannelTableProps) {
  return (
    <section className="channel-card" aria-labelledby="channel-heading">
      <div className="channel-heading-row">
        <div>
          <p className="section-kicker">Eight exact inputs</p>
          <h2 id="channel-heading">RMS channels</h2>
        </div>
        <p className="baseline-state">
          {snapshot.baseline.ready
            ? "Fixed after baseline readiness"
            : snapshot.currentReadingAvailable
              ? `Learning reference ${snapshot.baseline.samplesSeen}/${snapshot.baseline.samplesRequired}`
              : "Reference not started"}
        </p>
      </div>
      <div className="table-scroll" tabIndex={0} aria-label="Scrollable RMS channel data">
        <table>
          <caption>Current per-window RMS values and fixed-reference comparison in demo units</caption>
          <thead>
            <tr>
              <th scope="col">Channel</th>
              <th scope="col">RMS</th>
              <th scope="col">Mean</th>
              <th scope="col">σ</th>
              <th scope="col">Upper threshold</th>
              <th scope="col">State</th>
            </tr>
          </thead>
          <tbody>
            {snapshot.channels.map((channel) => (
              <tr key={channel.channel} className={selectedChannel === channel.channel ? "is-selected" : undefined}>
                <th scope="row">
                  <button
                    type="button"
                    aria-pressed={selectedChannel === channel.channel}
                    onClick={() => onSelectChannel(channel.channel)}
                  >
                    {channel.label}
                  </button>
                </th>
                <td>{snapshot.currentReadingAvailable ? channel.rms.toFixed(5) : "—"}</td>
                <td>{valueOrDash(channel.mean)}</td>
                <td>{valueOrDash(channel.standardDeviation)}</td>
                <td>{valueOrDash(channel.upperThreshold)}</td>
                <td>{!snapshot.currentReadingAvailable ? "Not started" : channel.upperThresholdExceeded ? "Above" : snapshot.baseline.ready ? "At or below" : "Not ready"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

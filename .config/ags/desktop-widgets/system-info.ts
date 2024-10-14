import { Binding } from "types/service";
const battery = await Service.import("battery");

function getCpuFromCommand(out: string): number {
  if (!out) {
    return 0;
  }
  const cpuLine =
    (out.split("\n") || []).find((line) => line.includes("Cpu(s)")) || "";
  return +cpuLine.split(/\s+/)[1].replace(",", ".");
}

type StatInformation = {
  total: number;
  used: number;
  percent: number;
  icon?: string;
};

function getRamFromCommand(out: string): StatInformation {
  if (!out) {
    return { used: 0, total: 0, percent: 0, icon: "" };
  }
  const line = out.split("\n").find((line) => line.includes("MiB Mem :")) || "";
  const fields = line.split(" ").filter((it) => !!it);
  const used = Number(fields[7]);
  const total = Number(fields[3]);
  const ramInPercent = used / total;

  return {
    used,
    total,
    percent: ramInPercent,
  };
}

function getSwapFromCommand(out: string): StatInformation {
  if (!out) {
    return { used: 0, total: 0, percent: 0 };
  }
  const line = out.split("\n").find((line) => line.includes("MiB Swap:")) || "";
  const fields = line.split(" ").filter((it) => !!it);
  const used = Number(fields[6]);
  const total = Number(fields[2]);
  const swapInPercent = used / total;

  return {
    used,
    total,
    percent: swapInPercent,
    icon: "󰯍",
  };
}

const cpu = Variable(0, {
  poll: [2000, "top -b -n 1", (out) => getCpuFromCommand(out) / 100],
});

const ramInformation = Variable<StatInformation>(
  { percent: 0, used: 0, total: 0 },
  {
    poll: [2000, "top -bn1", (out) => getRamFromCommand(out)],
  },
);

const swapInformation = Variable<StatInformation>(
  { percent: 0, used: 0, total: 0 },
  {
    poll: [2000, "top -bn1", (out) => getSwapFromCommand(out)],
  },
);

const storage = Variable<StatInformation>(
  { percent: 0, used: 0, total: 0 },
  {
    poll: [
      2000,
      "df -B1 /",
      (out) => {
        if (typeof out !== "string") {
          return { total: 0, used: 0, percent: 0 };
        }

        const formatSizeInGB = (sizeInKB: number) =>
          Number((sizeInKB / 1024 ** 2).toFixed(2));

        const dfOut = out.split("\n").find((line) => line.startsWith("/"));

        if (dfOut === undefined) {
          return { total: 0, used: 0, percent: 0 };
        }

        const parts = dfOut.split(/\s+/);
        const size = Number.parseInt(parts[1], 10);
        const used = Number.parseInt(parts[2], 10);

        const sizeInGB = formatSizeInGB(size);
        const usedInGB = formatSizeInGB(used);

        return {
          total: sizeInGB,
          used: usedInGB,
          percent: used / size,
        };
      },
    ],
  },
);

type ShowStatOptions = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  icon: string | Binding<any, any, string>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  value: Binding<any, any, number>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  label: Binding<any, any, string>;

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  cssClass: string | Binding<any, any, string>;
};

const showStat = (opts: ShowStatOptions) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let cssClass: Binding<any, any, string>;

  if (typeof opts.cssClass === "string") {
    cssClass = Variable(opts.cssClass).bind();
  } else {
    cssClass = opts.cssClass;
  }

  const classNames = cssClass.as((pcc: string) => ["system-stat", pcc]);

  return Widget.Box({
    classNames: classNames,
    vertical: true,
    children: [
      Widget.Box({
        children: [
          Widget.Label({
            className: "icon",
            label: opts.icon,
          }),
          Widget.LevelBar({
            className: "progress-bar",
            value: opts.value,
            barMode: "continuous",
            hexpand: true,
            vpack: "center",
          }),
        ],
      }),
      Widget.Box({
        hpack: "end",
        className: "label",
        children: [
          Widget.Label({
            label: opts.label,
          }),
        ],
      }),
    ],
  });
};

const cpuInfo = showStat({
  icon: "",
  value: cpu.bind(),
  label: cpu.bind().as((cpuPercent) => `${Math.round(cpuPercent * 100)}%`),
  cssClass: "cpu",
});

const ramInfo = showStat({
  icon: "",
  value: ramInformation.bind().as((ram) => ram.percent),
  label: ramInformation
    .bind()
    .as(
      (ram) =>
        `${(ram.used / 1000).toFixed(1)} / ${(ram.total / 1000).toFixed(1)} GB`,
    ),
  cssClass: "ram",
});

const swapInfo = showStat({
  icon: "󰯍",
  value: swapInformation.bind().as((swap) => swap.percent),
  label: swapInformation
    .bind()
    .as(
      (swap) =>
        `${(swap.used / 1000).toFixed(1)} / ${(swap.total / 1000).toFixed(1)} GB`,
    ),
  cssClass: "swap",
});

const storageInfo = showStat({
  icon: "󱛟",
  value: storage.bind().as((info) => info.percent),
  label: storage
    .bind()
    .as(
      (store) =>
        `${(store.used / 1000).toFixed(1)} / ${(store.total / 1000).toFixed(1)} GB`,
    ),
  cssClass: "storage",
});

const batteryIconMap = {
  chargingEmpty: "󰢟",
  chargingLow: "󱊤",
  chargingMedium: "󱊥",
  chargingHigh: "󱊦",

  dischargingEmpty: "󰂃",
  dischargingLow: "󱊡",
  dischargingMedium: "󱊢",
  dischargingHigh: "󱊣",

  full: "",
};

const batteryCriticalThreshold = 10;

const batteryCritical = Utils.merge(
  [battery.bind("percent"), battery.bind("charging")],
  (percent: number, charging: boolean) =>
    !charging && percent < batteryCriticalThreshold,
);

const batteryIcon = Utils.merge(
  [battery.bind("percent"), battery.bind("charging"), battery.bind("charged")],
  (percent: number, charging: boolean, charged: boolean) => {
    if (charged) {
      return batteryIconMap.full;
    }

    if (charging) {
      if (percent < batteryCriticalThreshold) {
        return batteryIconMap.chargingEmpty;
      }
      if (percent < 30) {
        return batteryIconMap.chargingLow;
      }
      if (percent < 75) {
        return batteryIconMap.chargingMedium;
      }
      if (percent < 99) {
        return batteryIconMap.chargingHigh;
      }
      return batteryIconMap.full;
    }

    if (percent < batteryCriticalThreshold) {
      return batteryIconMap.dischargingEmpty;
    }
    if (percent < 30) {
      return batteryIconMap.dischargingLow;
    }
    if (percent < 75) {
      return batteryIconMap.dischargingMedium;
    }
    return batteryIconMap.dischargingHigh;
  },
);

const batteryInfo = showStat({
  icon: batteryIcon,
  value: battery.bind("percent").as((percent) => percent / 100),
  label: Utils.merge(
    [battery.bind("percent"), battery.bind("charged")],
    (percent: number, charged: boolean) => {
      if (charged) {
        return "Full";
      }

      return `${percent}%`;
    },
  ),
  cssClass: batteryCritical.as((is) => (is ? "battery-critical" : "battery")),
});

export const SystemInfo = Widget.Box({
  vertical: true,
  classNames: ["system-stats", "box"],
  children: [cpuInfo, ramInfo, swapInfo, storageInfo, batteryInfo],
});

import { useEffect, useState } from "react";
import { Badge, Notification, Popover, Text } from "@mantine/core";
import { Inter } from "next/font/google";
import { AreaChart } from "@mantine/charts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [refreshToken, setRefreshToken] = useState(Math.random());

  const retrieveLogs = async () => {
    let res = await fetch("/api/response");
    let { latestLogs } = await res.json();

    return latestLogs;
  };

  useEffect(() => {
    retrieveLogs()
      .then(setLogs)
      .finally(() => setTimeout(() => setRefreshToken(Math.random()), 5000));
  }, [refreshToken]);

  return (
    <main
      className={`flex  flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <svg
        height="400"
        viewBox="0 0 238 857"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M78 581.5L96.5 661.5L189 660V647.5V616L191.5 584L196.5 539.5L203 499L212 460L222 422.5L232 377L237.5 336.5V288L234.5 255.5L226.5 211L217.5 175.5L208.5 152.5V197.5L205.5 236.5L202 276.5L194 327L184.5 368.5L174 409.5L163.5 451.5L160 393.5L157.5 288V226.5V185L154.5 148.5L148.5 107L137.5 48L124.5 0.5L113 42L104 88.5C98.4 120.5 97 136.833 97 141L95.5 180.5V217.5L97 253.5L103.5 298L111.5 354.5L116 405.5L120 463.5L123 517L121.5 568L115 539.5L104.5 507L91.5 475L74.5 437.5L49 370.5L36 322.5L28 274.5L23 226.5L4 306L0 359L11.5 419L44 491.5L78 581.5Z"
          fill="#6EA466"
        />
        <path
          d="M162 459L155 503L149.5 539L146.5 569V596V621.5V641L149.5 659.5"
          stroke="black"
        />
        <path
          d="M124 576.5L129 603.5L132.5 628L135.5 648V660.5"
          stroke="black"
        />
        <Popover position="top" withArrow>
          <Popover.Target>
            <path
              d="M67 659.5H213C225.979 659.5 236.5 670.021 236.5 683V809C236.5 835.234 215.234 856.5 189 856.5H91C64.7665 856.5 43.5 835.234 43.5 809V683C43.5 670.021 54.0213 659.5 67 659.5Z"
              fill={logs[0]?.water_level > 60 ? "#987848" : "#EBC334"}
              stroke="black"
            />
          </Popover.Target>
          <Popover.Dropdown className="min-w-[300px]">
            <Text>Trend</Text>
            <br />
            <AreaChart
              h={150}
              unit={"%"}
              strokeWidth={1}
              dotProps={{ r: 0, strokeWidth: 0 }}
              data={logs}
              dataKey="time"
              series={[{ name: "water_level", color: "blue.6" }]}
              curveType="bump"
            />
          </Popover.Dropdown>
        </Popover>
        <line x1="73.5" y1="688" x2="73.5" y2="707" stroke="black" />
        <line x1="74.5" y1="721.006" x2="73.4878" y2="804.006" stroke="black" />
      </svg>
      <br />
      <Text className="text-slate-400 ">Moisture content</Text>

      <Text fz={"h1"}>
        {logs[0]?.water_level}% {logs[0]?.water_level > 60 ? "😊" : "🥵"}
      </Text>
    </main>
  );
}

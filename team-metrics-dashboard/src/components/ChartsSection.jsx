/* eslint-disable*/

import "../output.css";


import React, { useState, useEffect } from "react";
import {
  LabelList,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Area,
  AreaChart,
} from "recharts";
import { Clock, ChartArea, TestTube, TestTubes } from "lucide-react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ChartsSection = ({ responseData }) => {
  const chartConfig = {
    oneOverX: {
      label: "1/x",
      color: "hsl(var(--chart-1))",
    },
    totalTest: {
      label: "% of total test (cumulative)",
      color: "hsl(var(--chart-2))",
    },
    totalDesign: {
      label: "% of total design (cumulative)",
      color: "hsl(var(--chart-3))",
    },
    oneOverXArea: {
      label: "1/x",
      color: "hsl(var(--chart-4))",
    },
  };

  return (
    <section
      className="charts-section grid lg:grid-cols-2 sm:grid-cols-1 gap-12 p-8 justify-center items-center"
      id="charts-section"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            1/x <Clock height={20} />
          </CardTitle>
          <CardDescription>
            Displays amount of days in between each respective commit done
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={responseData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="days from 1st commit"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={3}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend
                content={(props) => (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    {props.payload.map((entry, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "14px",
                          margin: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: entry.color,
                          }}
                        />
                        <span>{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Bar dataKey="1/x" fill="var(--color-oneOverX)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            1/x Area Chart <ChartArea height={20} />
          </CardTitle>{" "}
          <CardDescription>Showing 1/x in continuous format</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={responseData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="days from 1st commit"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={3}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <ChartLegend
                content={(props) => (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    {props.payload.map((entry, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "14px",
                          margin: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: entry.color,
                          }}
                        />
                        <span>{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Area
                dataKey="1/x"
                type="natural"
                fill="var(--color-oneOverXArea)"
                fillOpacity={0.4}
                stroke="var(--color-oneOverXArea)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            Total Test and Design code <TestTube height={20} />
          </CardTitle>{" "}
          <CardDescription>
            Displays percentage of total test and design code over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="min-h-[200px]  w-full"
          >
            <BarChart accessibilityLayer data={responseData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="days from 1st commit"
                tickLine={false}
                tickMargin={20}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={15}
                tickCount={3}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend
                content={(props) => (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    {props.payload.map((entry, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "14px",
                          margin: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: entry.color,
                          }}
                        />
                        <span>{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Bar
                dataKey="% of total test (cumulative)"
                stackId={"a"}
                fill="var(--color-totalTest)"
                radius={[0, 0, 4, 4]}
              />

              <Bar
                dataKey="% of total design (cumulative)"
                stackId={"a"}
                fill="var(--color-totalDesign)"
                radius={[0, 0, 4, 4]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            Total Test and Design Code (Line Graph) <TestTubes height={20} />
          </CardTitle>{" "}
          <CardDescription>
            Test and Design Code over time, but in lines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={responseData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="days from 1st commit"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={3}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <ChartLegend
                content={(props) => (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    {props.payload.map((entry, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "14px",
                          margin: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: entry.color,
                          }}
                        />
                        <span>{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Line
                dataKey="% of total test (cumulative)"
                type="monotone"
                stroke="var(--color-totalTest)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="% of total design (cumulative)"
                type="monotone"
                stroke="var(--color-totalDesign)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  );
};

export default ChartsSection;

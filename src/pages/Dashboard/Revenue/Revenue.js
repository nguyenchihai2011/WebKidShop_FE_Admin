import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  {
    name: "Jan",
    revenue: 4000,
  },
  {
    name: "Feb",
    revenue: 3000,
  },
  {
    name: "Mar",
    revenue: 2000,
  },
  {
    name: "Apr",
    revenue: 2780,
  },
  {
    name: "May",
    revenue: 1890,
  },
  {
    name: "June",
    revenue: 2390,
  },
  {
    name: "July",
    revenue: 2390,
  },
  {
    name: "Aug",
    revenue: 3490,
  },
  {
    name: "Sep",
    revenue: 3000,
  },
  {
    name: "Otc",
    revenue: 4000,
  },
  {
    name: "Nov",
    revenue: 4590,
  },
  {
    name: "Dec",
    revenue: 3570,
  },
];

export default class Revenue extends PureComponent {
  render() {
    return (
      <BarChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    );
  }
}
